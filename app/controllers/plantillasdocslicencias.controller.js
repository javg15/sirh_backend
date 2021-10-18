const db = require("../models");
const { Op } = require("sequelize");
const globales = require("../config/global.config");
const mensajesValidacion = require("../config/validate.config");
const Plantillasdocslicencias = db.plantillasdocslicencias;
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

        query = "SELECT * FROM s_plantillasdocslicencias_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {

        query = "SELECT * FROM s_plantillasdocslicencias_mgr('" +
            "&modo=:modo&id_usuario=:id_usuario" +
            "&inicio=:start&largo=:length" +
            "&ordencampo=ID" +
            "&ordensentido=ASC" +
            "&fkey=" + params.opcionesAdicionales.fkey +
            "&fkeyvalue=" + params.opcionesAdicionales.fkeyvalue.join(",") + "')";

        datos = await db.sequelize.query(query, {
            // A function (or false) for logging your queries
            // Will get called for every SQL query that gets sent
            // to the server.
            logging: console.log,

            replacements: {
                id_usuario: req.userId,
                modo: params.opcionesAdicionales.modo,

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

exports.getDatosPrestacion = async(req, res) => {
    let datos = "",
        query = "";

    query = "SELECT * FROM fn_licencias_prestacion(:id_plantillasdocslicencias)"; //el modo no existe, solo es para obtener un registro

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_plantillasdocslicencias: req.body.id_plantillasdocslicencias,
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    respuesta = {
        antiguedad: (datos.length > 0 ? datos[0].fn_licencias_prestacion["antiguedad"] + " días en <" + datos[0].fn_licencias_prestacion["nombramiento"] + ">" : ""),
        dias_transcurridos: (datos.length > 0 ? parseInt(datos[0].fn_licencias_prestacion["dias_transcurridos_permiso"]) : 0),
        tipo_prestacion: (datos.length > 0 ? datos[0].fn_licencias_prestacion["tipo_prestacion"] : ""),
        cantidad_prestacion: (datos.length > 0 ? parseFloat(datos[0].fn_licencias_prestacion["cantidad_prestacion"]) * 100 : 0),
    }

    res.status(200).send(respuesta);
}


exports.getRecord = async(req, res) => {

    Plantillasdocslicencias.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(plantillasdocslicencias => {
            if (!plantillasdocslicencias) {
                return res.status(404).send({ message: "Plantillasdocslicencias Not found." });
            }

            res.status(200).send(plantillasdocslicencias);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogo = async(req, res) => {

    Plantillasdocslicencias.findAll({
            attributes: ['id', 'descripcion'],
            order: [
                ['descripcion', 'ASC'],
            ]
        }).then(plantillasdocslicencias => {
            if (!plantillasdocslicencias) {
                return res.status(404).send({ message: "Plantillasdocslicencias Not found." });
            }

            res.status(200).send(plantillasdocslicencias);
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
        }
    })

    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/

        id: { type: "number" },
        /*id_archivos: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "file", expected: 'Archivo .pdf' })
                return value; // Sanitize: remove all special chars except numbers
            }
        },*/
        fechainicio: {
            type: "string",
            custom(value, errors) {
                let dateIni = new Date(value)
                let dateFin = new Date()

                if (dateIni > dateFin)
                    errors.push({ type: "dateMax", field: "fechainicio", expected: dateFin.toISOString().split('T')[0] })

                if (!moment(value).isValid() || !moment(value).isBefore(new Date()) || !moment(value).isAfter('1900-01-01'))
                    errors.push({ type: "date" })
                return value;
            },
        },
        fechatermino: {
            type: "string",
            custom(value, errors) {
                let dateIni = new Date(value)
                let dateFin = new Date()

                /*if (dateIni > dateFin)
                    errors.push({ type: "dateMax", field: "fechatermino", expected: dateFin.toISOString().split('T')[0] })*/

                if (!moment(value).isValid() || !moment(value).isAfter('1900-01-01'))
                    errors.push({ type: "date" })

                ///////////////
                dateFin = new Date(value)
                dateIni = new Date(req.body.dataPack.fechainicio)

                if (isNaN(dateFin.getMonth()) == false && isNaN(dateIni.getMonth()) == false) {
                    if (dateFin < dateIni)
                        errors.push({ type: "dateMin", field: "fechatermino", expected: dateIni.toISOString().split('T')[0] })
                }
                return value;
            },
        },
        fechaingreso: {
            type: "string",
            custom(value, errors) {
                let dateIni = new Date(value)
                let dateFin = new Date()

                if (dateIni > dateFin)
                    errors.push({ type: "dateMax", field: "fechaingreso", expected: dateFin.toISOString().split('T')[0] })

                if (!moment(value).isValid() || !moment(value).isBefore(new Date()) || !moment(value).isAfter('1900-01-01'))
                    errors.push({ type: "date" })
                return value;
            },
        }
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
    Plantillasdocslicencias.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(plantillasdocslicencias => {
            if (!plantillasdocslicencias) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Plantillasdocslicencias.create(
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

                plantillasdocslicencias.update(req.body.dataPack).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}