const mysql = require("mysql");

const database = process.env.BURGER_DB_NAME || "burgers_db";

const connectionConfig = {
    host: process.env.BURGER_DB_HOST || "localhost",
    user: process.env.BURGER_DB_USER || "root",
    password: process.env.BURGER_DB_PASSWORD || "password",
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
