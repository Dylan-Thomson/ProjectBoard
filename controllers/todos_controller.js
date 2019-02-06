const express = require("express");
const router = express.Router();

const todo = require("../models/todo");

router.get("/", (req, res) => {
    todo.all(data => {
        const handlebarsObj = {
            todos: data
        };
        console.log(handlebarsObj);
        res.render("index", handlebarsObj);
    });
})

module.exports = router;