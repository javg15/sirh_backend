const { authJwt } = require("../middleware");
const controller = require("../controllers/catfuncionplantilla.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catfuncionplantilla/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catfuncionplantilla/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catfuncionplantilla/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );

};