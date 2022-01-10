const { authJwt } = require("../middleware");
const controller = require("../controllers/catdocumentos.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catdocumentos/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catdocumentos/getCatalogoProfesional", [authJwt.verifyToken],
        controller.getCatalogoProfesional
    );
    app.post(
        "/api/catdocumentos/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catdocumentos/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};