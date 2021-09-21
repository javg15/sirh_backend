const { authJwt } = require("../middleware");
const controller = require("../controllers/plazas.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/plazas/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/plazas/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );

    app.post(
        "/api/plazas/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );

    app.post(
        "/api/plazas/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );


    app.post(
        "/api/plazas/getRecordPlazasInfo", [authJwt.verifyToken],
        controller.getRecordPlazasInfo
    );

    app.post(
        "/api/plazas/getConsecutivo", [authJwt.verifyToken],
        controller.getConsecutivo
    );

    app.post(
        "/api/plazas/getClave", [authJwt.verifyToken],
        controller.getClave
    );
    app.post(
        "/api/plazas/getPlazaSegunPersonal", [authJwt.verifyToken],
        controller.getPlazaSegunPersonal
    );
    app.post(
        "/api/plazas/getHistorial", [authJwt.verifyToken],
        controller.getHistorial
    );
    app.post(
        "/api/plazas/getHistorialNomina", [authJwt.verifyToken],
        controller.getHistorialNomina
    );

    app.post(
        "/api/plazas/getCatalogoDisponibleSegunCategoria", [authJwt.verifyToken],
        controller.getCatalogoDisponibleSegunCategoria
    );

};