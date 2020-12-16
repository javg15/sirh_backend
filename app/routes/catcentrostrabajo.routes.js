const { authJwt } = require("../middleware");
const controller = require("../controllers/catcentrostrabajo.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catcentrostrabajo/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catcentrostrabajo/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catcentrostrabajo/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/catcentrostrabajo/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};