const db = require("../models");
const { Op } = require("sequelize");
const globales = require("../config/global.config");
const mensajesValidacion = require("../config/validate.config");
const Categoriaspercepciones = db.categoriaspercepciones;
var moment = require('moment');

const { QueryTypes } = require('sequelize');
let Validator = require('fastest-validator');
/* create an instance of the validator */
let dataValidator = new Validator({
    useNewCustomCheckerFunction: true, // using new version
    messages: mensajesValidacion
});


exports.getAdmin = async(req, res) => {
    let datos = "",
        query = "",
        params = req.body.dataTablesParameters;

    if (req.body.solocabeceras == 1) {
        params = req.body;

        query = "SELECT * FROM s_categoriaspercepciones_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {
        query = "SELECT * FROM s_categoriaspercepciones_mgr('" +
            "&modo=:modo&id_usuario=:id_usuario" +
            "&inicio=:start&largo=:length" +
            "&fkey=" + params.opcionesAdicionales.fkey +
            "&fkeyvalue=:fkeyvalue')";

        datos = await db.sequelize.query(query, {
            // A function (or false) for logging your queries
            // Will get called for every SQL query that gets sent
            // to the server.
            logging: console.log,

            replacements: {
                id_usuario: req.userId,
                modo: params.opcionesAdicionales.modo,
                fkeyvalue: params.opcionesAdicionales.fkeyvalue,
                start: (typeof params.start !== typeof undefined ? params.start : 0),
                length: (typeof params.start !== typeof undefined ? params.length : 1),
                /*scampo: (typeof params.start !== typeof undefined ? parseInt(params.opcionesAdicionales.datosBusqueda.campo) : 0),
                soperador: (typeof params.start !== typeof undefined ? parseInt(params.opcionesAdicionales.datosBusqueda.operador) : 0),
                sdato: (typeof params.start !== typeof undefined ? params.opcionesAdicionales.datosBusqueda.valor.toString() : 0),*/
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
        draw: params.opcionesAdicionales.raw,
        recordsTotal: (datos.length > 0 ? parseInt(datos[0].total_count) : 0),
        recordsFiltered: (datos.length > 0 ? parseInt(datos[0].total_count) : 0),
        data: datos,
        columnNames: columnNames
    }

    res.status(200).send(respuesta);
    //return res.status(200).json(data);
    // res.status(500).send({ message: err.message });
}

exports.getRecord = async(req, res) => {

    Categoriaspercepciones.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(categoriaspercepciones => {
            if (!categoriaspercepciones) {
                return res.status(404).send({ message: "Categoriaspercepciones Not found." });
            }

            res.status(200).send(categoriaspercepciones);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getRecordSegunCategoria = async(req, res) => {

    Categoriaspercepciones.findAll({
            limit: 1,
            where: {
                id_categorias: req.body.id_categorias
            },
            order: [
                ['created_at', 'DESC']
            ]
        })
        .then(categoriaspercepciones => {
            if (!categoriaspercepciones) {
                return res.status(404).send({ message: "Categoriaspercepciones Not found." });
            }

            res.status(200).send(categoriaspercepciones);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogo = async(req, res) => {

    Categoriaspercepciones.findAll({
            attributes: ['id', 'descripcion'],
            order: [
                ['descripcion', 'ASC'],
            ]
        }).then(categoriaspercepciones => {
            if (!categoriaspercepciones) {
                return res.status(404).send({ message: "Categoriaspercepciones Not found." });
            }

            res.status(200).send(categoriaspercepciones);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.setRecord = async(req, res) => {
    Object.keys(req.body.dataPack).forEach(function(key) {
        if (key.indexOf("id_", 0) >= 0) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
        } else if (key.indexOf("importe", 0) >= 0) {
            req.body.dataPack[key] = parseFloat(req.body.dataPack[key].toString().replace("$", "").replace(",", ""));
        }
    })

    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/

        id: { type: "number" },
        /*fecha_inicio: {
            type: "string",
            custom(value, errors) {
                /*let dateIni = new Date(value)
                let dateFin = new Date()

                if (dateIni > dateFin)
                    errors.push({ type: "dateMax", field: "fecha_inicio", expected: dateFin.toISOString().split('T')[0] })*

                if (!moment(value).isValid() || !moment(value).isBefore(new Date()) || !moment(value).isAfter('1900-01-01'))
                    errors.push({ type: "date" })
                return value;
            },
        },
        fecha_fin: {
            type: "string",
            custom(value, errors) {
                let dateIni = new Date(req.body.dataPack["fecha_inicio"])
                let dateFin = new Date(value)

                if (dateIni > dateFin)
                    errors.push({ type: "dateMax", field: "fecha_fin", expected: dateIni.toISOString().split('T')[0] })

                if (!moment(value).isValid() || !moment(value).isAfter('1900-01-01'))
                    errors.push({ type: "date" })
                return value;
            },
        },*/
        importe: {
            type: "number",
            custom(value, errors) {
                if (value == 0)
                    errors.push({ type: "required" })
                return value;
            },
        },
        id_catpercepciones: {
            type: "number",
            custom(value, errors) {
                if (value == 0)
                    errors.push({ type: "required" })
                return value;
            },
        },
        id_catquincena_ini: {
            type: "number",
            custom(value, errors) {
                if (value == 0)
                    errors.push({ type: "required" })
                return value;
            },
        },
        id_catquincena_fin: {
            type: "number",
            custom(value, errors) {
                if (value == 0)
                    errors.push({ type: "required" })
                return value;
            },
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
    Categoriaspercepciones.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(categoriaspercepciones => {
            if (!categoriaspercepciones) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Categoriaspercepciones.create(
                    req.body.dataPack
                ).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                }).catch(err => {
                    res.status(500).send({ message: err.message });
                });
            } else {
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                categoriaspercepciones.update(req.body.dataPack).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}