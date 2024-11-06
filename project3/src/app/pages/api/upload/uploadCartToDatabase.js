const { query } = require('../dbconn'); 

async function uploadCartToDatabase(cart) {
  try {
    // Get the total price of the cart
    const totalPrice = cart.getCartPrice();

    // Begin a transaction
    await query('BEGIN');

    // Insert into the carts table and get the new cart ID
    const cartResult = await query(
      'INSERT INTO carts (total_price) VALUES ($1) RETURNING id',
      [totalPrice]
    );
    const cartId = cartResult.rows[0].id;

    // Insert each item in the cart_items table
    for (const item of cart.items) {
      await query(
        `INSERT INTO cart_items (cart_id, item_type, items, price)
         VALUES ($1, $2, $3, $4)`,
        [
          cartId,
          item.getItemType(),
          item.getItems(), // Assuming this returns an array of strings
          item.getPrice(),
        ]
      );
    }

    // Commit the transaction
    await query('COMMIT');
    console.log('Cart uploaded successfully with ID:', cartId);
    return { cartId };
  } catch (error) {
    // Roll back if there’s an error
    await query('ROLLBACK');
    console.error('Error uploading cart:', error);
    throw error;
  }
}

module.exports = { uploadCartToDatabase };
