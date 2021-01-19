const db = require("../models");
const mensajesValidacion = require("../config/validate.config");
const User = db.user;

const { QueryTypes } = require('sequelize');
let Validator = require('fastest-validator');
/* create an instance of the validator */
let dataValidator = new Validator({
    useNewCustomCheckerFunction: true, // using new version
    messages: mensajesValidacion
});

exports.getAdmin = async(req, res) => {
    //console.log(req.body.opcionesAdicionales)
    const query = "SELECT * FROM s_usuarios_mgr('" +
        "&modo=0&id_usuario=:id_usuario" +
        "&inicio=:start&largo=:length" +
        "&scampo=:scampo&soperador=:soperador&sdato=" + req.body.opcionesAdicionales.datosBusqueda.valor +
        "&ordencampo=" + req.body.columns[req.body.order[0].column].data +
        "&ordensentido=" + req.body.order[0].dir + "')";

    const datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_usuario: req.userId,
            start: req.body.start,
            length: req.body.length,
            scampo: parseInt(req.body.opcionesAdicionales.datosBusqueda.campo),
            soperador: parseInt(req.body.opcionesAdicionales.datosBusqueda.operador),
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

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
            draw: 1,
            recordsTotal: (datos.length > 0 ? parseInt(datos[0].total_count) : 0),
            recordsFiltered: parseInt(datos[0].total_count),
            data: datos,
            columnNames: columnNames
        }
        //console.log(JSON.stringify(respuesta));
    res.status(200).send(respuesta);
    //return res.status(200).json(data);
    // res.status(500).send({ message: err.message });
}


exports.getRecord = async(req, res) => {

    User.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            res.status(200).send(user);
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

    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/

        id: { type: "number" },
        pass: { type: "string", min: 8, max: 50, pattern: passwordPattern },
        username: { type: "string", min: 5 },
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
    res.status(200).send("Created");
}