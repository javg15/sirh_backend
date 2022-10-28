const { authJwt } = require("../middleware");
const controller = require("../controllers/plantillasdocsnombramiento.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/plantillasdocsnombramiento/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/plantillasdocsnombramiento/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/plantillasdocsnombramiento/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/plantillasdocsnombramiento/getRecordPersonal", [authJwt.verifyToken],
        controller.getRecordPersonal
    );
    app.post(
        "/api/plantillasdocsnombramiento/getConsecutivo", [authJwt.verifyToken],
        controller.getConsecutivo
    );

    app.post(
        "/api/plantillasdocsnombramiento/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );

    app.post(
        "/api/plantillasdocsnombramiento/setRecordSQLServer", [authJwt.verifyToken],
        controller.setRecordSQLServer
    );
    
    app.post(
        "/api/plantillasdocsnombramiento/setUpdateIdServer", [authJwt.verifyToken],
        controller.setUpdateIdServer
    );
    
};