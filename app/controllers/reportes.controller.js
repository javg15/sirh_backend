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
            host: '54.184.232.181',
            port: 5432,
            dbname: 'controlplazas',
            user: 'postgres',
            pass: 'RH23021312',
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