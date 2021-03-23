const { authJwt } = require("../middleware");
const controller = require("../controllers/plantillasdocslicencias.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/plantillasdocslicencias/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/plantillasdocslicencias/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/plantillasdocslicencias/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/plantillasdocslicencias/getDatosPrestacion", [authJwt.verifyToken],
        controller.getDatosPrestacion
    );
    app.post(
        "/api/plantillasdocslicencias/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};