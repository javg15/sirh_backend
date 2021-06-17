const { authJwt } = require("../middleware");
const controller = require("../controllers/horasclaseasignar.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/horasclaseasignar/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/horasclaseasignar/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/horasclaseasignar/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/horasclaseasignar/getRecordSegunParent", [authJwt.verifyToken],
        controller.getRecordSegunParent
    );

    app.post(
        "/api/horasclaseasignar/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};