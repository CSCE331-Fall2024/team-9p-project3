DROP TABLE IF EXISTS inventory_order;

CREATE TABLE inventory_order(
    order_ID INT PRIMARY KEY,
    items JSONB,
    amounts JSONB,
    date TIMESTAMPTZ
);