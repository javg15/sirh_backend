const { authJwt } = require("../middleware");
const controller = require("../controllers/ministraciones.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/ministraciones/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/ministraciones/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/ministraciones/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/ministraciones/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};