USE projectboard_db;
INSERT INTO todos (task)
VALUES ("Write code");

INSERT INTO todos (task)
VALUES ("Cry");

INSERT INTO todos (task)
VALUES ("Debug");

INSERT INTO todos (task, status)
VALUES ("Sleep", 2);

INSERT INTO todos (task, status)
VALUES ("Eat", 3);

select * from todos;