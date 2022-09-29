const db = require("../models");
const { Op } = require("sequelize");
const mensajesValidacion = require("../config/validate.config");
const globales = require("../config/global.config");
const Semestre = db.semestre;
const configsvc = require("../config/service.config.js");
const request = require('request');

const { QueryTypes } = require('sequelize');
let Validator = require('fastest-validator');
/* create an instance of the validator */
let dataValidator = new Validator({
    useNewCustomCheckerFunction: true, // using new version
    messages: mensajesValidacion
});


exports.getAdmin = async(req, res) => {
    let datos = "",
        query = "";

    if (req.body.solocabeceras == 1) {
        query = "SELECT * FROM s_semestre_mgr('&modo=10&id_usuario=:id_usuario')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            replacements: {
                id_usuario: req.userId,
            },
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {
        query = "SELECT * FROM s_semestre_mgr('" +
            "&modo=0&id_usuario=:id_usuario" +
            "&inicio=:start&largo=:length" +
            "&scampo=" + req.body.opcionesAdicionales.datosBusqueda.campo + "&soperador=" + req.body.opcionesAdicionales.datosBusqueda.operador + "&sdato=" + req.body.opcionesAdicionales.datosBusqueda.valor;

            if(req.body.order.length>0){
                let ordencampo="",ordensentido="";
                for(let i=0; i<req.body.order.length;i++){
                    ordencampo += "|" + req.body.columns[req.body.order[i].column].data;
                    ordensentido += "|" + req.body.order[i].dir;
                }
                query += "&ordencampo=" + ordencampo.substring(1)
                        + "&ordensentido=" + ordensentido.substring(1) + "')";
            }
            else{
                query += "&ordencampo=Tipo" +
                    "&ordensentido=DESC')";
            }

        datos = await db.sequelize.query(query, {
            // A function (or false) for logging your queries
            // Will get called for every SQL query that gets sent
            // to the server.
            logging: console.log,

            replacements: {
                id_usuario: req.userId,
                start: (typeof req.body.start !== typeof undefined ? req.body.start : 0),
                length: (typeof req.body.start !== typeof undefined ? req.body.length : 1),

            },
            // If plain is true, then sequelize will only return the first
            // record of the result set. In case of false it will return all records.
            plain: false,

            // Set this to true if you don't have a model definition for your query.
            raw: true,
            type: QueryTypes.SELECT
        });
    }

    var columnNames = (datos.length > 0 ? Object.keys(datos[0]).map(function(key) {
        return key;
    }) : []);
    var quitarKeys = false;

    for (var i = 0; i < columnNames.length; i++) {
        if (columnNames[i] == "total_count") quitarKeys = true;
        if (quitarKeys)
            columnNames.splice(i);
    }

    respuesta = {
            draw: req.body.opcionesAdicionales.raw,
            recordsTotal: (datos.length > 0 ? parseInt(datos[0].total_count) : 0),
            recordsFiltered: (datos.length > 0 ? parseInt(datos[0].total_count) : 0),
            data: datos,
            columnNames: columnNames
        }
        //console.log(JSON.stringify(respuesta));
    res.status(200).send(respuesta);
    //return res.status(200).json(data);
    // res.status(500).send({ message: err.message });
}


exports.getRecord = async(req, res) => {

    Semestre.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(semestre => {
            if (!semestre) {
                return res.status(404).send({ message: "Semestre Not found." });
            }

            res.status(200).send(semestre);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getActual = async(req, res) => {

    Semestre.findOne({
            where: {
                actual: 1
            }
        })
        .then(semestre => {
            if (!semestre) {
                return res.status(404).send({ message: "Semestre Not found." });
            }

            res.status(200).send(semestre);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogo = async(req, res) => {

    Semestre.findAll({
            attributes: ['id', [db.sequelize.literal("anio || ' - ' || tipo"), "text"]],
            order: [
                ['anio', 'ASC'],
                ['tipo', 'ASC'],
            ]
        }).then(semestre => {
            if (!semestre) {
                return res.status(404).send({ message: "Semestre Not found." });
            }

            res.status(200).send(semestre);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.setRecord = async(req, res) => {
    Object.keys(req.body.dataPack).forEach(function(key) {
        if (key.indexOf("id_", 0) >= 0 || key.indexOf("actual", 0) >= 0) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
        }
    })

    query = "select * " +
        "from semestre as a " +
        "where anio=:anio " +
        "    and tipo=:tipo " +
        "    and id_catquincena_ini=:id_catquincena_ini " +
        "    and id_catquincena_fin=:id_catquincena_fin " +
        "    and id<>:id " +
        "    and state  IN('A','B')";
    datosUnique = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id:req.body.dataPack.id,
            anio: req.body.dataPack["anio"],
            tipo: req.body.dataPack["tipo"],
            id_catquincena_ini: req.body.dataPack["id_catquincena_ini"],
            id_catquincena_fin: req.body.dataPack["id_catquincena_fin"],
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    /**
     * existe semestre activo?
     */    
     query = "select * " +
     "from semestre as a " +
     "where actual=1 " +
        "    and id<>:id " +
        "    and state  IN('A','B')";
    hayActual = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id:req.body.dataPack.id
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/
        
        id: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                if (hayActual.length > 0 && req.body.dataPack["actual"]==1) errors.push({ type: "registroEstatus", actual:"Activo" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        anio: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                if (datosUnique.length > 0) errors.push({ type: "uniqueRecord" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        tipo: {
            type: "string",
            custom(value, errors) {
                if (!(value == "A" || value == "B")) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catquincena_ini: {
            type: "number",
            custom(value, errors) {
                if ((value <= 0 || value==32767)) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catquincena_fin: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catquincena_fininterinas: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
    };

    var vres = true;
    if (req.body.actionForm.toUpperCase() == "NUEVO" ||
        req.body.actionForm.toUpperCase() == "EDITAR") {
        vres = await dataValidator.validate(req.body.dataPack, dataVSchema);
    }

    /* validation failed */
    if (!(vres === true)) {
        let errors = {},
            item;

        for (const index in vres) {
            item = vres[index];

            errors[item.field] = item.message;
        }

        res.status(200).send({
            error: true,
            message: errors
        });
        return;
        /*throw {
            name: "ValidationError",
            message: errors
        };*/
    }


    //buscar si existe el registro
    Semestre.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(semestre => {
            if (!semestre) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Semestre.create(
                    req.body.dataPack
                ).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                }).catch(err => {
                    res.status(200).send({ error: true, message: [err.errors[0].message] });
                });
            } else {
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                semestre.update(req.body.dataPack).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.setUpdateFromWebService = async(req, res) => {
    let promises = [];

    //obtener los datos
    //obtener token
    request.post({
        url: 'http://' + configsvc.HOST + ':' + configsvc.PORT + configsvc.servicetoken,
        form: {
            usuario: configsvc.usuario,
            contrasena: configsvc.contrasena
        }
    }, function(err, httpResponse, body) {
        //llamar al servicio con el token e id usuario
        request({
            uri: 'http://' + configsvc.HOST + ':' + configsvc.PORT + configsvc.servicesemestres,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset = utf-8',
                'access-token': JSON.parse(body).body[0].token
            },
            method: 'GET',
        }, async function(err, httpResponse, body) {
            body = JSON.parse(body).body;
            pasa = true;

            //Revisar y ejecutar todos los registros
            await Promise.all(body.map(async function(d) {
                if (pasa) {
                    const obj = await Semestre.findOne({
                        where: {
                            [Op.and]: [{ id: d.idsemestre }, {
                                id: {
                                    [Op.gt]: 0
                                }
                            }],
                        }
                    });

                    if (obj) {
                        return obj.update({
                            state: 'A',
                            id_usuarios_r: req.userId,
                            tipo: d.tiposemestre,
                            anio: d.aniosemestre,
                            id_catquincena_ini: d.idquincenaini,
                            id_catquincena_fin: d.idquincenafin,
                            id_catquincena_fininterinas: d.idquincenafininterinas,
                            permitemodificacion: d.permitemodificacion,
                            permitecargadeplantillas: d.permitecargadeplantillas,
                            qnainiciosemestre: d.qnainiciosemestre,
                            qnafinsemestre: d.qnafinsemestre,
                            actual: d.actual
                        }).catch(err => {
                            res.status(500).send({ message: err.message });
                            pasa = false;
                        });
                    } else {
                        return Semestre.create({
                            id: d.idsemestre,
                            id_usuarios_r: req.userId,
                            state: 'A',
                            tipo: d.tiposemestre,
                            anio: d.aniosemestre,
                            id_catquincena_ini: d.idquincenaini,
                            id_catquincena_fin: d.idquincenafin,
                            id_catquincena_fininterinas: d.idquincenafininterinas,
                            permitemodificacion: d.permitemodificacion,
                            permitecargadeplantillas: d.permitecargadeplantillas,
                            qnainiciosemestre: d.qnainiciosemestre,
                            qnafinsemestre: d.qnafinsemestre,
                            actual: d.actual
                        }).catch(err => {
                            res.status(500).send({ message: err.message });
                            pasa = false;
                        });
                    }
                }
            }));
            if (pasa)
                res.status(200).send({ message: "success", });
        })
    })
}