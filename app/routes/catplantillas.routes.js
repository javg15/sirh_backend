const { authJwt } = require("../middleware");
const controller = require("../controllers/catplantillas.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catplantillas/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catplantillas/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catplantillas/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/catplantillas/getCatalogoSegunSexo", [authJwt.verifyToken],
        controller.getCatalogoSegunSexo
    );

};