const { authJwt } = require("../middleware");
const controller = require("../controllers/catfuncionprimaria.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/catfuncionprimaria/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/catfuncionprimaria/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/catfuncionprimaria/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );

};