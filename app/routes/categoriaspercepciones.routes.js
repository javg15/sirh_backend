const { authJwt } = require("../middleware");
const controller = require("../controllers/categoriaspercepciones.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/categoriaspercepciones/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/categoriaspercepciones/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/categoriaspercepciones/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/categoriaspercepciones/getRecordSegunCategoria", [authJwt.verifyToken],
        controller.getRecordSegunCategoria
    );
    app.post(
        "/api/categoriaspercepciones/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};