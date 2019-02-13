# ProjectBoard

## Task Management For Group Projects

[Live Site](https://lit-fjord-11882.herokuapp.com/)

ProjectBoard is a fullstack task management web application inspired by [Trello](https://trello.com/). Users can view, create, and update tasks, which are stored in a MySQL database. Tasks can be updated by dragging them to the desired category (such as In Progress) or by interacting with the `View Task` modal. Clicking `Add A Task` opens another modal prompting the user to submit a new task to the database. 

This application was built using the [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern. `/models/todo.js` acts as the Model and deals with the MySQL database using a simple [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) written as part of this project. The View consists of [Handlebars](https://www.npmjs.com/package/handlebars) and other static content being served in the public directory. Finally, `controllers/todos_controller.js` serves as the Controller, handling various routes for serving pages and interfacing with the backend API via the View, while talking to the Model in order to get data. 

## Packages used: 
* [express](https://www.npmjs.com/package/express) - Web Server
* [mysql](https://www.npmjs.com/package/mysql) - Connecting to and interacting with the MySQL database
* [express-handlebars](https://www.npmjs.com/package/express-handlebars) - Generating HTML pages
* [dotenv](https://www.npmjs.com/package/dotenv) - Create an environment variable for hiding sensitive data

## Libraries/Frameworks used:
* [Bootstrap](https://getbootstrap.com/) - CSS and Modals
* [jQuery](https://jquery.com/) - DOM manipulation and AJAX
* [jQuery UI](https://jqueryui.com/) - Drag and Drop functionality
* [jQuery touch-punch](http://touchpunch.furf.com/) - Enables Drag and Drop to work on mobile
* [Font Awesome](https://fontawesome.com/) - Icons

## Challenges
The main challenge was separating the logic according to the MVC pattern. Understanding the roles of each component in a Model-View-Controller was crucial for completing this project.

Another challenge involved redefining the schema in order to support multiple states for tasks ("To Do", "In Progress", "Complete") rather than simple "To Do" and "Complete". I had a number of ideas but after some research I decided to use an ENUM column to handle this. I also had to create a custom helper function for Handlebars to filter tasks based on this ENUM value, as Handlebars does not seem to have an `IF EQUAL TO` expression built in. I'm considering moving the logic that separates tasks by status to the backend instead of the frontend in the future.

Finally, I had a bit of trouble deploying to Heroku. While my application worked fine on the local server hosted on my Windows machine, it initially crashed and burned whenever I tried to run it on the Heroku server. After some hair pulling, I realized that my `server.js` file was importing `todos_Controller.js` rather than `todos_controller.js`. Windows files are not case sensitive, which is why the application was working on my local server, but Heroku is run on Linux, which does care about letter casing in file names. In the end I learned a little about the differences between these two operating systems as well as how to remotely run bash commands on a Heroku server.

## Potential Changes
* Support user accounts with multiple project boards. Currently there is only one table shared across the entire application.
* Much more data for tasks, such as who created the task, who is working on it, who completed it, etc. 
* Incorporate [Sequelize](http://docs.sequelizejs.com/) to take the place of our simple custom ORM.
* Append tasks based on their index to containers of web page. This would reduce the need to refresh the page, which always does a GET request to get all table data.
* Update page whenever the table is updated. If multiple clients are using the table, the web page might not reflect the state of the database.
* Tweaks for dragging and dropping tasks, especially on mobile.
* Look into sanitizing user input. Sequelize would help with this.
* Allow user to delete tasks, update more than just the status, etc.

## How To Clone
* Open terminal to directory you wish to clone into and run `git clone https://github.com/Dylan-Thomson/ProjectBoard.git`
* Install modules by running `npm install`
* Create a MySQL database using `schema.sql` using MySQL workbench or another tool of your choice
* Go into `connection.js` and enter the relevant information for connecting to your database
* Run the application by entering `node server.js` into your terminal
* Open browser and type `localhost:3000` (or whatever port number you are using)
