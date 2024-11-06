/**
const { query } = require('../dbconn'); 


// Manually get the max id from customer_item. Used for insertion 
async function getNextCartItemId() {
    const result = await query('SELECT MAX(item_id) FROM customer_item');
    const maxId = result.rows[0].Item_ID;
    return maxId + 1;
}
async function getNextCartOrderId() {
    const result = await query('SELECT MAX(order_id) FROM customer_orders');
    const maxId = result.rows[0].order_id; 
    return maxId + 1;
}

async function uploadCartToDatabase(cart,stringIDArray) {
    try {
      // Get the total price of the cart
      const totalPrice = cart.getCartPrice();
      const nextId = await getNextCartOrderId();
      // Begin a transaction
      await query('BEGIN');
  
      // Insert into the customer_ordres table and get the new cart ID
      const cartResult = await query(
        'INSERT INTO customer_orders (order_ID, customer_item, order_time, price) VALUES ($1, $2, $3, $4) RETURNING order_ID',
        [
            nextId,
            stringIDArray,
            null,
            totalPrice,
        ]
      );
      const cartId = cartResult.rows[0].order_id;
  
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

async function uploadCustomerItems(cart) {
    try {
      const generatedIds = []; // Array to store manually calculated cart_item IDs
  
      for (const item of cart.items) {
        // Get the next ID manually
        const nextId = await getNextCartItemId();
        
        // Get the corresponding number value related to each servable_item. 
        // A stirng array used for JSONB 
        const stringIDArray = [];

        // item.getItems return a list of strings that is servable_item names
        for (const item2 of item.getItems()) {
            const resultObject = await query('SELECT Item_ID FROM servable_items WHERE Name = $1', [item2]); //item2 should be the name of servable_item
            const servableID = resultObject.rows[0].Item_ID;
            const servableIDString = String(servableID);
            stringIDArray.push(servableIDString);
        }

        // Insert the item with the manually calculated cart_id
        await query(
          'INSERT INTO cart_items (item_ID, item_type, contains) VALUES ($1, $2, $3)',
          [
            nextId,
            item.getItemTypeAsNumber(), // The type number
            stringIDArray, // A string of servableItem_ID, such as [3,6,7,8]
          ]
        );
  
        // Push the manually assigned cart_id into the array
        generatedIds.push(nextId);
      }

      uploadCartToDatabase(cart,stringIDArray)
      
      console.log('Manually generated cart item IDs:', generatedIds);
      return generatedIds; // Return the array of generated IDs
    } catch (error) {
      console.error('Error uploading cart items:', error);
      throw error;
    }
  }



module.exports = { uploadCartToDatabase };
*/
