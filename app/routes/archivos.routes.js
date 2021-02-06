const { authJwt } = require("../middleware");
const controller = require("../controllers/archivos.controller");
let upload = require('../config/multer.config.js');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/archivos/upload", [authJwt.verifyToken],
        upload.single("file"), controller.upload
    );

    app.post(
        "/api/archivos/getRecordReferencia", [authJwt.verifyToken],
        controller.getRecordReferencia
    );
    app.post(
        "/api/archivos/getAvatar", [authJwt.verifyToken],
        controller.getAvatar
    );
    app.post(
        "/api/archivos/setRecordReferencia", [authJwt.verifyToken],
        controller.setRecordReferencia
    );
    app.get(
        "/api/archivos/info/:id", [authJwt.verifyToken],
        controller.listFiles
    );
    app.get(
        "/api/archivos/:id", [authJwt.verifyToken],
        controller.download
    );

};