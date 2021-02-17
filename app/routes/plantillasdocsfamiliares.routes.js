const { authJwt } = require("../middleware");
const controller = require("../controllers/plantillasdocsfamiliares.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/plantillasdocsfamiliares/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/plantillasdocsfamiliares/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/plantillasdocsfamiliares/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/plantillasdocsfamiliares/getRecordPersonal", [authJwt.verifyToken],
        controller.getRecordPersonal
    );
    app.post(
        "/api/plantillasdocsfamiliares/getConsecutivo", [authJwt.verifyToken],
        controller.getConsecutivo
    );

    app.post(
        "/api/plantillasdocsfamiliares/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};