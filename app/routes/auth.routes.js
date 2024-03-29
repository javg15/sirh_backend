const { verifySignUp, authJwt } = require("../middleware");

const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup", [
            verifySignUp.checkDuplicateUsernameOrEmail,
            //verifySignUp.checkRolesExisted
            authJwt.verifyToken
        ],
        controller.signup
    );


    app.post("/api/auth/signin", controller.signin);
    app.post("/api/auth/refreshtoken", controller.refreshToken);
    app.post("/api/auth/recoverpass", controller.recoverpass);
    app.post("/api/auth/generarpass", controller.generarpass);
};