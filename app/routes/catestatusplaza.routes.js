const { authJwt } = require("../middleware");
const controller = require("../controllers/catestatusplaza.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catestatusplaza/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catestatusplaza/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catestatusplaza/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/catestatusplaza/setRecord", [authJwt.verifyToken],
        controller.setRecord
    );
};