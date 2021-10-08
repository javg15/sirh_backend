const { authJwt } = require("../middleware");
const controller = require("../controllers/plantillaspersonaldocs.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/plantillaspersonaldocs/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/plantillaspersonaldocs/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/plantillaspersonaldocs/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/plantillaspersonaldocs/getRecordPersonal", [authJwt.verifyToken],
        controller.getRecordPersonal
    );
    app.post(
        "/api/plantillaspersonaldocs/getConsecutivo", [authJwt.verifyToken],
        controller.getConsecutivo
    );

    app.post(
        "/api/plantillaspersonaldocs/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
    app.post(
        "/api/plantillaspersonaldocs/setActualizarFin", [authJwt.verifyToken],
        controller.setActualizarFin
    );
    
};