const db = require("../models");
const { Op } = require("sequelize");
const mensajesValidacion = require("../config/validate.config");
const globales = require("../config/global.config");
const Plazas = db.plazas;
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
        query = "";

    if (req.body.solocabeceras == 1) {
        query = "SELECT * FROM s_plazas_mgr('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {
        query = "SELECT * FROM s_plazas_mgr('" +
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

exports.getClave = async(req, res) => {
    let query = "select  fn_plaza_clave(p.id) as clave " +
        "from plazas as p " +
        "where p.id =:id_plazas ";
    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_plazas: req.body.id_plazas,
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    res.status(200).send(datos);
};

exports.getPlazaSegunPersonal = async(req, res) => {
    let query = "select p.*,fn_plaza_clave(p.id) as clave " +
        "from plazas as p " +
        " left join plantillasdocsnombramiento as pn on p.id=pn.id_plazas " +
        " left join plantillaspersonal as pp on pn.id_plantillaspersonal =pp.id  " +
        "where pp.id_personal = :id_personal " +
        "and pp.state in ('A','B') " +
        " and pn.state in ('A') ";

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_personal: req.body.id_personal,
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    res.status(200).send(datos);
};

exports.getRecord = async(req, res) => {

    Plazas.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(plazas => {
            if (!plazas) {
                return res.status(404).send({ message: "Plazas Not found." });
            }

            res.status(200).send(plazas);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getConsecutivo = async(req, res) => {

    Plazas.max('consecutivo', {
            where: {
                [Op.and]: [{
                        id_categorias: req.body.idCategorias
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


exports.getRecordPlazasInfo = async(req, res) => {
    let datos = "",
        query = "";

    query = "SELECT * FROM fn_plazas_disponibles(" +
        ":id_categorias," +
        ":id_catplanteles)";

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_categorias: req.body.id_categorias,
            id_catplanteles: req.body.id_catplanteles,
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

exports.getHistorial = async(req, res) => {
    let datos = "",
        query = "",
        params = req.body.dataTablesParameters;

    if (params.solocabeceras == 1) {
        query = "select * from srep_plazas_historial('&modo=10')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {
        query = "select * from srep_plazas_historial('&modo=0&id_plazas=:id_plazas')";

        datos = await db.sequelize.query(query, {
            // A function (or false) for logging your queries
            // Will get called for every SQL query that gets sent
            // to the server.
            logging: console.log,

            replacements: {
                id_plazas: params.opcionesAdicionales.id_plazas,
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

exports.setRecord = async(req, res) => {
    Object.keys(req.body.dataPack).forEach(function(key) {
        if (key.indexOf("id_", 0) >= 0) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
            if (isNaN(req.body.dataPack[key]))
                req.body.dataPack[key] = 0;
        }
    });

    /*verificar plazas disponibles*/
    let datos = "",
        query = "",
        totalplazasautorizadas = 0,
        totalautorizadasalplantel = 0,
        totalplazasdisponibles = 0;

    query = "SELECT * FROM fn_plazas_disponibles(" +
        ":id_categorias," +
        ":id_catplanteles)";

    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_categorias: req.body.dataPack["id_categorias"],
            id_catplanteles: req.body.dataPack["id_catplanteles"],
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });
    totalplazasautorizadas = datos[0].fn_plazas_disponibles.totalplazasautorizadas;
    totalplazasdisponibles = datos[0].fn_plazas_disponibles.totalplazasdisponibles;
    totalautorizadasalplantel = datos[0].fn_plazas_disponibles.totalautorizadasalplantel;


    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/

        id: { type: "number" },
        id_categorias: {
            type: "number",
            custom(value, errors) {
                //al ser edición , entonces, se considera una plaza disponible más
                if (req.body.dataPack["id"] > 0) totalplazasdisponibles++;

                /*if (totalplazasautorizadas <= 0) errors.push({ type: "totalplazasautorizadas", actual: datos[0].fn_plazas_disponibles.totalplazasautorizadas })
                if (totalautorizadasalplantel <= 0) errors.push({ type: "totalautorizadasalplantel", actual: datos[0].fn_plazas_disponibles.totalautorizadasalplantel })
                if (totalplazasdisponibles <= 0) errors.push({ type: "totalplazasdisponibles", actual: datos[0].fn_plazas_disponibles.totalplazasdisponibles })*/
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_categoriasdetalle: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
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
        /*id_catcentrostrabajo: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },*/
        /*id_catplantelescobro: { type: "number" },
        id_catzonageografica: { type: "number" },*/
        id_catestatusplaza: {
            type: "number",
            custom(value, errors) {
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        /*fecha_creacion: {
            type: "string",
            custom(value, errors, schema) {
                let dateIni = new Date(value)
                let dateFin = new Date()

                if (dateIni > dateFin)
                    errors.push({ type: "dateMax", field: "fechaexpedicion", expected: dateFin.toISOString().split('T')[0] })

                if (!moment(value).isValid() || !moment(value).isBefore(new Date()) || !moment(value).isAfter('1900-01-01'))
                    errors.push({ type: "date" })

                //315554400000 = 1/1/1980
                if (dateIni.getTime() < 315554400000) errors.push({ type: "dateMin", expected: '1/1/1980', actual: value });
                if (dateIni.getTime() > Date.parse(new Date())) errors.push({ type: "dateMax", expected: new Date(), actual: value });
                return value
            }
        },*/
        id_catquincena_ini: {
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
    Plazas.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(plazas => {
            if (!plazas) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Plazas.create(
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

                plazas.update(req.body.dataPack).then((self) => {
                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogo = async(req, res) => {

    Plazas.findAll({
            attributes: ['id', 'descripcion', 'ubicacion', 'clave'],
            order: [
                ['descripcion', 'ASC'],
            ]
        }).then(plazas => {
            if (!plazas) {
                return res.status(404).send({ message: "Plazas Not found." });
            }

            res.status(200).send(plazas);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getCatalogoDisponibleSegunCategoria = async(req, res) => {

    let query = "select distinct p.id, fn_plaza_clave(p.id) as text " +
        "from plazas as p " +
        "left join plantillasdocsnombramiento as pn on p.id=pn.id_plazas and pn.id_categorias = :id_categorias and pn.state in ('A') " +
        "left join catestatusplaza as ce on p.id_catestatusplaza=ce.id " +
        "where p.id_categorias =:id_categorias " +
        "   and (pn.id is null " + //no esten asignadas
        "       or (pn.id is not null and (ce.id in (1,2) or ce.tipo=2)) " + //esten asignadas, pero su estatus de plaza sea vacante o licencia
        "       or coalesce(pn.id_plazas,0) =:id_plazas ) " + //una plaza en especifico
        "   and p.id_catplanteles =:id_catplanteles " +
        "   and p.state IN ('A')";
    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_categorias: req.body.id_categorias,
            id_plazas: req.body.id_plazas, //cuando quiero desplegar tambien el de la plaza buscada
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