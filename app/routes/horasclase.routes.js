const { authJwt } = require("../middleware");
const controller = require("../controllers/horasclase.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/horasclase/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/horasclase/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/horasclase/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/horasclase/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};