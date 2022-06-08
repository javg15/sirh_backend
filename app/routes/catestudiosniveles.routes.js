const { authJwt } = require("../middleware");
const controller = require("../controllers/catestudiosniveles.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catestudiosniveles/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catestudiosniveles/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catestudiosniveles/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};