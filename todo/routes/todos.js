var express = require('express');
var router = express.Router();
var Todo = require('../models/todo_model');

const schema = require('../validation_schema/todo_schema');

//const { check, validationResult } = require('express-validator/check');
//const { matchedData, sanitize } = require('express-validator/filter');

//var bodyParser = require('body-parser');
var result;

/* Todo listing. */
router.post('/', function(req, res, next) {
  Todo.getAllTodo(function(err, count){
    if(err){
      res.send(err);
    }else{
      res.json(count);
    }
  });
});

/* Create or Modify Todo. */
router.post('/create', function(req, res, next) {
  //console.log(req.body);
  if(req.body.id){
    result = schema.updateVld.validate(req.body, {abortEarly: false}); 
  }else{
    result = schema.createVld.validate(req.body, {abortEarly: false});
  }

  // Check for error in validations
  if(result.error){
    res.send(result.error);
  }else{
    Todo.addOrModifyTodo(req.body, function(err, count){    
      if(err){
        res.send(err);
      }else{
        res.json(count);
      }
    });
  }

});

/* Delete Todo. */
router.post('/delete', function(req, res, next) {
  result = schema.deleteVld.validate(req.body, {abortEarly: false}); 
  if(result.error){
    res.send(result.error);
  }else{
    Todo.deleteTodo(req.body, function(err, count){   
      if(err){
        res.send(err);
      }else{
        res.json(count);
      }
    });
  }

});

/* Get all users linked to this todo */
router.post('/linkusers', function(req, res, next) {
  result = schema.todoVld.validate(req.body, {abortEarly: false});  
  if(result.error){
    res.send(result);
  }else{    
    Todo.todoUsers(req.body, function(err, count){
      if(err){
        res.send(err);
      }else{
        res.json(count);
      }
    });
    
  }
});

module.exports = router;