var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
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

router.post('/update', (req, res) => {  
  var param = req.body;   
  
  
  userModel.updateUser(param.id,param.user.name,param.user.email,param.user.gender,param.user.yob,param.user.address)
    .then((data) => {
      res.json({ message: 'Update user success !!!', code: 1 });
    })
    .catch((error) => {
      res.json({ message: 'Update user fail !!!', code: 0 });
    });
    
});

router.post('/update-password', (req, res) => {  
  var param = req.body;    
  userModel.updatePassword(param.id,param.password)
    .then((data) => {
      res.json({ message: 'Update password success !!!', code: 1 });
    })
    .catch((error) => {
      res.json({ message: 'Update password fail !!!', code: 0 });
    });
    
});


router.post('/update-avatar', (req, res) => {  
  var param = req.body;   
  userModel.changeAvatar(param.id,param.url)
    .then((data) => {
      res.json({ message: 'Update avatar success !!!', code: 1 });
    })
    .catch((error) => {
      res.json({ message: 'Update avatar fail !!!', code: 0 });
    });
    
});



module.exports = router;