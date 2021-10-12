const db = require("../models");
const { Op } = require("sequelize");
const mensajesValidacion = require("../config/validate.config");
const globales = require("../config/global.config");
const Materiasclase = db.materiasclase;

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
        query = "SELECT * FROM s_materiasclase_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {
        query = "SELECT * FROM s_materiasclase_mgr('" +
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

    Materiasclase.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(materiasclase => {
            if (!materiasclase) {
                return res.status(404).send({ message: "Materiasclase Not found." });
            }

            res.status(200).send(materiasclase);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogo = async(req, res) => {

    Materiasclase.findAll({
            attributes: ['id', [db.sequelize.literal("COALESCE(clave,'') || ' - ' || COALESCE(nombre,'')"), "text"]],
            order: [
                ['nombre', 'ASC'],
            ]
        }).then(materiasclase => {
            if (!materiasclase) {
                return res.status(404).send({ message: "Materiasclase Not found." });
            }

            res.status(200).send(materiasclase);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}
exports.getCatalogoSegunGrupo = async(req, res) => {
    let query = "select distinct mc.* " +
        "from horasclase as hc " +
        "    left join materiasclase as mc on mc.id=hc.id_materiasclase  " +
        "where hc.id_gruposclase = :id_gruposclase " +
        "    and hc.state in ('A','B') " +
        "    and mc.state in ('A','B') ";

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_gruposclase: req.body.id_gruposclase,
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




exports.getCatalogoConHorasDisponiblesSegunGrupo = async(req, res) => {
    let query = "select distinct mc.id,mc.nombre as text,cast(fn_horas_disponibles(h.id,:id_semestre,:id_cattiposemestre)->>'horasDisponibles' as integer) as horasdisponibles " +
        "from horasclase as h " +
        "   left join gruposclase as gc on h.id_gruposclase =gc.id " +
        "   left join materiasclase as mc on h.id_materiasclase =mc.id " +
        "where h.id_catplanteles =:id_catplanteles " +
        "   and h.id_gruposclase =:id_gruposclase " +
        "   and (cast(fn_horas_disponibles(h.id,:id_semestre,:id_cattiposemestre)->>'horasDisponibles' as integer)>0 OR COALESCE(:id_personalhoras,0)<>0)" +
        "   and h.state IN ('A','B') " +
        "order by mc.nombre ";

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_catplanteles: req.body.id_catplanteles,
            id_gruposclase: req.body.id_gruposclase,
            id_personalhoras: req.body.id_personalhoras,
            id_cattiposemestre: req.body.id_cattiposemestre,
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
        if (key.indexOf("id_", 0) >= 0 || key.indexOf("horas", 0) >= 0) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
        }
    })

    query = "select * " +
        "from materiasclase as a " +
        "where clave=:clave " +
        "    and id_semestre_ini=:id_semestre_ini ";
    "    and id_semestre_fin=:id_semestre_fin ";
    "    and state  IN('A','B')";
    datosUnique = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            clave: req.body.dataPack["clave"],
            tipo: req.body.dataPack["tipo"],
            id_semestre_ini: req.body.dataPack["id_semestre_ini"],
            id_semestre_fin: req.body.dataPack["id_semestre_fin"],
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

        id: { type: "number" },
        clave: { type: "string", min: 1 },
        nombre: { type: "string", min: 5 },
        id_semestre_ini: {
            type: "number",
            custom(value, errors) {
                if (datosUnique.length > 0) errors.push({ type: "uniqueRecord" })
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_semestre_fin: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        horas: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "numberMin", expected: 1, actual: value })
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
    Materiasclase.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(materiasclase => {
            delete req.body.dataPack.horasdisponibles; //temporal
            if (!materiasclase) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Materiasclase.create(
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

                materiasclase.update(req.body.dataPack).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}