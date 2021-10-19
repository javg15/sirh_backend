const db = require("../models");
const { Op } = require("sequelize");
const mensajesValidacion = require("../config/validate.config");
const globales = require("../config/global.config");
const Personalhoras = db.personalhoras;
const Catquincena = db.catquincena;

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
        params = req.body;

    if (req.body.solocabeceras == 1) {
        params = req.body;

        query = "SELECT * FROM s_personalhoras_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {

        query = "SELECT * FROM s_personalhoras_mgr('" +
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

exports.getAdminSub = async(req, res) => {
    let datos = "",
        query = "",
        params = req.body.dataTablesParameters;

    if (req.body.solocabeceras == 1) {
        params = req.body;
        query = "SELECT * FROM s_personalhorassub_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {
        query = "SELECT * FROM s_personalhorassub_mgr('" +
            "&modo=:modo&id_usuario=:id_usuario" +
            "&inicio=:start&largo=:length" +
            "&ordencampo=ID" +
            "&ordensentido=DESC" +
            //"&state=" + params.opcionesAdicionales.state +
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
        //console.log(JSON.stringify(respuesta));
    res.status(200).send(respuesta);
    //return res.status(200).json(data);
    // res.status(500).send({ message: err.message });
}

exports.getAdminSubResumen = async(req, res) => {
    params = req.body;
    query = "SELECT * FROM fn_horas_cuenta_resumen(:id_personal,:id_catplanteles,:id_gruposclase,:id_materiasclase,:id_catestatushora,:id_semestre)"; //el modo no existe, solo es para obtener un registro

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_personal: params.id_personal,
            id_semestre: params.id_semestre,
            id_catplanteles: 0,
            id_gruposclase: 0,
            id_materiasclase: 0,
            id_catestatushora: 0,

            start: (typeof params.start !== typeof undefined ? params.start : 0),
            length: (typeof params.start !== typeof undefined ? params.length : 1),
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });
    //console.log(JSON.stringify(respuesta));
    res.status(200).send(datos);
    //return res.status(200).json(data);
    // res.status(500).send({ message: err.message });
}


exports.getRecord = async(req, res) => {

    Personalhoras.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(personalhoras => {
            if (!personalhoras) {
                return res.status(404).send({ message: "Personalhoras Not found." });
            }

            res.status(200).send(personalhoras);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogo = async(req, res) => {

    Personalhoras.findAll({
            attributes: ['id', 'descripcion'],
            order: [
                ['descripcion', 'ASC'],
            ]
        }).then(personalhoras => {
            if (!personalhoras) {
                return res.status(404).send({ message: "Personalhoras Not found." });
            }

            res.status(200).send(personalhoras);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getRecordTitularEnLicencia = async(req, res) => {
    //:id_personalhoras<>0 es edición
    let query = "select p.id as id_personalhoras,pe.id, pe.rfc ,pe.numeemp ,fn_idesc_personal(pe.id) as nombre " +
        "from personalhoras as p  " +
        "    left join personal as pe on p.id_personal =pe.id " +
        "WHERE p.id_catplanteles=:id_catplanteles    " +
        "AND p.id_gruposclase=:id_gruposclase " +
        "AND p.id_materiasclase=:id_materiasclase " +
        "AND p.id_catestatushora =5  " //--en licencia
        +
        "AND p.id_semestre =:id_semestre " +
        "AND p.state IN ('A','B') ";

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_catplanteles: req.body.id_catplanteles,
            id_gruposclase: req.body.id_gruposclase,
            id_materiasclase: req.body.id_materiasclase,
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


exports.setRecord = async(req, res) => {
    Object.keys(req.body.dataPack).forEach(function(key) {
        if (key.indexOf("id_", 0) >= 0 ||
            key == "horas" || key == "horaestatus" || key == "frenteagrupo") {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
        }
        if (typeof req.body.dataPack[key] == 'number' && isNaN(parseFloat(req.body.dataPack[key]))) {
            req.body.dataPack[key] = null;
        }
    })

    //obtener la quincena activa
    const quincenaActiva = await Catquincena.findOne({
        where: {
            [Op.and]: [{ id_catestatusquincena: 1 }, {
                    id: {
                        [Op.gt]: 0
                    },
                },
                { state: "A" },
            ],
        }
    })

    //existe semestre,plantel,grupo,materia,estatus
    const personalhorasExiste = await Personalhoras.findOne({
        where: {
            [Op.and]: [{ id_semestre: req.body.dataPack.id_semestre },
                { id_catplanteles: req.body.dataPack.id_catplanteles },
                { id_gruposclase: req.body.dataPack.id_gruposclase },
                { id_materiasclase: req.body.dataPack.id_materiasclase },
                { id_catestatushora: req.body.dataPack.id_catestatushora },
                { id_cattipohorasdocente: req.body.dataPack.id_cattipohorasdocente },
                { state: "A" },
            ],
        }
    })

    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/

        id: { type: "number" },
        id_personal: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                if (personalhorasExiste) errors.push({ type: "uniqueRecord" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catplanteles: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_semestre: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catestatushora: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catnombramientos: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        cantidad: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "numberMin", "expected": 1 })
                return value; // Sanitize: remove all special chars except numbers
            },
        },
        id_gruposclase: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_materiasclase: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catquincena_ini: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catplanteles_aplicacion: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catquincena_fin: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                    ///////////////
                dateFin = value
                dateIni = req.body.dataPack.id_catquincena_ini

                if (dateFin < dateIni)
                    errors.push({ type: "quincenaFin", field: "id_catquincena_fin" })

                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_cattipohorasdocente: {
            type: "number",
            custom(value, errors) {
                if (req.body.dataPack["horassueltas"] == 1 && value <= 0) errors.push({ type: "selection" })
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
    Personalhoras.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                        id: {
                            [Op.gt]: 0
                        },
                    },
                    { state: "A" },
                ],
            }
        })
        .then(personalhoras => {

            if (!personalhoras) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Personalhoras.create(
                    req.body.dataPack
                ).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                }).catch(err => {
                    console.log("err.errors=>", err)
                    res.status(200).send({ error: true, message: [err.errors[0].message] });
                });
            } else {
                //Si la quincena inicial es mayor a la quincena activa
                if (req.body.dataPack['id_catquincena_ini'] < quincenaActiva.id &&
                    req.body.actionForm.toUpperCase() == "EDITAR") {
                    //como prevención solo dejar la quincena final    
                    delete req.body.dataPack.id_personal;
                    delete req.body.dataPack.id_catplanteles;
                    delete req.body.dataPack.id_semestre;
                    delete req.body.dataPack.id_catestatushora;
                    delete req.body.dataPack.id_catnombramientos;
                    delete req.body.dataPack.cantidad;
                    delete req.body.dataPack.id_gruposclase;
                    delete req.body.dataPack.id_materiasclase;
                    delete req.body.dataPack.id_catquincena_ini;
                    delete req.body.dataPack.id_cattipohorasdocente;
                }

                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                personalhoras.update(req.body.dataPack).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });

            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}