const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    ifeq(a, b, options) {
      console.log(a, b);
      return (a === b) ? options.fn(this) : options.inverse(this);
    },
  },
}));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
const routes = require('./controllers/todos_controller.js');

app.use(routes);

app.listen(PORT, () => {
  console.log(
    '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
    PORT,
    PORT,
  );
});
