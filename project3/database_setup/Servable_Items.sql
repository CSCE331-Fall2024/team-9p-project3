DROP TABLE IF EXISTS Servable_Items;

CREATE TABLE Servable_Items (
    Item_ID INT PRIMARY KEY,
    Name VARCHAR(255), 
    Inventory JSONB,
    price INT
);

INSERT INTO Servable_Items (Item_ID, Name, Inventory, price)
VALUES 
(0, 'Fried Rice', '["Rice", "Egg", "Carrot", "Onions", "Soybean"]',3), -- side
(1, 'White stream Rice', '["Rice"]',2),   -- side
(2, 'Chow Mein', '["Carrot", "Celery", "Cabbage", "Soybean"]',4), -- side
(3, 'Super Greens', '["Carrot", "Broccoli", "Cabbage", "Kalye", "Soybean"]',3), -- side
(4, 'Steamed Brown Rice', '["Rice", "Soybean"]',5), -- side??
(5, 'Honey Walnut Shrimp', '["Egg", "Shrimp", "Walnut", "Soybean"]',5), -- entree
(6, 'Broccoli Beef', '["Broccoli", "Beef", "Bean", "Cheese", "Soybean"]',5), -- entree
(7, 'Black Pepper Angus Steak', '["Broccoli", "Onions", "Pepper", "Steak", "Soybean"]',5), -- entree
(8, 'Beijing Beef', '["Bean", "Onions", "Pepper", "Beef", "Soybean"]',6), -- entree
(9, 'String Bean Chicken Breast', '["Onions", "Bean", "Soybean"]',6), -- entree
(10, 'Orange Chicken', '["Chicken", "Soybean"]',5), -- entree
(11, 'Sweet Fire Chicken Breast', '["Chicken", "Onions", "Pepper", "Soybean"]',5), -- entree
(12, 'Black Pepper Chicken', '["Chicken", "Onions", "Celery", "Pepper", "Soybean"]',5), -- entree
(13, 'Grilled Chicken', '["Chicken", "Soybean"]',5), -- entree
(14, 'Honey Sesame Chicken Breast', '["Chicken", "Bean", "Pepper"]',5), -- entree
(15, 'Kung Pao Chicken', '["Chicken", "Peanut", "Pepper", "Soybean"]',5), -- entree
(16, 'Mushroom Chicken', '["Mushroom", "Chicken", "Shrimp", "Soybean"]',5), -- entree
(17, 'Chicken Eggroll', '["Egg", "Carrot", "Chicken", "Soybean"]',6), -- app
(18, 'Cream Cheese Rangoon', '["Egg", "Onions", "Cheese"]',5), -- app
(19, 'Vegetable Spring Roll', '["Carrot", "Onions", "Celery", "Cabbage", "Soybean"]',4) -- app
;