DROP TABLE IF EXISTS Inventory_Items;

CREATE TABLE Inventory_Items (
    Item_ID INT Primary Key,
    Name VARCHAR(50),
    Item JSONB, 
    Stock INT, 
    Price INT
);


INSERT INTO Inventory_Items (Item_ID, Name, Item, Stock, Price)
VALUES
(0,'Rice', '["Fried Rice", "White stream Rice","Steamed Brown Rice"]', 30, 1), 
(1, 'Egg', '["Fried Rice", "Honey Walnut Shrimp", "Chicken Eggroll", "Cream Cheese Rangoon"]', 30, 1), 
(2,'Carrot', '["Fried Rice", "Chow Mein", "Super Greens", "Chicken Eggroll", "Vegetable Spring Roll"]', 40, 1),
(3,'Broccoli', '["Super Greens", "Broccoli Beef", "Black Pepper Angus Steak"]', 20, 1),
(4,'Onions', '["Fried Rice", "Vegetable Spring Roll", "Beijing Beef", "Black Pepper Angus Steak", "String Bean Chicken Breast", "Sweet Fire Chicken Breast",
"Black Pepper Chicken", "Cream Cheese Rangoon"]', 34, 1),
(5,'Celery', '["Chow Mein", "Black Pepper Chicken", "Vegetable Spring Roll"]', 22, 1),
(6,'Cabbage', '["Chow Mein", "Super Greens", "Chicken Egg Roll", "Vegetable Spring Roll"]', 31, 1),
(7,'Chicken', '["Black Pepper Chicken", "Grilled Chicken", "Honey Sesame Chicken Breast", "Kung Pao Chicken", "Mushroom Chicken", 
"Original Orange Chicken", "Spring Bean Chicken Breast", "Sweet Fire Chicken Breast", "Chicken Eggroll", ""]', 29, 1),
(8,'Pepper', '["Beijing Beef", "Black Pepper Chicken", "Black Pepper Angus Steak", "Honey Sesame Chicken Breast", "Kung Pao Chicken","Sweet Fire Chicken Breast"]', 18, 1),
(9,'Steak', '["Black Pepper Angus Steak"]', 77, 1),
(10,'Shrimp', '["Honey Walnut Shrimp", "Mushroom Chicken"]', 45, 1),
(11,'Walnut', '["Honey Walnut Shrimp"]', 54, 1),
(12,'Peanut', '["Kung Pao Chicken"]', 66, 1),
(13,'Beef', '["Beijing Beef", "Broccoli Beef"]', 87, 1),
(14,'Bean', '["Beijing Beef", "Broccoli Beef", "String Bean Chicken Breast", "Honey Sesame Chicken Breast"]', 98, 1),
(15,'Kalye', '["Super Greens"]', 43, 1),
(16,'Soybean', '["Fried Rice", "Chow Mein", "Steamed Brown Rice", "Super Greens", "Beijing Beef", "Broccoli Beef", "Black Pepper Angus Steak", 
"Black Pepper Chicken", "Grilled Chicken", "Honey Walnut Shrimp", "Kung Pao Chicken", "Mushroom Chicken", "String Bean Chicken Breast", "Sweet Fire Chicken Breast",
"Chicken Eggroll", "Vegetable Spring Roll", "Apple Pie Roll"]', 23, 1),
(17,'Mushroom', '["Mushroom Chicken", "Black Pepper Angus Steak"]', 87, 1),
(18,'Cheese', '["Cream Cheese Rangoon", "Broccoli Beef"]', 11, 1),
(19,'Cup', '[]', 40, 1),
(20,'Straw', '[]', 40, 1),
(21,'Napkin', '[]', 40, 1),
(22,'Flatware', '[]', 40, 1),
(23,'To-go box', '[]', 40, 1),
(24,'Bag', '[]', 40, 1);



