const initdb = require("./db/db-init");

function start() {
    console.log("started");
}

initdb(start);
