const { authJwt } = require("../middleware");
const controller = require("../controllers/catfuncionsecundaria.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catfuncionsecundaria/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catfuncionsecundaria/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catfuncionsecundaria/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );

};