const { authJwt } = require("../middleware");
const controller = require("../controllers/reportes.controller");

module.exports = function(app) {


    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/reportes/getMenuReportes", [authJwt.verifyToken],
        controller.getMenuReportes
    );
    app.get("/api/reportes/categorias", // [authJwt.verifyToken],
        controller.getCategorias
    );

    app.get("/api/reportes/plazas_listado", // [authJwt.verifyToken],
        controller.getPlazasListado
    );

    app.get("/api/reportes/plantilla_nombramiento", // [authJwt.verifyToken],
        controller.getPlantillaNombramiento
    );
    app.get("/api/reportes/personal_estudios", // [authJwt.verifyToken],
        controller.getPersonalEstudios
    );
    app.get("/api/reportes/personal_estudios_materia", // [authJwt.verifyToken],
        controller.getPersonalEstudiosMateria
    );

};