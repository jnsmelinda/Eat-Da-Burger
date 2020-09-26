const express = require("express");
const burger = require("../models/burger.js");

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/index", function(req, res, next) {
    renderBurgers(res, next);
});

router.get("/", function(req, res) {
    res.redirect("/index");
});

router.post("/index", function(req, res, next) {
    if (req.body.id == null) {
        burger.create(
            ["burger_name", "devoured"],
            [req.body.burger_name, false],
            (result) => renderBurgers(res, next),
            next
        );
    } else {
        burger.update(
            {devoured: true},
            `id = ${req.body.id}`,
            (result) => renderBurgers(res, next),
            next
        );
    }
});

function renderBurgers(res, next) {
    burger.all(function(data) {
        const hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    },
    next);
}
module.exports = router;
