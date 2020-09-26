const orm = require("../config/orm.js");

const burger = {
    all: function(cb, next) {
        orm.selectAll("burgers", cb, next);
    },
    create: function(cols, vals, cb, next) {
        orm.insertOne("burgers", cols, vals, cb, next);
    },
    update: function(objColVals, condition, cb, next) {
        orm.updateOne("burgers", objColVals, condition, cb, next);
    },
};

module.exports = burger;
