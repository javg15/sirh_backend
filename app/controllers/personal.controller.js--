const db = require("../models");
const User = db.user;

const { QueryTypes } = require('sequelize');

exports.getAdmin = async(req, res) => {

    const query = "SELECT * FROM s_usuarios_mgr('" +
        "&modo=0&id_usuario=:id_usuario" +
        "&inicio=:start&largo=:length" +
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
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    var columnNames = Object.keys(datos[0]).map(function(key) {
        return key;
    });
    var quitarKeys = false;
    for (var i = 0; i < columnNames.length; i++) {
        if (columnNames[i] == "total_count") quitarKeys = true;
        if (quitarKeys)
            columnNames.splice(i);
    }

    respuesta = {
            draw: 1,
            recordsTotal: datos[0].total_count,
            recordsFiltered: datos.length,
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