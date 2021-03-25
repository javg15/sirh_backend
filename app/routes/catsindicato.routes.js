const { authJwt } = require("../middleware");
const controller = require("../controllers/catsindicato.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catsindicato/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catsindicato/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catsindicato/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );

};