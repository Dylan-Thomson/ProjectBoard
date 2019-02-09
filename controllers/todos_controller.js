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
});

router.put("/api/todos/:id", (req, res) => {
    const condition = "id = " + req.params.id;

    todo.update(
        {
            // status: "'complete'"
            completed: true
        },
        condition,
        result => {
            if(result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

router.post("/api/todos", (req, res) => {
    todo.create(["task"], [req.body.todo], result => {
        res.redirect("../")
    });
});

module.exports = router;