const mysql = require("mysql");

const database = "burgers_db";

const connectionConfig = {
    host: "localhost",
    user: "root",
    password: "password",
    database: database
};

const connection = mysql.createConnection(connectionConfig);

const connectionForDbInit = mysql.createConnection({
    host: connectionConfig.host,
    user: connectionConfig.user,
    password: connectionConfig.password,
    multipleStatements: true
});

module.exports = {connection, connectionForDbInit, database};
