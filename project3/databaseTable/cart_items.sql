-- Cart items table
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(id),
    item_type VARCHAR(50),
    items JSONB,  -- Store the array of items 
    price NUMERIC
);