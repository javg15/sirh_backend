const { authJwt } = require("../middleware");
const controller = require("../controllers/semestre.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/semestre/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/semestre/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/semestre/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/semestre/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};