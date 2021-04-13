const { authJwt } = require("../middleware");
const controller = require("../controllers/horasclasedetalle.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/horasclasedetalle/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/horasclasedetalle/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/horasclasedetalle/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/horasclasedetalle/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};