const db = require("../models");
const { Op } = require("sequelize");
const globales = require("../config/global.config");
const mensajesValidacion = require("../config/validate.config");
const Plantillaspersonal = db.plantillaspersonal;
const Catplanteles = db.catplanteles;
const Catplantillas = db.catplantillas;
const Personal = db.personal;
var moment = require('moment');

const { QueryTypes } = require('sequelize');
let Validator = require('fastest-validator');
const { catplanteles } = require("../models");
/* create an instance of the validator */
let dataValidator = new Validator({
    useNewCustomCheckerFunction: true, // using new version
    messages: mensajesValidacion
});


exports.getAdmin = async(req, res) => {
    let datos = "",
        query = "",
        params = req.body;

    if (req.body.solocabeceras == 1) {
        params = req.body;

        query = "SELECT * FROM s_plantillaspersonal_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {

        query = "SELECT * FROM s_plantillaspersonal_mgr('" +
            "&modo=:modo&id_usuario=:id_usuario" +
            "&inicio=:start&largo=:length" +
            "&ordencampo=" + req.body.columns[req.body.order[0].column].data +
            "&ordensentido=" + req.body.order[0].dir +
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


exports.getRecord = async(req, res) => {

    Plantillaspersonal.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(plantillaspersonal => {
            if (!plantillaspersonal) {
                return res.status(404).send({ message: "Plantillaspersonal Not found." });
            }

            res.status(200).send(plantillaspersonal);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getRecordPersonal = async(req, res) => {

    Plantillaspersonal.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(plantillaspersonal => {
            if (!plantillaspersonal) {
                return res.status(404).send({ message: "Plantillaspersonal Not found." });
            }
            //Personal
            Personal.findOne({
                    where: {
                        id: plantillaspersonal.id_personal
                    }
                })
                .then(personal => {
                    if (!personal) {
                        return res.status(404).send({ message: "Personal Not found." });
                    }

                    res.status(200).send(personal);
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });

            //res.status(200).send(plantillaspersonal);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}


exports.getCatalogo = async(req, res) => {

    let query = "select pp.id,concat(lpad(pp.consecutivo::text, 5, '0'),' - ',fn_idesc_personal(pp.id_personal)) as descripcion " +
        "from plantillaspersonal as pp   " +
        "where pp.state in ('A','B') " +
        "order by lpad(pp.consecutivo::text, 5, '0')";

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    res.status(200).send(datos);
}

exports.getCatalogoSegunPlantel = async(req, res) => {

    let query = "select pp.id,concat(lpad(pp.consecutivo::text, 5, '0'),' - ',fn_idesc_personal(pp.id_personal)) as text " +
        "from plantillaspersonal as pp   " +
        "where pp.state in ('A','B') AND pp.id_catplanteles=:id_catplanteles " +
        "order by lpad(pp.consecutivo::text, 5, '0')";

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

exports.getConsecutivo = async(req, res) => {

    Plantillaspersonal.max('consecutivo', {
            where: {
                [Op.and]: [{
                        id_catplanteles: req.body.idCatplanteles
                    },
                    {
                        id_catplantillas: req.body.idCatplantillas
                    },
                    {
                        state: 'A'
                    },
                ]
            }
        })
        .then(max => {
            if (!max) {
                return res.status(200).send("1");
            }

            res.status(200).send((max + 1).toString());
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.setRecord = async(req, res) => {
    Object.keys(req.body.dataPack).forEach(function(key) {
        if (key.indexOf("id_", 0) >= 0 ||
            key.indexOf("consecutivo", 0) >= 0
        ) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
        }
    })
    let recordAsignado,
        personalAsignado = false,
        plantelAsignado = '',
        plantillaAsignada = '';

    //revisar si el personal está activo en otra plantilla
    await Plantillaspersonal.findOne({
            where: {
                [Op.and]: [{ id_personal: req.body.dataPack.id_personal },
                    { state: 'A' },
                    {
                        [Op.not]: [
                            { id: req.body.dataPack.id }
                        ]
                    }
                ],
            }
        })
        .then(plantillaspersonal => {
            if (plantillaspersonal) {
                recordAsignado = plantillaspersonal;
                personalAsignado = true;
            }
        });

    if (personalAsignado) {
        await Catplanteles.findOne({
                where: { id: recordAsignado.id_catplanteles },
            })
            .then(catplanteles => {
                if (catplanteles) {
                    plantelAsignado = catplanteles.ubicacion;
                }
            });

        await Catplantillas.findOne({
                where: { id: recordAsignado.id_catplantillas },
            })
            .then(catplantillas => {
                if (catplantillas) {
                    plantillaAsignada = catplantillas.descripcion;
                }
            });
    }
    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/

        id: { type: "number" },
        id_catplanteles: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catplantillas: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_personal: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                if (personalAsignado) errors.push({ type: "personalPlantillaAsignado", expected: plantelAsignado, actual: plantillaAsignada })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        consecutivo: { type: "number" },
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
        },
    };

    var vres = true;
    if (req.body.actionForm.toUpperCase() == "NUEVO" ||
        req.body.actionForm.toUpperCase() == "EDITAR") {
        vres = await dataValidator.validate(req.body.dataPack, dataVSchema);
    } else if (req.body.actionForm.toUpperCase() == "ACTUALIZAR") { //cambio de plantilla
        vres = Array();
        if (parseInt(req.body.record_id_catquincena) <= 0)
            vres.push({
                message: "Selecciona un elemento de 'Desactivar en quincena'",
                field: "record_id_catquincena",
                type: "selection"
            });

        //revisar que si haya un cambio de plantilla
        await Plantillaspersonal.findOne({
                where: {
                    [Op.and]: [{ id: req.body.dataPack.id }, {
                        id: {
                            [Op.gt]: 0
                        }
                    }],
                }
            })
            .then(plantillaspersonal => {
                if (plantillaspersonal.id_catplantillas == req.body.dataPack.id_catplantillas)
                    vres.push({
                        message: "La plantilla a actualizar debe ser diferente a la actual",
                        field: "id_catplantillas",
                        type: "required"
                    });
            });

        if (parseInt(req.body.dataPack["id_catplantillas"]) <= 0)
            vres.push({
                message: "Selecciona un elemento de 'Plantilla'",
                field: "id_catplantillas",
                type: "selection"
            });

        //no hay errores
        if (vres.length == 0)
            vres = true;
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
    Plantillaspersonal.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(plantillaspersonal => {
            if (!plantillaspersonal) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Plantillaspersonal.create(
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

                plantillaspersonal.update(req.body.dataPack).then(async(self) => {
                    if (req.body.actionForm.toUpperCase() == "ACTUALIZAR") { //cambio de plantilla
                        query = "SELECT fn_set_plantillas_update(" + self.id + "," + req.body.record_id_catquincena + ")"; //el modo no existe, solo es para obtener un registro
                        console.log("query:", query)
                        datos = await db.sequelize.query(query, {
                            plain: false,
                            raw: true,
                            type: QueryTypes.SELECT
                        });
                    }
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}