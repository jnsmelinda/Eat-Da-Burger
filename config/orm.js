const { connection } = require("./connection.js");

const orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
    },
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += "); ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
          if (err) {
              console.log(err);
            throw err;
          }

          cb(result);
        });
    },
}

function printQuestionMarks(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
}

function selectAll(tableInput, cb) {
    console.log("select");
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
        if (err) {
        throw err;
        }
        cb(result);
    });
}

function insertOne() {
    console.log("insert");
}

function updateOne() {
    console.log("update");
}

module.exports = orm;
