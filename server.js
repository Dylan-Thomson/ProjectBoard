const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ 
    defaultLayout: "main",
    helpers: {
        if_equal: function(a, b, opts) {
            if(a === b) {
                return opts.fn(this)
            }
            else {
                return opts.inverse(this);
            }
        }
    } 
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/todos_Controller.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
