const { query } = require('../../dbconn'); 

// This function handles the HTTP POST request, which is used for updating inventory item information. 
export async function POST(req) {
    try {
        const newData = await req.json();
        // Initialize variables
        const prevID = newData.prevID;
        const newID = newData.newID;
        const name = newData.name;
        const stock = newData.stock;

        // Executes the Database SQL command using query() function.
        // Below database SQL command is updating the specific attributes of a sepcific inventory item in the Inventory_items table. 
        const resp = await query('UPDATE inventory_items SET name= $1, stock= $2, item_ID = $3 WHERE item_ID = $4;', [name, stock, newID, prevID]);

        // Since it is updating the database table, no return value is need to be stored. 
        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){

        // output error message on the console if any exception above. 
        console.log('Error: ', error);
    }
}