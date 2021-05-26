const { authJwt } = require("../middleware");
const controller = require("../controllers/catbajamotivo.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catbajamotivo/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catbajamotivo/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catbajamotivo/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};