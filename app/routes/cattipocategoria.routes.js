const { authJwt } = require("../middleware");
const controller = require("../controllers/cattipocategoria.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/cattipocategoria/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/cattipocategoria/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/cattipocategoria/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};