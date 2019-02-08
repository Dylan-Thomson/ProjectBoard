DROP DATABASE IF EXISTS projectboard_db;
CREATE DATABASE projectboard_db;
USE projectboard_db;

CREATE TABLE todos (
id INT(10) NOT NULL AUTO_INCREMENT,
todo VARCHAR(100) NOT NULL,
status VARCHAR(25) DEFAULT "todo",
PRIMARY KEY(id)
);