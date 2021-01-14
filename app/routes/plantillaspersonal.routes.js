const { authJwt } = require("../middleware");
const controller = require("../controllers/plantillaspersonal.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/plantillaspersonal/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/plantillaspersonal/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/plantillaspersonal/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/plantillaspersonal/getRecordPersonal", [authJwt.verifyToken],
        controller.getRecordPersonal
    );

    app.post(
        "/api/plantillaspersonal/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};