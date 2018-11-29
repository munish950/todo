var db = require('../config/dbconfig');


var Todo = {
    getAllTodo: function(callback){
        return db.query('SELECT * FROM todos', callback);
    },

    addOrModifyTodo: function(data, callback){
        if(data.id){
            return db.query('UPDATE todos SET name = ?, description = ?, status = ? WHERE id = ?', [data.name,data.description,data.status,data.id], callback);
        }else{
            return db.query('INSERT INTO todos (name, description)  VALUES (?, ?)', [data.name,data.description], callback);
        }
    },

    deleteTodo: function(data, callback){
        if(data.id){
            return db.query('Delete FROM todos WHERE id= ?', [data.id], callback);
        }else{
            throw new Error('Invalid/Empty Parameters');
        }
    },

    todoUsers: function(data, callback){
        if(data.todo_id){
            return db.query('SELECT u.id as user_id,u.name as user_name,u.email,t.id as todo_id,t.name as todo_name,t.description as todo_description FROM user_todo ut LEFT JOIN todos t ON t.id = ut.todo_id LEFT JOIN users u ON u.id = ut.user_id WHERE ut.todo_id = ?', [data.todo_id], callback);
        }
    } 
}

module.exports = Todo;