const { authJwt } = require("../middleware");
const controller = require("../controllers/personalhoras.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/personalhoras/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/personalhoras/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/personalhoras/getAdminSub", [authJwt.verifyToken],
        controller.getAdminSub
    );
    app.post(
        "/api/personalhoras/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/personalhoras/getAdminSubResumen", [authJwt.verifyToken],
        controller.getAdminSubResumen
    );

    app.post(
        "/api/personalhoras/getHorasDisponibleSegunDescarga", [authJwt.verifyToken],
        controller.getHorasDisponibleSegunDescarga
    );

    app.post(
        "/api/personalhoras/getCatalogoMateriasDescargadas", [authJwt.verifyToken],
        controller.getCatalogoMateriasDescargadas
    );


    app.post(
        "/api/personalhoras/getRecordTitularEnLicencia", [authJwt.verifyToken],
        controller.getRecordTitularEnLicencia
    );

    app.post(
        "/api/personalhoras/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};