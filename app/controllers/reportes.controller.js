const config = require("../config/db.config.js");

jasper = require('node-jasper')({
    path: '../../lib/jasperreports-6.16.0',
    reports: {
        hw: {
            jasper: '../../reports/categorias.jasper'
        }
    },
    drivers: {
        pg: {
            path: '../../lib/postgresql-42.2.18.jar',
            class: 'org.postgresql.Driver',
            type: 'postgresql'
        }
    },
    conns: {
        dbserver1: {
            host: config.HOST,
            port: 5432,
            dbname: config.DB,
            user: config.USER,
            pass: config.PASSWORD,
            driver: 'pg'
        }
    },
    defaultConn: 'dbserver1'
});

exports.getCategorias = async(req, res, next) => {
    let report = {
        report: 'hw',
        //parametros
        data: {
            id_ze: parseInt(req.query.id_ze)
        }
    };
    let pdf = jasper.pdf(report);
    res.set({
        'Content-type': 'application/pdf',
        'Content-Length': pdf.length,
        //'Content-Disposition': 'attachment; filename=filename.pdf'
    });
    res.send(pdf);
}