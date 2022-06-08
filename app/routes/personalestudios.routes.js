const { authJwt } = require("../middleware");
const controller = require("../controllers/personalestudios.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/personalestudios/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/personalestudios/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/personalestudios/getAdminSub", [authJwt.verifyToken],
        controller.getAdminSub
    );
    app.post(
        "/api/personalestudios/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/personalestudios/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};