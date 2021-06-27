const db = require("../models");
const { Op } = require("sequelize");
const mensajesValidacion = require("../config/validate.config");
const globales = require("../config/global.config");
const Gruposclase = db.gruposclase;

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
        query = "SELECT * FROM s_gruposclase_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {
        query = "SELECT * FROM s_gruposclase_mgr('" +
            "&modo=0&id_usuario=:id_usuario" +
            "&inicio=:start&largo=:length" +
            "&scampo=" + req.body.opcionesAdicionales.datosBusqueda.campo + "&soperador=" + req.body.opcionesAdicionales.datosBusqueda.operador + "&sdato=" + req.body.opcionesAdicionales.datosBusqueda.valor +
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

    Gruposclase.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(gruposclase => {
            if (!gruposclase) {
                return res.status(404).send({ message: "Gruposclase Not found." });
            }

            res.status(200).send(gruposclase);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogo = async(req, res) => {

    Gruposclase.findAll({
            attributes: ['id', ['grupo', 'text']],
            order: [
                ['grupo', 'ASC'],
            ]
        }).then(gruposclase => {
            if (!gruposclase) {
                return res.status(404).send({ message: "Gruposclase Not found." });
            }

            res.status(200).send(gruposclase);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogoSegunPlantel = async(req, res) => {
    let query = "select distinct gc.*,concat(gc.grupo,'-',gc.tiposemestre) as text " +
        "from horasclase as hc " +
        "    left join gruposclase as gc on gc.id=hc.id_gruposclase  " +
        "where hc.id_catplanteles=:id_catplanteles  " +
        "    and hc.id_semestre_ini=:id_semestre  " +
        "    and hc.state in ('A','B') " +
        "    and gc.state in ('A','B') " + 
        "order by concat(gc.grupo,'-',gc.tiposemestre) ";

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_catplanteles: req.body.id_catplanteles,
            id_semestre: req.body.id_semestre,
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

exports.getCatalogoConHorasDisponiblesSegunPlantel = async(req, res) => {
    let query = "select distinct gc.id,concat(gc.grupo ,'-',gc.tiposemestre) as text " +
        "from horasclase as h " +
        "    left join gruposclase as gc on h.id_gruposclase =gc.id " +
        "where h.id_catplanteles =:id_catplanteles " +
        "    and cast(fn_horas_disponibles(h.id)->>'horasDisponibles' as integer)>0 " +
        "   and h.state IN ('A','B') " +
        "order by concat(gc.grupo ,'-',gc.tiposemestre) ";

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_catplanteles: req.body.id_catplanteles,
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
        if (key.indexOf("id_", 0) >= 0) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
        }
    })

    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/

        id: { type: "number" },
        clave: { type: "string" },
        nombreplantel: { type: "string", min: 5 },
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
    Gruposclase.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(gruposclase => {
            if (!gruposclase) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Gruposclase.create(
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

                gruposclase.update(req.body.dataPack).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}