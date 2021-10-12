const { authJwt } = require("../middleware");
const controller = require("../controllers/catestatusquincena.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catestatusquincena/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catestatusquincena/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catestatusquincena/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};