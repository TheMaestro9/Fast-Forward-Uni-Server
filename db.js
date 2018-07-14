var mysql = require('mysql');
var settings = {
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "1234",
    database: "ffuni"
}
var db;

function connectDatabase() {
    if (!db) {

        var cfenv = require('cfenv');
        const assert = require('assert');
        const util = require('util')
        var appEnv = cfenv.getAppEnv();

        if (!appEnv.isLocal) {
            var services = appEnv.services;
            var mysql_services = services["compose-for-mysql"];
            assert(!util.isUndefined(mysql_services), "Must be bound to compose-for-mysql services");

            var credentials = mysql_services[0].credentials;
            db = mysql.createConnection(credentials.uri);

        }
        else
            db = mysql.createConnection(settings);

        db.connect(function (err) {
            if (!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();