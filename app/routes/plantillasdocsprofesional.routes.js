const { authJwt } = require("../middleware");
const controller = require("../controllers/plantillasdocsprofesional.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/plantillasdocsprofesional/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/plantillasdocsprofesional/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/plantillasdocsprofesional/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/plantillasdocsprofesional/getRecordPersonal", [authJwt.verifyToken],
        controller.getRecordPersonal
    );
    app.post(
        "/api/plantillasdocsprofesional/getConsecutivo", [authJwt.verifyToken],
        controller.getConsecutivo
    );

    app.post(
        "/api/plantillasdocsprofesional/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};