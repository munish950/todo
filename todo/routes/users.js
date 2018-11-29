var express = require('express');
var router = express.Router();
var User = require('../models/user_model');
var UserTodo = require('../models/user_todo_model');
var multer = require('multer');
var path = require('path');
//var upload = multer({dest: 'uploads/'});

const schema = require('../validation_schema/user_schema');

var result;

/* users listing. */
router.post('/', function(req, res, next) {
  User.getAllUser(function(err, count){
    if(err){
      res.send(err);
    }else{
      //res.render('users/index', { title: 'Express' });
      res.json(count);
    }
  })
});

router.post('/create', function(req, res, next) {
  if(req.body.id){
    result = schema.updateVld.validate(req.body, {abortEarly: false});
  }else{
    result = schema.createVld.validate(req.body, {abortEarly: false});
  }

  if(result.error){
    res.send(result.error);
  }else{
    User.addOrModifyUser(req.body, function(err, count){
      if(err){
        res.send(err);
      }else{
        res.json(count);
      }
    });
  }
 
});

router.post('/delete', function(req, res, next){
  result = schema.deleteVld.validate(req.body, {abortEarly: false});

  if(result.error){
    res.send(result.error);
  }else{
    User.deleteUser(req.body, function(err, count){
      if(err){
        res.send(err);
      }else{
        res.send(count);
      }
    })
  }
});

router.post('/usertodo', function(req, res, next){
  
  
 // result = schema.userTodoVld.validate(req.body, {abortEarly: false});
  // Set filepath and destination
  var storage = multer.diskStorage({
    destination: function(req, file, cb){      
      cb(null, './uploads');
    },
    filename: function(req, file, cb){     
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
  })
  
  var uploadStatus = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg'){
        return cb(res.send('Only Images are Allowed'), null)
      }
      cb(null, true);
    }
  }).single('document');
  

  uploadStatus(req, res, function(err){
    result = schema.userTodoVld.validate(req.body, {abortEarly: false});
    //console.log(result);
    if(result.error){
      res.send(result.error);
    }else{
      //res.send(req.file);
      if(req.file){
        req.body.document = req.file.filename;
      }else{
        req.body.document = '';
      }
      UserTodo.todoUsers(req.body, function(err, count){
        if(err){
          res.send(err);
        }else{
          res.send(count);
        }
      });
    }
  });

});

module.exports = router;