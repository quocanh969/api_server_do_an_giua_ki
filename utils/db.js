var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: 'remotemysql.com',
        port: '3306',
        user: 'NgdWTXVp3P',
        password: 'rqBTpHH08l',
        database: 'NgdWTXVp3P',
        dateStrings: true,
        timezone: 'Z',
        typeCast: function castField(field, useDefaultTypeCasting) {

            if ((field.type === "BIT") && (field.length === 1)) {

                var bytes = field.buffer();

                return (bytes[0] === 1);

            }

            return (useDefaultTypeCasting());

        }
    });
}

module.exports = {
    load: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
                connection.end();
            });
        });
    },
    add: user => {
        return new Promise((resolve, reject) => {
            var sql = `INSERT INTO USERs(username, password, name, email, yob, gender, address) VALUES('${user.username}', '${user.password}', '${user.name}', '${user.email}',${user.yob},${user.gender},'${user.address}')`;            
            var connection = createConnection();
            connection.connect();
            connection.query(sql, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.end();
            });
        });
    },
}