const { authJwt } = require("../middleware");
const controller = require("../controllers/cattipohorasmateria.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/cattipohorasmateria/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/cattipohorasmateria/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/cattipohorasmateria/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};