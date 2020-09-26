const {connection} = require("./connection.js");

function selectAll(tableInput, cb, next) {
    const queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
        if (err) next(err);
        else cb(result);
    });
}

function insertOne(table, cols, vals, cb, next) {
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += "); ";

    connection.query(queryString, vals, function(err, result) {
        if (err) next(err);
        else cb(result);
    });
}

function updateOne(table, objColVals, condition, cb, next) {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
        if (err) next(err);
        else cb(result);
    });
}

function printQuestionMarks(num) {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    const arr = [];

    // eslint-disable-next-line guard-for-in
    for (const key in ob) {
        let value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}

module.exports = {selectAll, insertOne, updateOne};
