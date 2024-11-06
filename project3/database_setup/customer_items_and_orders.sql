DROP TABLE IF EXISTS customer_orders;

CREATE TABLE customer_orders(
    order_ID INT,
    customer_item JSONB,
    order_time TIMESTAMPTZ,
    price DECIMAL(10,2)
);

DROP TABLE IF EXISTS customer_item;

CREATE TABLE customer_item(
    item_ID INT,
    item_type VARCHAR(50),
    contains JSONB  -- Reference to servable items
);
