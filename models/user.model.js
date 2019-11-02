var db = require('../utils/db');

module.exports = {
    getAll:() => {
        return db.load('SELECT * FROM USERs');
    },
    getByUsername:username => {
        return db.load(`SELECT * FROM USERs WHERE username = '${username}'`);
    },
    register:user=>{
        return db.add(user);
    }
}