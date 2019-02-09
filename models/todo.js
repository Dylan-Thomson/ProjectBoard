const orm = require("../config/orm");

const todo = {
    all: callback => {
        orm.selectAll("todos", result => {
            callback(result);
        });
    },
    create: (cols, vals, callback) => {
        orm.insertOne("todos", cols, vals, result => {
            callback(result);
        });
    },
    update: (objColVals, condition, callback) => {
        orm.updateOne("todos", objColVals, condition, result => {
            callback(result);
        });
    }
}

function test() {
    todo.all(result => {
        console.log(result);
    });
    todo.create(["task"], ["Sleep"], result => {
        console.log(result);
    });
    todo.all(result => {
        console.log(result);
    });
    todo.update({task: "Cook dinner"}, "id = 4", result => {
        console.log(result);
    })
    todo.all(result => {
        console.log(result);
    });
}


module.exports = todo;