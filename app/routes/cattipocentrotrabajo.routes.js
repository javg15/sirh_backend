const { authJwt } = require("../middleware");
const controller = require("../controllers/cattipocentrotrabajo.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/cattipocentrotrabajo/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );

    app.post(
        "/api/cattipocentrotrabajo/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/cattipocentrotrabajo/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/cattipocentrotrabajo/getCatalogoAdministrativo", [authJwt.verifyToken],
        controller.getCatalogoAdministrativo
    );
    app.post(
        "/api/cattipocentrotrabajo/getCatalogoAdministrativoTipos", [authJwt.verifyToken],
        controller.getCatalogoAdministrativoTipos
    );
};