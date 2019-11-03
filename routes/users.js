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
  console.log(param);
  userModel.changeAvatar(param.id,param.url)
    .then((data) => {
      res.json({ message: 'Update avatar success !!!', code: 1 });
    })
    .catch((error) => {
      res.json({ message: 'Update avatar fail !!!', code: 0 });
    });
    
});


router.post('/login', (req, res,next) => {  

  passport.authenticate('local', {session: false}, (err, user, info)=>{        
    
    if(user === false)
    {
      res.json({user,info})
    }
    else
    {
      if(err || !user)
      {         
          return res.status(400).json({
              message:'Something is not right',
              user: user,
          });
      }
  
      req.login(user, {session: false}, (err)=>{
          if(err)
          {
              res.send(err);
          }
          
          let payload = {id:user.loginUser.id};
          const token = jwt.sign(payload,'1612018_TranQuocAnh');
          return res.json({user,token,info});        
      });
    }
  })(req,next);
});



module.exports = router;
