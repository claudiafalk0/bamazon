DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL (10,2),
    quantity INT,
    PRIMARY KEY (id)
);

INSERT INTO items (name, quantity)
VALUES ('Partridge in a pear tree', 1), ('Maids a"milking', 8), ('gold rings', 5), ('swans a"swimming', 7), ('Calling birds', 4), ('French Hens', 3), ('Turtle Doves', 2), ('Geese a"laying', 6), ('Lords a"leaping', 10), ('Ladies Dancing', 9);

SELECT * FROM items;