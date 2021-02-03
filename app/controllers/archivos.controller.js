const db = require("../models");
const { Op } = require("sequelize");
const mensajesValidacion = require("../config/validate.config");
var stream = require('stream');
const Archivos = db.archivos;

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
        query = "SELECT * FROM s_catcentrostrabajo_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {
        query = "SELECT * FROM s_catcentrostrabajo_mgr('" +
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


exports.download = async(req, res) => {
    Archivos.findOne({
            where: {
                id: req.params.id,
            }
        })
        .then(file => {
            var fileContents = Buffer.from(file.datos, "base64");
            var readStream = new stream.PassThrough();
            readStream.end(fileContents);

            res.set('Content-disposition', 'attachment; filename=' + file.nombre);
            res.set('Content-Type', file.tipo);

            readStream.pipe(res);

        }).catch(err => {
            console.log(err);
            res.json({ msg: 'Error', detail: err });
        });
}

exports.upload = async(req, res) => {
        //buscar si existe el registro
    Archivos.findOne({
            where: {
                id: req.body.idFile
            }
        })
        .then(archivos => {
            if (!archivos) {
                Archivos.create({
                    tipo: req.file.mimetype,
                    nombre: req.file.originalname,
                    datos: req.file.buffer
                }).then(self => {
                    res.status(200).send({ message: "success", id: self.id });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({ message: err.message });
                });
            } else {
                archivos.update({
                    tipo: req.file.mimetype,
                    nombre: req.file.originalname,
                    datos: req.file.buffer
                }).then(self => {
                    res.status(200).send({ message: "success", id: self.id });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({ message: err.message });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.listFiles = async(req, res) => {
        Archivos.findAll({
            attributes: ['id', 'nombre', 'tipo'],
            where: {
                id: req.params.id,
            }
        }).then(files => {
            res.json(files);
        }).catch(err => {
            console.log(err);
            res.json({ msg: 'Error', detail: err });
        });
    }
    //obtiene solo los campos de referencia externa
exports.getRecordReferencia = async(req, res) => {

    Archivos.findAll({
            attributes: ['id', 'tabla', 'id_tabla'],
            where: {
                id: req.body.id,
            }
        }).then(archivo => {
            if (!archivo) {
                return res.status(404).send({ message: "archivo Not found." });
            }

            res.status(200).send(archivo);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

//Actualiza solo los campos de referencia externa
exports.setRecordReferencia = async(req, res) => {
    //buscar si existe el registro
    Archivos.findOne({
            where: {
                id: req.body.dataPack.id
            }
        })
        .then(archivos => {
            if (archivos) {

                archivos.update({
                        tabla: req.body.dataPack.tabla,
                        id_tabla: req.body.dataPack.id_tabla,
                    }, )
                    .then((self) => {
                        // here self is your instance, but updated
                        res.status(200).send({ message: "success", id: self.id });
                    });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}