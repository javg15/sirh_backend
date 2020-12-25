const { authJwt } = require("../middleware");
const controller = require("../controllers/categoriassueldos.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/categoriassueldos/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/categoriassueldos/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/categoriassueldos/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/categoriassueldos/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};