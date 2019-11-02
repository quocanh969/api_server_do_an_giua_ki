var express = require('express');
var router = express.Router();

var userModel = require('../models/user.model');

/* GET users listing. */
router.get('/', function (req, res, next) {
  userModel.getAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ 'error': 'lỗi rồi !!' })
    });

});

router.post('/register', (req, res) => {
  var user = req.body;

  var checkUserExist = [];

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
            res.json({ message: 'Register faile !!!', code: 0 });
          });
      }
    })
    .catch((error) => {
      res.end('Có lỗi');
    });

});

router.post('/login', (req, res) => {
  var user = req.body;

  userModel.getByUsername(user.username)
    .then((data) => {
      if (data.length > 0) { // đã tồn tại
        if(user.password === data[0].password)
        {
          res.json({message:'Login success',code: 2});
        }
        else
        {
          res.json({message:'Password wrong',code: 1});
        }        
      }
      else {
        res.json({message:'Username wrong',code: 0});
      }
    })
    .catch((error) => {
      res.end('Có lỗi');
    });
});

module.exports = router;
