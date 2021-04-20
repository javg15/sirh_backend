const db = require("../models");
const { Op } = require("sequelize");
const globales = require("../config/global.config");
const mensajesValidacion = require("../config/validate.config");
const Categorias = db.categorias;

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
        query = "SELECT * FROM s_categorias_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {
        query = "SELECT * FROM s_categorias_mgr('" +
            "&modo=0&id_usuario=:id_usuario" +
            "&inicio=:start&largo=:length" +
            "&scampo=:scampo&soperador=:soperador&sdato=" + req.body.opcionesAdicionales.datosBusqueda.valor +
            "&ordencampo=" + req.body.columns[req.body.order[0].column].data +
            "&ordensentido=" + req.body.order[0].dir + "')";

        datos = await db.sequelize.query(query, {
            // A function (or false) for logging your queries
            // Will get called for every SQL query that gets sent
            // to the server.
            logging: console.log,

            replacements: {
                id_usuario: req.userId,
                start: (typeof req.body.start !== typeof undefined ? req.body.start : 0),
                length: (typeof req.body.start !== typeof undefined ? req.body.length : 1),
                scampo: (typeof req.body.start !== typeof undefined ? parseInt(req.body.opcionesAdicionales.datosBusqueda.campo) : 0),
                soperador: (typeof req.body.start !== typeof undefined ? parseInt(req.body.opcionesAdicionales.datosBusqueda.operador) : 0),
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

    Categorias.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(categorias => {
            if (!categorias) {
                return res.status(404).send({ message: "Categorias Not found." });
            }

            res.status(200).send(categorias);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}



exports.getCatalogo = async(req, res) => {

    Categorias.findAll({
            attributes: ['id', 'clave', 'denominacion', [db.sequelize.literal("COALESCE(clave, '.') || ' - ' || COALESCE(denominacion, '.')"), "text"]],
            order: [
                ['clave', 'ASC'],
            ]
        }).then(categorias => {
            if (!categorias) {
                return res.status(404).send({ message: "Categorias Not found." });
            }

            res.status(200).send(categorias);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogoSegunPlantel = async(req, res) => {

    //Definir el valor a buscar segun el tipo de plantel
    let aplicaa = [3];
    if (req.body.tipoplantel == "A" || req.body.tipoplantel == "B" || req.body.tipoplantel == "C")
        aplicaa.push(2)
    else if (req.body.tipoplantel == "EMSAD")
        aplicaa.push(1)

    Categorias.findAll({
            attributes: ['id', 'clave', 'denominacion', [db.sequelize.literal("COALESCE(clave, '.') || ' - ' || COALESCE(denominacion, '.')"), "text"]],
            where: {
                aplicaa: aplicaa,
            },
            order: [
                ['clave', 'ASC'],
            ]
        }).then(categorias => {
            if (!categorias) {
                return res.status(404).send({ message: "Categorias Not found." });
            }

            res.status(200).send(categorias);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}


exports.getCatalogoDisponibleEnPlantilla = async(req, res) => {

    let query = "SELECT c.id, c.clave, c.denominacion, c.horasasignadas, COALESCE(c.clave, '.') || ' - ' || COALESCE(c.denominacion, '.') AS text " +
        " FROM categorias as c " +
        " LEFT JOIN cattipocategoria as cc ON c.id_cattipocategoria=cc.id " +
        " WHERE  cc.id_catplantillas=:id_catplantillas " +
        " AND (fn_categorias_disponibles_plantillas(:id_catplanteles,c.id,:id_plazas)->>'plazas_disponibles')::integer>0";
    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_catplanteles: req.body.id_catplanteles,
            id_plazas: req.body.id_plazas, //cuando quiero desplegar tambien el de la plaza buscada
            id_catplantillas: req.body.id_catplantillas,
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    res.status(200).send(datos);
}

exports.getCatalogoDocentes = async(req, res) => {

    let query = "select c.id, c.clave, c.denominacion, COALESCE(c.clave, '.') || ' - ' || COALESCE(c.denominacion, '.') AS text " +
        " from categorias as c " +
        " where denominacion LIKE '%PROFESOR CB%' OR denominacion LIKE 'EMSAD%' " +
        " order by id";
    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_catplanteles: req.body.id_catplanteles,
            id_plazas: req.body.id_plazas, //cuando quiero desplegar tambien el de la plaza buscada
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    res.status(200).send(datos);
}

exports.setRecord = async(req, res) => {
    Object.keys(req.body.dataPack).forEach(function(key) {
        if (key.indexOf("id_", 0) >= 0 || key.indexOf("aplicaa", 0) >= 0) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
        }
    })

    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/

        id: { type: "number" },
        clave: { type: "string", max: 3 },
        denominacion: { type: "string", min: 5 },
        nivelsalarial: { type: "string", max: 5 },
        aplicaa: { type: "number" },
        id_cattipocategoria: { type: "number" },
        id_tiponomina: { type: "number" },
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
    Categorias.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(categorias => {
            if (!categorias) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Categorias.create(
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

                categorias.update(req.body.dataPack).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}