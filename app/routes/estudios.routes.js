const { authJwt } = require("../middleware");
const controller = require("../controllers/estudios.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/estudios/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/estudios/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/estudios/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/estudios/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};