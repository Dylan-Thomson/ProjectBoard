const express = require('express');

const router = express.Router();

const todo = require('../models/todo');

router.get('/', (req, res) => {
  todo.all((data) => {
    const handlebarsObj = {
      todos: data,
    };
    res.render('index', handlebarsObj);
  });
});

router.get('/api/todos/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;
  todo.selectOne(condition, (result) => {
    res.json(result);
  });
});

router.put('/api/todos/:id/:status', (req, res) => {
  const condition = `id = ${req.params.id}`;

  todo.update(
    {
      status: `'${req.params.status}'`,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      return res.status(200).end();
    },
  );
});

router.post('/api/todos', (req, res) => {
  todo.create(['task', 'status'], [req.body.task, req.body.status], () => {
    res.redirect('../');
  });
});

module.exports = router;
