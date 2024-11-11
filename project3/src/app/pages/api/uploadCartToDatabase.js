const { query } = require('./dbconn'); 


// Manually get the max id from customer_item. Used for insertion 
async function getNextCartItemId() {
    const result = await query('SELECT MAX(item_id) FROM customer_item');
    console.log("getNextCartItemId result: ", result.rows[0]);
    const maxId = result.rows[0].max;
    return maxId + 1;
}
async function getNextCartOrderId() {
    const result = await query('SELECT MAX(order_id) FROM customer_orders');
    const maxId = result.rows[0].max; 
    return maxId + 1;
}

async function uploadCartToDatabase(cart,allStringIDArray) {
    try {
      // Get the total price of the cart
      const totalPrice = cart.getCartPrice();
      const nextId = await getNextCartOrderId();
      // Begin a transaction
      await query('BEGIN');

      console.log("nextId:", nextId);
      console.log("customer_item:", allStringIDArray);  // Replace with actual variable for customer_item
      console.log("order_time:", null);        // Replace with actual variable for order_time
      console.log("price:", totalPrice);                  // Replace with actual variable for price

      const validAllStringIDArray = JSON.stringify(allStringIDArray);
  
      // Insert into the customer_ordres table and get the new cart ID
      const cartResult = await query(
        'INSERT INTO customer_orders (order_ID, customer_item, order_time, price) VALUES ($1, $2, $3, $4) RETURNING order_ID',
        [
            nextId,
            validAllStringIDArray,
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
      const allStringIDArray = [];
      for (const item of cart.items) {
        // Get the next ID manually
        const nextId = await getNextCartItemId();
        
        // Get the corresponding number value related to each servable_item. 
        // A stirng array used for JSONB 
        const stringIDArray = [];

        // item.getItems return a list of strings that is servable_item names
        console.log("item.getItems():", item.getItems());
        for (const item2 of item.getItems()) { 
          if(item2){
            console.log("Looking up Item_ID for sideOrAppetizer:", item2);
            //item2 should be the name of servable_item
            const resultObject = await query('SELECT Item_ID FROM servable_items WHERE Name = $1', [item2]); 
            if (resultObject.rows.length === 0) {
              console.error(`No matching Item_ID found for Name: ${item2}`);
              continue; // Skip to the next item2 if no match is found
            }else{
              console.log("resultObject:", resultObject.rows[0]);
              const servableID = resultObject.rows[0].item_id;
              const servableIDString = String(servableID);
              stringIDArray.push(servableIDString);
              allStringIDArray.push(servableIDString); 
            }
          }
        }
        console.log("allStringIDArray", allStringIDArray);
        // Insert the item with the manually calculated cart_id
        console.log("nextId: ", nextId);
        const validStringIDArray = JSON.stringify(stringIDArray);
        await query(
          'INSERT INTO customer_item (item_ID, item_type, contains) VALUES ($1, $2, $3)',
          [
            nextId,
            item.getItemTypeAsNumber(), // The type number
            validStringIDArray, // A string of servableItem_ID, such as [3,6,7,8]
          ]
        );
        
        // Push the manually assigned cart_id into the array
        generatedIds.push(nextId);
      }

      uploadCartToDatabase(cart,allStringIDArray);
      
      console.log('Manually generated cart item IDs:', generatedIds);
      return generatedIds; // Return the array of generated IDs
    } catch (error) {
      console.error('Error uploading cart items:', error);
      throw error;
    }
  }



module.exports = { uploadCustomerItems };

