const { authJwt } = require("../middleware");
const controller = require("../controllers/horas.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/horas/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/horas/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/horas/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/horas/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};