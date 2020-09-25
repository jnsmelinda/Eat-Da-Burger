const fs = require("fs");
const {connectionForDbInit: connection} = require("../config/connection.js");

function initdb(callback) {
    connection.connect(function(err) {
        if (err) throw err;
        fs.readFile("db/schema.sql", "utf8", (err, data) => {
            if (err) throw err;

            connection.query(data, function(err, result) {
                if (err) throw err;
                connection.query("SELECT COUNT(*) AS size FROM burgers LIMIT 1", function(err, result) {
                    if (err) throw err;
                    if (result[0].size === 0) {
                        fs.readFile("db/seed.sql", "utf8", (err, data) => {
                            if (err) throw err;

                            connection.query(data, function(err, result) {
                                if (err) throw err;
                                console.log("Data populated");
                                connection.destroy();
                                callback();
                            });
                        });
                    } else {
                        connection.destroy();
                        callback();
                    }
                });
            });
        });
    });
}

module.exports = initdb;
