DROP TABLE IF EXISTS Menu_Items;

CREATE TABLE Menu_Items (
    Item_ID INT Primary Key,
    Type VARCHAR(100),
    Price INT
);

INSERT INTO Menu_Items (Item_ID, Type, Price)
VALUES
(0,'Bowl', 9),
(1,'Plate', 11),
(2,'Bigger Plate', 13), 
(3,'Appetizers', 2); 