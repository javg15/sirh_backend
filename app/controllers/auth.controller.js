const db = require("../models");
const { user: User, role: Role, refreshToken: RefreshToken, personal:Personal  } = db;
const config = require("../config/auth.config");
/*const User = db.user;
const Personal = db.personal;
const RefreshToken= db.refreshToken;*/
const nodemailer = require("nodemailer");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
            username: req.body.username,
            email: req.body.email,
            pass: bcrypt.hashSync(req.body.password, 8)
        })
        .then(user => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
            where: {
                username: req.body.username,
            }
        })
        .then(async user => {
            if (!user) {
                return res.status(404).send({error:false, message: "El usuario en combinación con el token no existen" });
            }
            
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.pass
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Contraseña inválida!"
                });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration
                });

            /*var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 60 // 900=25min 3600=1 hr, 60=1 min, 86400=1 día
            });*/

            let refreshTokenObj = await RefreshToken.createToken(user);

            var authorities = [];
            /*for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }*/
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                refreshToken: refreshTokenObj,
            });
            
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
  
    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
      let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
  
      console.log(refreshToken)
  
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.destroy({ where: { id: refreshToken.id } });
        
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
  
      const user = await refreshToken.getUser();
      let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };
  
exports.recoverpass = async(req, res) => {

    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if (!user) {
            return res.status(200).send({error:true, message: "Usuario no encontrado." });
        }
        //verificar el personal vinculado al usuario
        Personal.findOne({
            where: {
                id_usuarios_sistema: user.id
            }
        })
        .then(personal => {
            if (!personal) {
                return res.status(200).send({ error:true, message: "El Personal vinculado al usuario no existe." });
            }
            else{
                //revisar si la cuenta de correo es valida
                if (!personal.email.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )) {
                    return res.status(200).send({ error:true, message: "El correo del Personal vinculado al usuario no es correcto." });
                }
                else{
                    //generar token
                    var token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 900 // 900=25min 3600=1 hr, 60=1 min
                    });
                    user.update({tokenrecuperar:token});
                    //enviar correo
                    const transporter = nodemailer.createTransport({
                        service:'gmail',
                        host: 'smtp.gmail.com',
                        port: 465,
                        auth: {
                            user: 'control.plazas.cobaev@gmail.com',
                            pass: 'tqnsjrdqcckgyvsm',
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    transporter.verify().then(console.log).catch(console.error);
                
                    transporter.sendMail({
                        from: '"Control de plazas" <control.plazas.cobaev@gmail.com>', // sender address
                        to: '"'+personal.nombre+' '+ personal.apellidopaterno+' '+ personal.apellidomaterno +'" <'+personal.email+'>', // list of receivers
                        subject: "Recuperar contraseña", // Subject line
                        text: "Se ha generado una solicitud de regeneración de contraseña para ingresar al Sistema de Control de Plazas del COBAEV, en caso de no haberlo solicitado usted, entonces, haga caso omiso a este correo.", // plain text body
                        html: "<b>Se ha generado una solicitud de regeneración de contraseña para ingresar al Sistema de Control de Plazas del COBAEV, en caso de no haberlo solicitado usted, entonces, haga caso omiso a este correo. </b>"
                            + "<br>Para continuar con la solicitud, haga clic <a href='" + req.body.url + "/#/login/nuevacontraseña?token=" + token + "' target='_blank'>aquí</a>", // html body
                    }).then(info => {
                        return res.status(200).send({ error:false, message: info });
                    }).catch(err => {
                            res.status(500).send({ message: err.message });
                    });
                }
            }

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

        
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.generarpass = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            tokenrecuperar:req.body.token,
        }
    })
    .then(user => {
        if (!user) {
            return res.status(401).send({error:true, message: "El Usuario en combinación con el token no fue encontrado." });
        }

        user.update({pass: bcrypt.hashSync(req.body.password, 8)});
        
        return res.status(200).send({error:false});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};