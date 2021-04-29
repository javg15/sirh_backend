const { authJwt } = require("../middleware");
const controller = require("../controllers/categoriasdetalle.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/categoriasdetalle/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/categoriasdetalle/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/categoriasdetalle/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/categoriasdetalle/getRecordSegunCategoria", [authJwt.verifyToken],
        controller.getRecordSegunCategoria
    );
    app.post(
        "/api/categoriasdetalle/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};