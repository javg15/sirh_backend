const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: config.operatorsAliases,
        timezone: '-06:00'
            /*pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            }*/
    }
);

//para el historial de nomina
const sequelizeNomina = new Sequelize(
    config.DBNomina,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: config.operatorsAliases,
        timezone: '-06:00'
            /*pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            }*/
    }
);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//historial de plazas segun sistema de nomina
db.sequelizeNomina = sequelizeNomina;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.usuarios_zonas = require("../models/usuarios_zonas.model.js")(sequelize, Sequelize);
db.catestatusplaza = require("../models/catestatusplaza.model.js")(sequelize, Sequelize);
db.categorias = require("../models/categorias.model.js")(sequelize, Sequelize);
db.catbajamotivo = require("../models/catbajamotivo.model.js")(sequelize, Sequelize);
db.categoriastabular = require("../models/categoriastabular.model.js")(sequelize, Sequelize);
db.catquincena = require("../models/catquincena.model.js")(sequelize, Sequelize);
db.catpercepciones = require("../models/catpercepciones.model.js")(sequelize, Sequelize);
db.categoriasdetalle = require("../models/categoriasdetalle.model.js")(sequelize, Sequelize);
db.categoriaspercepciones = require("../models/categoriaspercepciones.model.js")(sequelize, Sequelize);
db.catzonaeconomica = require("../models/catzonaeconomica.model.js")(sequelize, Sequelize);
db.catplanteles = require("../models/catplanteles.model.js")(sequelize, Sequelize);
db.catcentrostrabajo = require("../models/catcentrostrabajo.model.js")(sequelize, Sequelize);
db.catfuentef = require("../models/catfuentef.model.js")(sequelize, Sequelize);
db.catlocalidades = require("../models/catlocalidades.model.js")(sequelize, Sequelize);
db.catmunicipios = require("../models/catmunicipios.model.js")(sequelize, Sequelize);
db.catregiones = require("../models/catregiones.model.js")(sequelize, Sequelize);
db.catestados = require("../models/catestados.model.js")(sequelize, Sequelize);
db.cattipocentrotrabajo = require("../models/cattipocentrotrabajo.model.js")(sequelize, Sequelize);
db.catturnos = require("../models/catturnos.model.js")(sequelize, Sequelize);
db.cattipocategoria = require("../models/cattipocategoria.model.js")(sequelize, Sequelize);
db.cattiponomina = require("../models/cattiponomina.model.js")(sequelize, Sequelize);
db.catzonageografica = require("./catzonageografica.model.js")(sequelize, Sequelize);
db.ejercicioreal = require("../models/ejercicioreal.model.js")(sequelize, Sequelize);
db.estudios = require("../models/estudios.model.js")(sequelize, Sequelize);
db.horas = require("../models/horas.model.js")(sequelize, Sequelize);
db.ministraciones = require("../models/ministraciones.model.js")(sequelize, Sequelize);
db.presupuesto = require("../models/presupuesto.model.js")(sequelize, Sequelize);
db.rhnominas = require("../models/rhnominas.model.js")(sequelize, Sequelize);
db.plazas = require("../models/plazas.model.js")(sequelize, Sequelize);
db.personal = require("../models/personal.model.js")(sequelize, Sequelize);
db.personalhoras = require("../models/personalhoras.model.js")(sequelize, Sequelize);
db.catestadocivil = require("../models/catestadocivil.model.js")(sequelize, Sequelize);
db.plantillaspersonal = require("../models/plantillaspersonal.model.js")(sequelize, Sequelize);
db.plantillaspersonaldocs = require("../models/plantillaspersonaldocs.model.js")(sequelize, Sequelize);
db.plantillasdocsprofesional = require("../models/plantillasdocsprofesional.model.js")(sequelize, Sequelize);
db.personalfamiliares = require("./personalfamiliares.model.js")(sequelize, Sequelize);
db.plantillasdocslicencias = require("../models/plantillasdocslicencias.model.js")(sequelize, Sequelize);
db.plantillasdocsnombramiento = require("../models/plantillasdocsnombramiento.model.js")(sequelize, Sequelize);
db.personalsindicato = require("./personalsindicato.model.js")(sequelize, Sequelize);
db.catplantillas = require("../models/catplantillas.model.js")(sequelize, Sequelize);
db.catfuncionprimaria = require("../models/catfuncionprimaria.model.js")(sequelize, Sequelize);
db.catfuncionsecundaria = require("../models/catfuncionsecundaria.model.js")(sequelize, Sequelize);
db.cattiposemestre = require("../models/cattiposemestre.model.js")(sequelize, Sequelize);
db.catesquemapago = require("../models/catesquemapago.model.js")(sequelize, Sequelize);
db.catsindicato = require("../models/catsindicato.model.js")(sequelize, Sequelize);
db.archivos = require("../models/archivos.model.js")(sequelize, Sequelize);
db.materiasclase = require("../models/materiasclase.model.js")(sequelize, Sequelize);
db.cattipohorasdocente = require("../models/cattipohorasdocente.model.js")(sequelize, Sequelize);
db.gruposclase = require("../models/gruposclase.model.js")(sequelize, Sequelize);
db.semestre = require("../models/semestre.model.js")(sequelize, Sequelize);
db.horasclase = require("../models/horasclase.model.js")(sequelize, Sequelize);
db.horasclaseasignar = require("../models/horasclaseasignar.model.js")(sequelize, Sequelize);
db.horasclasedetalle = require("../models/horasclasedetalle.model.js")(sequelize, Sequelize);
db.catestatushora = require("../models/catestatushora.model.js")(sequelize, Sequelize);
db.catestatusquincena = require("../models/catestatusquincena.model.js")(sequelize, Sequelize);
db.cattipohorasmateria = require("../models/cattipohorasmateria.model.js")(sequelize, Sequelize);
db.catnombramientos = require("../models/catnombramientos.model.js")(sequelize, Sequelize);
db.permgrupos = require("../models/permgrupos.model.js")(sequelize, Sequelize);
db.permgruposmodulos = require("../models/permgruposmodulos.model.js")(sequelize, Sequelize);
db.permusuariosmodulos = require("../models/permusuariosmodulos.model.js")(sequelize, Sequelize);
db.catbancos = require("../models/catbancos.model.js")(sequelize, Sequelize);
db.catdocumentos = require("../models/catdocumentos.model.js")(sequelize, Sequelize);
db.personalexpediente = require("../models/personalexpediente.model.js")(sequelize, Sequelize);

module.exports = db;