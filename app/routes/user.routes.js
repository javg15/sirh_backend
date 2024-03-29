const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/user/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/user/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );
    app.post(
        "/api/user/getRecordUsuariosZonas", [authJwt.verifyToken],
        controller.getRecordUsuariosZonas
    );

    app.post(
        "/api/user/getMenu", [authJwt.verifyToken],
        controller.getMenu
    );
    app.post(
        "/api/user/getTreePermisos", [authJwt.verifyToken],
        controller.getTreePermisos
    );
    
    app.post(
        "/api/user/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/user/setPerfil", [authJwt.verifyToken],
        controller.setPerfil
    );

    app.get(
        "/api/user", [authJwt.verifyToken],
        controller.getUser
    );
};