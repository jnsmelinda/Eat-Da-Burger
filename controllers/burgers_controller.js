const express = require("express");
const burger = require("../models/burger.js");

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/index", function(req, res) {
    renderBurgers(res);
});

router.post("/index", function(req, res) {
    console.log(req.body);
    if (req.body.id == null) {
        console.log("create " + req.body.burger_name);
        burger.create(
            ["burger_name", "devoured"],
            [req.body.burger_name, false],
            (result) => renderBurgers(res)
        );
    } else {
        console.log("update " + req.body.id);
        burger.update(
            {devoured: true},
            `id = ${req.body.id}`,
            (result) => renderBurgers(res)
        );
    }
});

function renderBurgers(res) {
    burger.all(function(data) {
        const hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
}
module.exports = router;
