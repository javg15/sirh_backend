const { authJwt } = require("../middleware");
const controller = require("../controllers/ejercicioreal.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/ejercicioreal/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/ejercicioreal/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/ejercicioreal/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};