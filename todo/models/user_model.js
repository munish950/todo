var db = require('../config/dbconfig');

var User = {
    getAllUser: function(callback){
        return db.query('SELECT id,name,status FROM users', callback);
    },

    addOrModifyUser: function(data, callback){
        if(data.id){
            return db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [data.name,data.email,data.password,data.id], callback);
        }else{
            return db.query('INSERT INTO users (name, email, password)  VALUES (?, ?, ?)', [data.name,data.email,data.password], callback);
        }
    },

    deleteUser: function(data, callback){
        if(data.id){
            return db.query('Delete FROM users WHERE id= ?', [data.id], callback);
        }else{
            throw new Error('Invalid/Empty Parameters');
        }
    }

    
}

module.exports = User;
