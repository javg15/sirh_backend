const db = require("../models");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const config = require("../config/db.config.js");

const { v4: uuidv4 } = require("uuid");
var request = require("request");
var fs = require("fs");

jasper = require('node-jasper')({
    path: '../../lib/jasperreports-6.16.0',
    reports: {
        categorias: { jasper: '../../reports/categorias.jasper' },
        //categorias: { jasper: '../../lib/jasperreports-6.16.0/demo/samples/fonts/reports/FontsReport.jasper' },
        //categorias: { jasper: '../../lib/jasperreports-6.16.0/demo/samples/alterdesign/reports/AlterDesignReport.jrxml'},
        
        plazas_listado: { jasper: '../../reports/plazas_listado.jasper' },
        plantilla_nombramiento: { jasper: '../../reports/plantilla_nombramiento.jasper' },
        personal_estudios: { jasper: '../../reports/personal_estudios.jasper' },
        personal_estudios_materia: { jasper: '../../reports/personal_estudios_materia.jasper' }
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
    /*let report = {
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
    res.send(pdf);*/
    /*let url="http://20.58.11.140:8081/jasperserver/rest_v2/reports/reports/interactive/TableReport.pdf";
    request(url)
        .auth("jasperadmin", "jasperadmin", false)
        .pipe(fs.createWriteStream("myfile.pdf"));
*/

    var filename = './tmp/' + uuidv4() + '.pdf'
    let params="id_ze=" + parseInt(req.query.id_ze);
    var req=request({
            url:'http://20.58.11.140:8081/jasperserver/rest_v2/reports/reports/rechum/Categorias_Listado.pdf?' + params
        })
        .auth(config.USER_JAS, config.PASSWORD_JAS, false)
        .pipe(fs.createWriteStream(filename))
    
    req.on('finish', function () { 
        if (fs.existsSync(filename)) {
            res.download(filename) 
            setTimeout(() => {
                fs.unlinkSync(filename);
              }, "5000")
            
          }
        
    });
    //resThat.send("myfile2.pdf")
    /*request.post({
            url: "http://20.58.11.140:8081/jasperserver/rest_v2/login", 
            qs: {j_username: "jasperadmin", j_password: "jasperadmin"}
        },
        function(err, res, body) {
            if(err) {
                return console.error(err);
            }
            else{
                var cookie = res.headers['set-cookie']
                request.get({url:"http://20.58.11.140:8081/jasperserver/rest_v2/reports/reports/interactive/TableReport.pdf"
                        ,headers:{
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Cookie': cookie,
                        }},function(error, res, body1){

                            console.log(res.statusCode) // 200
                            console.log(res.headers['content-type']) // 'image/png'
                            console.log(res.body) // 200
                            resThat.contentType("application/pdf")
                            resThat.send(res.body);

                        }).end()
                
                /*request({
                        url:"http://20.58.11.140:8081/jasperserver/rest_v2/reports/reports/interactive/TableReport.pdf",
                        method: "GET",
                        /*body: 
                        { 
                            parameters: { id_ze: '1'} 
                        },*
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Cookie': cookie,
                        },
                        //json: true
                    },
                    function (error, res, body1) {

                        if (!error) {
                            

                            /*resThat.setHeader('Content-Length', res.body.length);
                            resThat.setHeader('Content-Type', 'application/pdf');
                            resThat.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');*
                            //file.pipe(res);
                            //res.pipe(resThat);

                            //res.pipe(resThat)
                            //resThat.send(res.body);

                            //console.log(body1);
                        }
                        else{
                            console.log("Error=>",error);
                            console.log("response=>",res.statusCode);
                            
                        }
                })*
            }
        }
    );*/
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

exports.getPlantillaNombramiento = async(req, res, next) => {
    let report = {
        report: 'plantilla_nombramiento',
        //parametros
        data: {
            id_plantillasdocsnombramiento: parseInt(req.query.id_plantillasdocsnombramiento),
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

exports.getPersonalEstudios = async(req, res, next) => {
    console.log("req=>",req.body)
    let report = {
        report: 'personal_estudios',
        //parametros
        data: {
            id_plantel: parseInt(req.query.id_catplanteles),
            plantel: req.query.plantel,
            id_semestre: parseInt(req.query.id_semestre),
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

exports.getPersonalEstudiosMateria = async(req, res, next) => {
    let report = {
        report: 'personal_estudios_materia',
        //parametros
        data: {
            id_plantel: parseInt(req.query.id_catplanteles),
            plantel: req.query.plantel,
            id_semestre: parseInt(req.query.id_semestre),
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

exports.getMenuReportes = async(req, res) => {
    //id 70->reportes
    let query = "select adm.fn_menu_reportes(:id_usuarios,70,'plazas') as menu";
    datos = await db.sequelize.query(query, {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        replacements: {
            id_usuarios: req.body.id,
        },
        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT
    });

    res.status(200).send(datos[0].menu);
};