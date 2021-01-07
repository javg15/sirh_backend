const { authJwt } = require("../middleware");
const controller = require("../controllers/reportes.controller");

module.exports = function(app) {


    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/reportes/categorias", // [authJwt.verifyToken],
        controller.getCategorias
    );

};