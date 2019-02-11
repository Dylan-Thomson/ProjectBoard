DROP DATABASE IF EXISTS projectboard_db;
CREATE DATABASE projectboard_db;
USE projectboard_db;

CREATE TABLE todos (
id INT(10) NOT NULL AUTO_INCREMENT,
task VARCHAR(100) NOT NULL,
status ENUM("todo", "in-progress", "complete") DEFAULT "todo",
PRIMARY KEY(id)
);

