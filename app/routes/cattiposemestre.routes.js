const { authJwt } = require("../middleware");
const controller = require("../controllers/cattiposemestre.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/cattiposemestre/getCatalogo", [authJwt.verifyToken],
        controller.getCatalogo
    );
    app.post(
        "/api/cattiposemestre/getAdmin", [authJwt.verifyToken],
        controller.getAdmin
    );
    app.post(
        "/api/cattiposemestre/getRecord", [authJwt.verifyToken],
        controller.getRecord
    );

};