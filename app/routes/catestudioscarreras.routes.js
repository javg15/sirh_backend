const { authJwt } = require("../middleware");
const controller = require("../controllers/catestudioscarreras.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catestudioscarreras/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catestudioscarreras/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catestudioscarreras/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
};