-- create customers table
CREATE TABLE customers (
  id INT,
  first_name STRING,
  last_name STRING,
  address STRING,
  PRIMARY KEY (id)
);
-- insert some values
INSERT INTO customers VALUES (1, 'John', 'Doe', '32 Cherry Blvd');
INSERT INTO customers VALUES (2, 'Angela', 'Yu', '12 Sunset Drive');
-- fetch some values
SELECT * FROM customers WHERE first_name = 'John';


-- create the products table
CREATE TABLE products (
    id INT NOT NULL,
    name STRING,
    price MONEY,
    PRIMARY KEY (id)
);

--insert a product into products table
INSERT INTO products VALUES (1, 'Pen', 1.20);

-- select a product with id = 1
SELECT * FROM products WHERE id = 1;

--insert a product with no price into products table
INSERT INTO products (id, name) VALUES (2, 'Pencil');

--select a product with id = 2
SELECT * FROM products WHERE id = 2;


