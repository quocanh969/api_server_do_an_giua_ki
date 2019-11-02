const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const userModel = require('./models/user.model');


passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
    },
    function (username, password, cb) {
        return userModel.getByUsername(username)
            .then((data) => {
                if (data.length > 0) { // đã tồn tại
                    if (password === data[0].password) {
                        return cb(null, { loginUser: data[0] }, { message: 'Logged in successfully', code: 2 });
                    }
                    else {
                        cb(null, false, { message: 'Password wrong', code: 1 });
                    }
                }
                else {
                    return cb(null, false, { message: 'Username wrong', code: 0 });
                }
            })
            .catch((error) => {
                return cb(err)
            });
    }
));
