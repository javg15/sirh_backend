const sql = require('mssql')
const config = require("../config/db.config.js");

const db = require("../models");
const { Op } = require("sequelize");
const globales = require("../config/global.config");
const mensajesValidacion = require("../config/validate.config");
const Plantillasdocsnombramiento = db.plantillasdocsnombramiento;
const Plazasnombramientos = db.plazasnombramientos;
const Categoriasdetalle = db.categoriasdetalle;
const Catquincena = db.catquincena;
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
        query = "",
        params = req.body.dataTablesParameters;

    if (req.body.solocabeceras == 1) {
        params = req.body;

        query = "SELECT * FROM s_plantillasdocsnombramiento_mgr('&modo=10&id_usuario=:id_usuario')"; //el modo no existe, solo es para obtener un registro

        datos = await db.sequelize.query(query, {
            replacements: {
                id_usuario: req.userId,
            },
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
    } else {

        query = "SELECT * FROM s_plantillasdocsnombramiento_mgr('" +
            "&modo=:modo&id_usuario=:id_usuario" +
            "&inicio=:start&largo=:length" +
            "&ordencampo=ID" +
            "&ordensentido=ASC" +
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

    Plantillasdocsnombramiento.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(plantillasdocsnombramiento => {
            if (!plantillasdocsnombramiento) {
                return res.status(404).send({ message: "Plantillasdocsnombramiento Not found." });
            }

            res.status(200).send(plantillasdocsnombramiento);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getRecordPersonal = async(req, res) => {

    Plantillasdocsnombramiento.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(plantillasdocsnombramiento => {
            if (!plantillasdocsnombramiento) {
                return res.status(404).send({ message: "Plantillasdocsnombramiento Not found." });
            }
            //Personal
            Personal.findOne({
                    where: {
                        id: plantillasdocsnombramiento.id_personal
                    }
                })
                .then(personal => {
                    if (!personal) {
                        return res.status(404).send({ message: "Personal Not found." });
                    }

                    res.status(200).send(personal);
                }).catch(err => {
                    res.status(200).send({ error: true, message: [err.errors[0].message] });
                });

            //res.status(200).send(plantillasdocsnombramiento);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}


exports.getCatalogo = async(req, res) => {

    Plantillasdocsnombramiento.findAll({
            attributes: ['id', 'descripcion'],
            order: [
                ['descripcion', 'ASC'],
            ]
        }).then(plantillasdocsnombramiento => {
            if (!plantillasdocsnombramiento) {
                return res.status(404).send({ message: "Plantillasdocsnombramiento Not found." });
            }

            res.status(200).send(plantillasdocsnombramiento);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getConsecutivo = async(req, res) => {

    Plantillasdocsnombramiento.max('consecutivo', {
            where: {
                [Op.and]: [{
                        id_catplanteles: req.body.idCatplanteles
                    },
                    {
                        id_catplantillas: req.body.idCatplantillas
                    }
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
exports.setUpdateIdServer=async(req,res)=>{
    if(req.body.actionForm.toUpperCase() == "NUEVO"){
        //buscar si existe el registro
        Plazasnombramientos.findOne({
            where: {
                [Op.and]: [{ id_plazas: req.body.dataPack.id_plazas }, 
                    {id_plantillaspersonal: req.body.dataPack.id_plantillaspersonal},
                    {id_plazas_sql: {
                        [Op.eq]: null
                      }},
                    {state: "A" }
                ],
            },
            order: [
                ['id', 'DESC'],
            ],
            offset: 0,
            limit: 1,
        })
        .then(plazasnombramientos => {
            plazasnombramientos.update({id_plazas_sql:req.body.datosSQL.IdPlazaCreada}).then((self) => {
                // here self is your instance, but updated
                res.status(200).send({ message: "success", id: self.id });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    }
    else
        res.status(200).send({ message: "success", id: 0 });
}

exports.setRecordSQLServer=async(req,res)=>{
    Object.keys(req.body.dataPack).forEach(function(key) {
        if (key.indexOf("id_", 0) >= 0 || key.indexOf("horas", 0) >= 0 ||
            key.indexOf("horasb", 0) >= 0) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
            if (isNaN(req.body.dataPack[key]))
                req.body.dataPack[key] = 0;
        }
    });
    req.body.dataPack['id_catquincena_ini'] = req.body.dataPack['id_catquincena_ini'] == 0 ? 32767 : req.body.dataPack['id_catquincena_ini']
    req.body.dataPack['id_catquincena_fin'] = req.body.dataPack['id_catquincena_fin'] == 0 ? 32767 : req.body.dataPack['id_catquincena_fin']

    try {
        // make sure that any items are correctly URL encoded in the connection string
        let pool=await sql.connect(config.sqlserver)
        //const result = await sql.query`select * from Quincenas where [IdQuincena] = 5211`
        //.query('select * from mytable where id = @input_parameter')
        let datos=req.body.dataPack;
        let TipoOperacion=0;
        if(req.body.actionForm.toUpperCase() == "NUEVO"){
            if(req.body.tipo.toUpperCase()=="LICENCIA")
                TipoOperacion=2;
            else
                TipoOperacion=1;
        }
        else if(req.body.actionForm.toUpperCase() == "EDITAR"){
            TipoOperacion=0;
            if(req.body.dataPack.state=="E"){
                TipoOperacion=2;
                req.body.dataPack['id_catquincena_fin'] = req.body.dataPack['id_catquincena_ini']
            }
        }
        
        
        //obtener datos anexos
        let prms = null;

        query = "SELECT CONCAT(p.rfc,COALESCE(p.homoclave,'')) AS rfcemp, " +
            "   CASE left(ce.tipoocupplaza,1) " + 
            "       WHEN 'B' THEN 1 " +
            "       WHEN 'C' THEN 2 " +
            "       WHEN 'I' THEN 4 " +
            "       WHEN 'P' THEN 5 " +
            "       WHEN 'O' THEN 9 " +
            "       END    AS idplazatipoocupacion, " +
            "   coalesce(ps.id_catsindicato,3) AS idsindicato, " + 
            " CONCAT(pt.rfc,COALESCE(pt.homoclave,'')) AS rfcemptitular, " +
            " pp.id_catplantillas AS idempfuncion, " +
            " ce.id_catbajamotivo AS id_catbajamotivo, " +
            " COALESCE(pzn.id_plazas_sql,0) AS id_plazas_sql, " +
            " COALESCE(pdn_origen.id_catquincena_ini,0) AS id_catquincena_ini_origen " +
            "FROM plantillasdocsnombramiento AS pdn " +
            "   LEFT JOIN plantillaspersonal AS pp ON pdn.id_plantillaspersonal=pp.id " +
            "   LEFT JOIN personal AS p ON pp.id_personal=p.id " +
            "   LEFT JOIN catestatusplaza AS ce ON pdn.id_catestatusplaza=ce.id " +
            "   LEFT JOIN personalsindicato AS ps ON ps.id_personal=p.id " +
            "   LEFT JOIN personal AS pt ON pdn.id_personal_titular=pt.id " +
            "   LEFT JOIN plazasnombramientos AS pzn ON pdn.id_plazas=pzn.id_plazas " +
            "               AND pdn.id_plantillaspersonal=pzn.id_plantillaspersonal " +
            "   LEFT JOIN plantillasdocsnombramiento AS pdn_origen on pdn_origen.id=:id_origen " +
            "WHERE pdn.id=:id " ;
        
        prms = await db.sequelize.query(query, {
            plain: false,
            replacements: {
                id: req.body.dataPack.id,
                id_origen: (req.body.tipo.toUpperCase()=="LICENCIA" ? req.body.id_pdn : 0),
            },
            raw: true,
            type: QueryTypes.SELECT
        });
        prms=prms[0];

        if(TipoOperacion==2 && req.body.dataPack.state!="E"){//licencia
            /*console.log("prms=>",prms)
            console.log("datos=>",datos)
            console.log("TipoOperacion=>",TipoOperacion)*/
            let result1 = await pool.request()
                .input('IdPlaza', sql.Int, prms.id_plazas_sql)
                .input('IdQnaVigIni', sql.SmallInt, prms.id_catquincena_ini_origen)
                .input('IdQnaVigFin', sql.SmallInt,  datos.id_catquincena_ini)
                .input('TipoOperacion', sql.TinyInt, TipoOperacion)
                .input('IdMotGralBaja', sql.TinyInt, prms.id_catbajamotivo)//no se captura
                .input('FechaInicio', sql.DateTime, null)
                .input('FechaFin', sql.DateTime, null)
                .input('FechaFinLSGS', sql.DateTime, null)
            .execute('SP_IoUPlazasHistoria');
            console.dir(result1)

            if(result1.returnValue==0)
                res.status(200).send({ message: "success"});
            else{ 
                if(result1.err)
                    res.status(200).send({ message: "error", result: result1.err});
                else
                    res.status(200).send({ message: "success"});
            }
        }
        else{
            let result1 = await pool.request()
                .input('RFCEmp', sql.VarChar(13), prms.rfcemp)
                .input('IdEmpFuncion', sql.TinyInt, prms.idempfuncion)
                .input('IdPlantel', sql.SmallInt, datos.id_catplanteles)
                .input('IdTipoNomina', sql.TinyInt, 1)//no se captura
                .input('IdCT', sql.SmallInt, datos.id_catcentrostrabajo)
                .input('IdCategoria', sql.SmallInt, datos.id_categorias)
                .input('IdSindicato', sql.TinyInt, prms.idsindicato)
                .input('IdPlazaTipoOcupacion', sql.TinyInt, prms.idplazatipoocupacion)
                .input('IdQnaVigIni', sql.SmallInt, datos.id_catquincena_ini)
                .input('IdQnaVigFin', sql.SmallInt, datos.id_catquincena_fin)
                .input('TipoOperacion', sql.TinyInt, TipoOperacion)
                .input('IdPlaza', sql.Int, (TipoOperacion == 0 ? prms.id_plazas_sql : null))
                .input('IdMotivoInterinato', sql.TinyInt, 1)//no se captura
                .input('RFCEmpTitular', sql.VarChar(13),  (prms.rfcemptitular == "" ? prms.rfcemptitular : null))
                .input('IdFuncionPri', sql.SmallInt, datos.id_catfuncionprimaria)
                .input('IdFuncionSec', sql.TinyInt, datos.id_catfuncionsecundaria)
                .input('IdMotGralBaja', sql.TinyInt, (TipoOperacion == 2 ? prms.id_catbajamotivo : 25))//no se captura
                .input('TratarComoBase', sql.Bit, 0)//no se captura
            .output('IdPlazaCreada', sql.Int)
                .input('IdTipoSemestre', sql.TinyInt, datos.id_cattiposemestre)
                .input('InterinoPuro', sql.Bit, (datos.id_catestatusplaza==21 ? 1 :0 ))
                .input('FechaInicio', sql.DateTime, null)
                .input('FechaFin', sql.DateTime, null)
                .input('IdPlantelAdscripReal', sql.SmallInt, (datos.id_catplanteles_aplicacion==0 ? datos.id_catplanteles : datos.id_catplanteles_aplicacion))
                .input('IdEsquemaPago', sql.TinyInt, datos.id_catesquemapago)
                .input('IdPuesto', sql.SmallInt, (datos.id_catfuncionplantilla==0 ? 8 : datos.id_catfuncionplantilla))
                .input('FechaFinLSGS', sql.DateTime, null)
            .execute('SP_IoUEmpleadosPlazas');
            //console.dir(result1)

            // Stored procedure
            if(result1.returnValue==0)
                res.status(200).send({ message: "success", result: result1.output });
            else
                res.status(200).send({ message: "error"});
            
        }
        
    } catch (err) {
        console.log("err=>",err)
        res.status(200).send({ error: true, message: err });
    }



/**
 * dETERMINAR SI HAY CADENAS
 * 
 */
 /*Public Function AgregaMovs(ByVal pIdCadena As Integer, ByVal pIdPlaza As Integer, ByVal pLogin As String, ByVal pTipoMov As String, ByVal ArregloAuditoria() As String) As Boolean
 Try
     Dim Prms As SqlParameter() = {New SqlParameter("@IdCadena", SqlDbType.Int), _
                                 New SqlParameter("@IdPlaza", SqlDbType.Int), _
                                 New SqlParameter("@IdUsuario", SqlDbType.SmallInt), _
                                 New SqlParameter("@TipoMov", SqlDbType.NVarChar, 1)}
     Dim oUsr As New Usuario
     Dim drUsr As DataRow

     drUsr = oUsr.ObtenerPorLogin(pLogin)
     oUsr.Login = pLogin

     Prms(0).Value = pIdCadena
     Prms(1).Value = pIdPlaza
     Prms(2).Value = CShort(drUsr("IdUsuario"))
     Prms(3).Value = pTipoMov

     Return _DataCOBAEV.RunProc("SP_ICadenaPlaza", Prms, DataCOBAEV.BD.Nomina, ArregloAuditoria)*/
}

exports.setRecord = async(req, res) => {

    Object.keys(req.body.dataPack).forEach(function(key) {
        if (key.indexOf("id_", 0) >= 0 || key.indexOf("horas", 0) >= 0 ||
            key.indexOf("horasb", 0) >= 0) {
            if (req.body.dataPack[key] != '')
                req.body.dataPack[key] = parseInt(req.body.dataPack[key]);
            if (isNaN(req.body.dataPack[key]))
                req.body.dataPack[key] = 0;
        }
    });
    //obtener datos de catestatusplaza
    let datosCatestatusplaza = null;

    query = "SELECT * FROM catestatusplaza WHERE id=:id_catestatusplaza"; 

    datosCatestatusplaza = await db.sequelize.query(query, {
        plain: false,
        replacements: {
            id_catestatusplaza: req.body.dataPack.id_catestatusplaza,
        },
        raw: true,
        type: QueryTypes.SELECT
    });

    /**
     * revisar si existen otras plantillas con nombramientos activos
     */
     let cuentaNombramientosActivosEnOtraPlantilla = 0;

     query = "with personal_tmp as( " +
        "SELECT id_personal " +
        "   FROM plantillaspersonal " +
        "WHERE id=:id_plantillaspersonal " +
        ") " +
        "SELECT COUNT(*) as cuenta  " +
        "FROM plantillasdocsnombramiento as pn " +
        "    LEFT JOIN plantillaspersonal as pp on pn.id_plantillaspersonal = pp.id " +
        "    LEFT JOIN personal_tmp as p on p.id_personal =pp.id_personal   " +
        "    LEFT JOIN catestatusplaza as ce on pn.id_catestatusplaza =ce.id " +
        "WHERE pp.id<>:id_plantillaspersonal " +
        "    AND pp.permitemasdeuna=0 " +
        "    AND ce.esnombramiento =1 " +
        "    AND pn.state IN('A','B') " +
        "    AND p.id_personal IS NOT NULL " +
        "    AND fn_nombramiento_estaactiva(pn.id,'')=1; "
        ;

    cuentaNombramientosActivosEnOtraPlantilla = await db.sequelize.query(query, {
         plain: false,
         replacements: {
            id_plantillaspersonal: req.body.dataPack.id_plantillaspersonal,
         },
         raw: true,
         type: QueryTypes.SELECT
     });
     
    /* obtener si la categoria define horas */
    let varAsignarHoras = false;
    await Categoriasdetalle.findAll({
            limit: 1,
            where: {
                id_categorias: req.body.dataPack.id_categorias
            },
            order: [
                ['created_at', 'DESC']
            ]
        })
        .then(categoriasdetalle => {

            if (categoriasdetalle.length > 0) {
                if (categoriasdetalle[0].dataValues.totalhorasaut > 0) {
                    varAsignarHoras = true;
                }
            }
        });


    //obtener datos de las quincenas
    req.body.dataPack['id_catquincena_ini'] = req.body.dataPack['id_catquincena_ini'] == 0 ? 32767 : req.body.dataPack['id_catquincena_ini']
    const quincenaInicial = await Catquincena.findOne({
        where: {
            id: req.body.dataPack['id_catquincena_ini']
        },
    });

    req.body.dataPack['id_catquincena_fin'] = req.body.dataPack['id_catquincena_fin'] == 0 ? 32767 : req.body.dataPack['id_catquincena_fin']
    const quincenaFinal = await Catquincena.findOne({
        where: {
            id: req.body.dataPack['id_catquincena_fin']
        },
    });

    //revisar el ultimo movimiento en la tabla con quincena mayor a la que se quiere registrar
    let ultimoRegistroMayorQuincena = null;

    query = "SELECT pdn.*,CONCAT(cq.anio,cq.quincena) AS quincena,ce.esnombramiento,fn_nombramiento_estaactiva(pdn.id,'') as estaactivo,pp.permitevariosnombramientos " +
        "FROM plantillasdocsnombramiento AS pdn " +
        " LEFT JOIN catquincena AS cq ON pdn.id_catquincena_ini=cq.id " +
        " LEFT JOIN catestatusplaza AS ce ON pdn.id_catestatusplaza=ce.id " +
        " LEFT JOIN plantillaspersonal AS pp ON pdn.id_plantillaspersonal=pp.id " +
        "WHERE pdn.id_plantillaspersonal=:id_plantillaspersonal " +
        " AND pdn.id<>:id " +
        " AND CONCAT(cq.anio,LPAD(cq.quincena::varchar,2,'0'::varchar))>:quincena" +
        " AND pdn.state IN('A','B') " +
        "ORDER BY CONCAT(cq.anio,LPAD(cq.quincena::varchar,2,'0'::varchar)) DESC " +
        "LIMIT 1";
    
    ultimoRegistroMayorQuincena = await db.sequelize.query(query, {
        plain: false,
        replacements: {
            id: req.body.dataPack.id,
            id_plantillaspersonal: req.body.dataPack.id_plantillaspersonal,
            quincena: quincenaInicial.anio.toString() + quincenaInicial.quincena.toString().padStart(2, "0")
        },
        raw: true,
        type: QueryTypes.SELECT
    });

    //revisar el ultimo movimiento en la tabla para revisar que no se registren nombramientos
    let ultimoRegistro = null;

    query = "SELECT pdn.*,CONCAT(cq.anio,cq.quincena) AS quincena,ce.esnombramiento,fn_nombramiento_estaactiva(pdn.id,'') as estaactivo,pp.permitevariosnombramientos " +
        "FROM plantillasdocsnombramiento AS pdn " +
        " LEFT JOIN catquincena AS cq ON pdn.id_catquincena_ini=cq.id " +
        " LEFT JOIN catestatusplaza AS ce ON pdn.id_catestatusplaza=ce.id " +
        " LEFT JOIN plantillaspersonal AS pp ON pdn.id_plantillaspersonal=pp.id " +
        "WHERE pdn.id_plantillaspersonal=:id_plantillaspersonal " +
        " AND pdn.id<>:id " +
        " AND pdn.state IN('A','B') " +
        "ORDER BY CONCAT(cq.anio,LPAD(cq.quincena::varchar,2,'0'::varchar)) DESC " +
        "LIMIT 1";
    
    ultimoRegistro = await db.sequelize.query(query, {
        plain: false,
        replacements: {
            id: req.body.dataPack.id,
            id_plantillaspersonal: req.body.dataPack.id_plantillaspersonal,
            quincena: quincenaInicial.anio.toString() + quincenaInicial.quincena.toString().padStart(2, "0")
        },
        raw: true,
        type: QueryTypes.SELECT
    });

    /* customer validator shema */
    const dataVSchema = {
        /*first_name: { type: "string", min: 1, max: 50, pattern: namePattern },*/
        id: { type: "number" },
        id_plantillaspersonal: { type: "number" },
        id_catestatusplaza: {
            type: "number",
            custom(value, errors) {
                if(cuentaNombramientosActivosEnOtraPlantilla[0].cuenta>0) errors.push({ type: "nombramientoOtraPlantilla" })
                if (value <= 0) errors.push({ type: "selection" })
                if (ultimoRegistro.length > 0 
                        && ultimoRegistro[0].esnombramiento==1
                        && ultimoRegistro[0].estaactivo==1
                        && ultimoRegistro[0].permitevariosnombramientos==0
                        && datosCatestatusplaza.esnombramiento==1) errors.push({ type: "ultimoRegistroNombramiento" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        fechaexpedicion: {
            type: "string",
            custom(value, errors) {
                let dateIni = new Date(value)
                let dateFin = new Date()

                if (dateIni > dateFin)
                    errors.push({ type: "dateMax", field: "fechaexpedicion", expected: dateFin.toISOString().split('T')[0] })

                if (!moment(value).isValid() || !moment(value).isBefore(new Date()) || !moment(value).isAfter('1900-01-01'))
                    errors.push({ type: "date" })
                return value;
            },
        },

        id_catquincena_ini: {
            type: "number",
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 &&
                    (datosCatestatusplaza[0].esnombramiento == 1 ||
                        datosCatestatusplaza[0].esinterina == 1 ||
                        datosCatestatusplaza[0].conlicencia == 1
                    ) &&
                    (value <= 0 || value == 32767)) errors.push({ type: "selection" })

                if (ultimoRegistroMayorQuincena.length > 0) errors.push({ type: "quincenaSuperior" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catquincena_fin: {
            type: "number",
            optional: (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].convigencia == 0 ? true : false),
            custom(value, errors) {

                if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].convigencia == 1) {
                    if (value <= 0) errors.push({ type: "selection" })
                        ///////////////
                    dateFin = quincenaFinal.anio.toString() + quincenaFinal.quincena.toString().padStart(2, "0")
                    dateIni = quincenaInicial.anio.toString() + quincenaInicial.quincena.toString().padStart(2, "0")

                    if (dateFin < dateIni)
                        errors.push({ type: "quincenaFin", field: "id_catquincena_fin" })

                }
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_categorias: {
            type: "number",
            custom(value, errors) {
                //if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].esnombramiento == 1 && value <= 0) errors.push({ type: "selection" })
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_plazas: {
            type: "number",
            custom(value, errors) {
                //if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].esnombramiento == 1 && value <= 0) errors.push({ type: "selection" })
                if (value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except number
            }
        },
        /*        id_plazas_afectada: {
                    type: "number",
                    optional: (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].esinterina == 0 ? true : false),
                    custom(value, errors) {
                        if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].esinterina == 1 && value <= 0) errors.push({ type: "selection" })
                        return value; // Sanitize: remove all special chars except numbers
                    }
                },*/
        id_personal_titular: {
            type: "number",
            optional: (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].esinterina == 0 ? true : false),
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].contitular==1) {
                    if (value <= 0) errors.push({ type: "selection" })
                }
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        horas: {
            type: "number",
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].esnombramiento == 1 &&
                    req.body.dataPack.id_categorias > 0 &&
                    varAsignarHoras == true &&
                    value == 0) {

                    errors.push({ type: "required" })
                }
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        /*id_archivos: {
            type: "number",
            custom(value, errors) {
                if (req.body.dataPack.id_catestatusplaza != 3 && value <= 0) errors.push({ type: "file", expected: 'Archivo .pdf' })
                return value; // Sanitize: remove all special chars except numbers
            }
        },*/

        /*adicionales*/
        id_catplanteles: {
            type: "number",
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].tipo == 1 && value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catcentrostrabajo: {
            type: "number",
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 
                        && datosCatestatusplaza[0].tipo == 1 
                        && value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catfuncionplantilla: {
            type: "number",
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].tipo == 1 && value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catfuncionprimaria: {
            type: "number",
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].tipo == 1 && value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catfuncionsecundaria: {
            type: "number",
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].tipo == 1 && value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_cattiposemestre: {
            type: "number",
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].tipo == 1 && value <= 0) errors.push({ type: "selection" })
                return value; // Sanitize: remove all special chars except numbers
            }
        },
        id_catesquemapago: {
            type: "number",
            custom(value, errors) {
                if (datosCatestatusplaza.length > 0 && datosCatestatusplaza[0].tipo == 1 && value <= 0) errors.push({ type: "selection" })
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
    Plantillasdocsnombramiento.findOne({
            where: {
                [Op.and]: [{ id: req.body.dataPack.id }, {
                    id: {
                        [Op.gt]: 0
                    }
                }],
            }
        })
        .then(plantillasdocsnombramiento => {
            if (!plantillasdocsnombramiento) {
                delete req.body.dataPack.id;
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                Plantillasdocsnombramiento.create(
                    req.body.dataPack
                ).then((self) => {
                    //Actualizar la plaza
                    query = "SELECT fn_set_plazas_estatus(:id_plantillasdocsnombramiento_afectador,:id_plantillaspersonal)"; //el modo no existe, solo es para obtener un registro

                    datos = db.sequelize.query(query, {
                        plain: false,
                        replacements: {
                            id_plantillasdocsnombramiento_afectador: self.id,
                            id_plantillaspersonal: req.body.dataPack.id_plantillaspersonal,
                        },
                        raw: true,
                        type: QueryTypes.SELECT
                    });

                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                }).catch(err => {
                    res.status(200).send({ error: true, message: err });
                });
            } else {
                delete req.body.dataPack.created_at;
                delete req.body.dataPack.updated_at;
                req.body.dataPack.id_usuarios_r = req.userId;
                req.body.dataPack.state = globales.GetStatusSegunAccion(req.body.actionForm);

                plantillasdocsnombramiento.update(req.body.dataPack).then((self) => {
                    //Actualizar la plaza
                    query = "SELECT fn_set_plazas_estatus(:id_plantillasdocsnombramiento_afectador,:id_plantillaspersonal)"; //el modo no existe, solo es para obtener un registro

                    datos = db.sequelize.query(query, {
                        plain: false,
                        replacements: {
                            id_plantillasdocsnombramiento_afectador: self.id,
                            id_plantillaspersonal: req.body.dataPack.id_plantillaspersonal,
                        },
                        raw: true,
                        type: QueryTypes.SELECT
                    });

                    // here self is your instance, but updated
                    res.status(200).send({ message: "success", id: self.id });
                });
            }


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
        
}