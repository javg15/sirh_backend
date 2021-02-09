const { authJwt } = require("../middleware");
const controller = require("../controllers/categoriastabular.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/categoriastabular/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/categoriastabular/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/categoriastabular/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
    app.post(
        "/api/categoriastabular/getCatalogoSegunPlantel", [authJwt.verifyToken],
        controller.getCatalogoSegunPlantel
    );

};