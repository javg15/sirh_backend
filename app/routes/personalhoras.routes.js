const { authJwt } = require("../middleware");
const controller = require("../controllers/personalhoras.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/personalhoras/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/personalhoras/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/personalhoras/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/personalhoras/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};