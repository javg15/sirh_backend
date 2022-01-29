const { authJwt } = require("../middleware");
const controller = require("../controllers/catregiones.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catregiones/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catregiones/getCatalogoOpen",
        controller.getCatalogoOpen
    );
    
    app.post(
        "/api/catregiones/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catregiones/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};