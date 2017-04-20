CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INTEGER (255) NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DECIMAL (10, 2) NOT NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (item_id)
)

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES	(1, "Alfa Networking Card", "Electronics", 35.00, 50),
	(2, "LED Case Fans", "Electronics", 15.00, 50),
        (3, "Wired Mouse", "Electronics", 10.00, 50), 
        (4, "Chroma Keyboard", "Electronics", 80.00, 50), 
        (5, "Filet - 8oz", "Cooking", 20.00, 50), 
        (6, "Potatoes - 2lb Bag", "Cooking", 6.00, 50), 
        (7, "Assorted Veggies - 8oz Bag", "Cooking", 5.00, 50), 
        (8, "Single Barrel Whiskey - Bottle", "Alcohol", 50.00, 50), 
        (9, "Beer - 12pack", "Alcohol", 12.00, 50), 
        (10, "Great Night", "Other", 1.00, 1),
        
SELECT * FROM products;