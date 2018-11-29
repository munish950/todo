var db = require('../config/dbconfig');


var UserTodo = {
    /*
    getAllTodo: function(callback){
        return db.query('SELECT * FROM todos', callback);
    },

    addOrModifyTodo: function(data, callback){
        if(data.id){
            return db.query('UPDATE todos SET name = ?, description = ?, status = ? WHERE id = ?', [data.name,data.description,data.status,data.id], callback);
        }else{
            return db.query('INSERT INTO todos (name, description, status)  VALUES (?, ?, ?)', [data.name,data.description,data.status], callback);
        }
    },

    deleteTodo: function(data, callback){
        if(data.id){
            return db.query('Delete FROM todos WHERE id= ?', [data.id], callback);
        }else{
            throw new Error('Invalid/Empty Parameters');
        }
    },
    */

    todoUsers: function(data, callback){
        if(data.id){
            return db.query('UPDATE user_todo SET user_id=?,todo_id=?,document=?,todo_text=? WHERE id=?', [data.user_id,data.todo_id,data.document,data.todo_text,data.id], callback);
        }else{
            return db.query('INSERT INTO user_todo (user_id,todo_id,document,todo_text) VALUES (?,?,?,?)', [data.user_id,data.todo_id,data.document,data.todo_text], callback);
        }
    } 
}

module.exports = UserTodo;