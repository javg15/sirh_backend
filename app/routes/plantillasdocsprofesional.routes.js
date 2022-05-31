const { authJwt } = require("../middleware");
//const controller = require("../controllers/plantillasdocsprofesional.controller");
const controllerPersonal = require("../controllers/personalexpediente.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/plantillasdocsprofesional/getAdmin", [authJwt.verifyToken],
        controllerPersonal.getAdmin
    );
    app.post(
        "/api/plantillasdocsprofesional/getRecord", [authJwt.verifyToken],
        controllerPersonal.getRecord
    );
    app.post(
        "/api/plantillasdocsprofesional/setRecord", [authJwt.verifyToken],
        controllerPersonal.setRecord
    );
};