const { authJwt } = require("../middleware");
const controller = require("../controllers/cattiponomina.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/cattiponomina/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/cattiponomina/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/cattiponomina/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};