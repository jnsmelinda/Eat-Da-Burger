const express = require("express");
const burger = require("../models/burger.js");

var router = express.Router();

router.get('/index', function (req, res) {
    renderBurgers(res);
});

router.post("/index", function(req, res) {
    console.log(req.body);

    burger.create([
        "burger_name", "devoured"
      ], [
        req.body.burger_name, req.body.devoured
      ], function(result) {
        renderBurgers(res);
    });
});


function renderBurgers(res) {
    burger.all(function(data) {
        var hbsObject = {
          burgers: data
        };
        res.render("index", hbsObject);
    });
}
module.exports = router;
