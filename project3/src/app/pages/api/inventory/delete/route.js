const { query } = require('../../dbconn'); 

// This function handles the HTTP Post request, which is used for removing an employee from the Inventory_items table. 
export async function POST(req) {
    try {
        const data = await req.json();
        // initialize variables
        const id = data.id;

        // Executes the Database commands using query() function. 
        // Below database SQL command is removing an inventory item from the inventory_items table in the database. 
        const resp = await query('DELETE FROM inventory_items WHERE item_id = $1', [id]);

        // Console message
        console.log(resp)
        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        console.log('Error: ', error);
    }
}