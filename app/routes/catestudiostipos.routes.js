const { authJwt } = require("../middleware");
const controller = require("../controllers/catestudiostipos.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catestudiostipos/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catestudiostipos/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catestudiostipos/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};