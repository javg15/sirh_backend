const { authJwt } = require("../middleware");
const controller = require("../controllers/catpercepcionescategorias.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catpercepcionescategorias/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catpercepcionescategorias/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catpercepcionescategorias/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/catpercepcionescategorias/getRecordSegunCategoria", [authJwt.verifyToken],
        controller.getRecordSegunCategoria
    );
    app.post(
        "/api/catpercepcionescategorias/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};