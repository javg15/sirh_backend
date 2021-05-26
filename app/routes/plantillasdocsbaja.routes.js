const { authJwt } = require("../middleware");
const controller = require("../controllers/plantillasdocsbaja.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/plantillasdocsbaja/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/plantillasdocsbaja/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );

    app.post(
        "/api/plantillasdocsbaja/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};