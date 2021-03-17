const config = require("../config/db.config.js");

jasper = require('node-jasper')({
    path: '../../lib/jasperreports-6.16.0',
    reports: {
        categorias: { jasper: '../../reports/categorias.jasper' },
        plazas_listado: { jasper: '../../reports/plazas_listado.jasper' }
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
        report: 'categorias',
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

exports.getPlazasListado = async(req, res, next) => {
    let report = {
        report: 'plazas_listado',
        //parametros
        data: {
            id_plantel: parseInt(req.query.id_catplanteles),
            id_cattiponomina: parseInt(req.query.id_cattiponomina),
            id_tipoplaza: 0, //parseInt(req.query.id_tipoplaza),
            id_categorias: parseInt(req.query.id_categorias),
            id_catestatusplaza: parseInt(req.query.id_catestatusplaza)
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