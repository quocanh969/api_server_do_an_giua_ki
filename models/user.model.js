var db = require('../utils/db');

module.exports = {
    getAll:() => {
        return db.load('SELECT * FROM USERs');
    },
    getByUsername:username => {
        return db.load(`SELECT * FROM USERs WHERE username = '${username}'`);
    },
    updateUser:(id, name, email, gender, yob, address) => {
        return db.load(`UPDATE USERs SET name="${name}", email="${email}", gender=${gender}, yob=${yob}, address="${address}" WHERE id=${id}; `);
    },
    updatePassword:(id, password) => {
        return db.load(`UPDATE USERs SET password="${password}" WHERE id=${id}; `);
    },
    changeAvatar:(id, url) => {
        return db.load(`UPDATE USERs SET avatar="${url}" WHERE id=${id}; `);
    },
    register:user=>{
        return db.add(user);
    }
}