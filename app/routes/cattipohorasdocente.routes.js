const { authJwt } = require("../middleware");
const controller = require("../controllers/cattipohorasdocente.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/cattipohorasdocente/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/cattipohorasdocente/getCatalogoSegunMateria", [authJwt.verifyToken],
        controller.getCatalogoSegunMateria
    );
    app.post(
        "/api/cattipohorasdocente/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/cattipohorasdocente/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};