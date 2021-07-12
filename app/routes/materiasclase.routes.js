const { authJwt } = require("../middleware");
const controller = require("../controllers/materiasclase.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/materiasclase/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/materiasclase/getCatalogoConHorasDisponiblesSegunGrupo", [authJwt.verifyToken],
        controller.getCatalogoConHorasDisponiblesSegunGrupo
    );
    app.post(
        "/api/materiasclase/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/materiasclase/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/materiasclase/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};