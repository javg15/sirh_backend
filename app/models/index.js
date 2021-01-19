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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.catestatusplaza = require("../models/catestatusplaza.model.js")(sequelize, Sequelize);
db.categorias = require("../models/categorias.model.js")(sequelize, Sequelize);
db.catquincena = require("../models/catquincena.model.js")(sequelize, Sequelize);
db.categoriassueldos = require("../models/categoriassueldos.model.js")(sequelize, Sequelize);
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
db.catestadocivil = require("../models/catestadocivil.model.js")(sequelize, Sequelize);
db.plantillaspersonal = require("../models/plantillaspersonal.model.js")(sequelize, Sequelize);
db.plantillaspersonaldocs = require("../models/plantillaspersonaldocs.model.js")(sequelize, Sequelize);
db.catplantillas = require("../models/catplantillas.model.js")(sequelize, Sequelize);
db.archivos = require("../models/archivos.model.js")(sequelize, Sequelize);

module.exports = db;