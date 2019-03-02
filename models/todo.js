const orm = require('../config/orm');

const todo = {
  all: (callback) => {
    orm.selectAll('todos', (result) => {
      callback(result);
    });
  },
  selectOne: (condition, callback) => {
    orm.selectOne('todos', condition, (result) => {
      callback(result);
    });
  },
  create: (cols, vals, callback) => {
    orm.insertOne('todos', cols, vals, (result) => {
      callback(result);
    });
  },
  update: (objColVals, condition, callback) => {
    orm.updateOne('todos', objColVals, condition, (result) => {
      callback(result);
    });
  },
};

module.exports = todo;
