const express = require("express");
const burger = require("../models/burger.js");

var router = express.Router();

router.get('/index', function (req, res) {
    res.render('index');
});

router.post("/index", function(req, res) {
    res.render('index');
});

module.exports = router;
