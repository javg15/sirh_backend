const { authJwt } = require("../middleware");
const controller = require("../controllers/personalexpediente.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/personalexpediente/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/personalexpediente/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/personalexpediente/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};