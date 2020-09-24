const express = require("express");
const burger = require("../models/burger.js");

var router = express.Router();

router.get('/index', function (req, res) {
    burger.all(function(data) {
        var hbsObject = {
          burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/index", function(req, res) {
    burger.create([
        "burger_name", "devoured"
      ], [
        req.body.name, req.body.sleepy
      ], function(result) {
        res.json({ id: result.insertId });
      });
    res.render('index');
});

module.exports = router;
