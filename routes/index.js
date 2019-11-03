var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var userModel = require('../models/user.model');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('welcome to my world');
});


router.post('/login', (req, res, next) => {

  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(user);
    if (user === false) {
      res.json({ user, info })
    }
    else {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }

        
        let payload = { id: user.loginUser.id };
        const token = jwt.sign(payload, '1612018_TranQuocAnh');
        return res.json({ user, token, info });
      });
    }
  })(req, next);
});


router.post('/register', (req, res) => {
  var user = req.body;

  userModel.getByUsername(user.username)
    .then((data) => {
      if (data.length > 0) { // đã tồn tại
        res.json({ message: 'Username is existed', code: -1 });
      }
      else {
        userModel.register(user)
          .then(() => {
            res.json({ message: 'Register success !!!', code: 1 });
          })
          .catch((error) => {
            console.log(error);
            res.json({ message: 'Register fail !!!', code: 0 });
          });
      }
    })
    .catch((error) => {
      res.end('Có lỗi');
    });

});

module.exports = router;
