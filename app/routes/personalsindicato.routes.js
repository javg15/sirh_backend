const { authJwt } = require("../middleware");
const controller = require("../controllers/personalsindicato.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/personalsindicato/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/personalsindicato/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );

    app.post(
        "/api/personalsindicato/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};