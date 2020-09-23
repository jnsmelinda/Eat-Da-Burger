const initdb = require("./db/db-init");
const { connection } = require("./config/connection.js");

function start() {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        connection.destroy();
    });
}

initdb(start);
