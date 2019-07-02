DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    quantity INT,
    PRIMARY KEY (id)
);

INSERT INTO items (name, quantity)
VALUES ('Partridge in a pear tree', 1), ('Maids a"milking', 6), ('gold rings', 5);

SELECT * FROM items;