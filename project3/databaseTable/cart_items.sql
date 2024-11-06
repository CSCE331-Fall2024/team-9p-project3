-- Cart items table
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(id),
    item_type VARCHAR(50),
    items TEXT[],  -- Array to store items (e.g., entree items)
    price NUMERIC
);