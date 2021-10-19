const { authJwt } = require("../middleware");
const controller = require("../controllers/gruposclase.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/gruposclase/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/gruposclase/getCatalogoSegunPlantel", [authJwt.verifyToken],
        controller.getCatalogoSegunPlantel
    );
    app.post(
        "/api/gruposclase/getCatalogoConHorasDisponiblesSegunPlantel", [authJwt.verifyToken],
        controller.getCatalogoConHorasDisponiblesSegunPlantel
    );

    app.post(
        "/api/gruposclase/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/gruposclase/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/gruposclase/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
    app.post(
        "/api/gruposclase/getCatalogoConHorasDisponiblesSegunCopia", [authJwt.verifyToken],
        controller.getCatalogoConHorasDisponiblesSegunCopia
    );

};