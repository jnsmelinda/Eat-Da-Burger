const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const initdb = require("./db/db-init");
const {connection} = require("./config/connection.js");
const router = require("./controllers/burgers_controller.js");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(router);

function start() {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected as id " + connection.threadId);
        app.listen(PORT, function() {
            console.log("Server listening on: http://localhost:" + PORT);
        });
        // connection.destroy();
    });
}

initdb(start);
