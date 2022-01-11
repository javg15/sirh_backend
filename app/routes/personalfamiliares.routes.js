const { authJwt } = require("../middleware");
const controller = require("../controllers/personalfamiliares.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/personalfamiliares/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/personalfamiliares/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );

    app.post(
        "/api/personalfamiliares/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};