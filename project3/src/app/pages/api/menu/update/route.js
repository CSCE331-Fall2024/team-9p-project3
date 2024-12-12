const { query } = require('../../dbconn'); 

// This function handles the HTTP POST request, which is used for updating inventory item information. 
export async function POST(req) {
    try {
        const newData = await req.json();
        // Initialize variables
        const prevID = newData.prevID;
        const newID = newData.newID;
        const name = newData.name;
        let inventory = newData.inventory;
        const type = newData.type;

        inventory = inventory.toString()
        // Format the string variable correctly so that it can be used in the database query. 
        inventory = JSON.stringify(inventory.split(',').map(item => item.trim()));
        
        // Console message
        console.log(prevID, newID, name, inventory, type)

        // Executes the Database SQL command using query() function.
        // Below database SQL command is updating the specific attributes of a sepcific menu item in the servable_items table. 
        const resp = await query('UPDATE servable_items SET name= $1, inventory= $2, item_ID = $3, type = $5 WHERE item_ID = $4;', [name, inventory, newID, prevID, type]);
        console.log(resp);

        // Since it updates instead of selects, no return value is needed to be stored. 
        return new Response({
            status: resp.status,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        // Error message if any exception above. 
        console.log('Error: ', error);
    }
}