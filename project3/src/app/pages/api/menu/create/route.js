const { query } = require('../../dbconn'); 

// This function handles the HTTP Post request, which is used for creating a new menu item.
export async function POST(req) {
    try {
        const newData = await req.json();
        // Initialize variables
        const id = newData.ID;
        const name = newData.name;
        let inventory = newData.inventory;
        const type = newData.type;

        inventory = JSON.stringify(inventory.split(',').map(item => item.trim()));

        // Executes the Database command using query() function. 
        // Below database SQL command is inserting a new menu item to the database servable_items table.
        const resp = await query('INSERT INTO servable_items (item_id, name, inventory, type) VALUES ($1, $2, $3, $4);', [id, name, inventory, type]);

        // Since this databse command is inserting to the table, no return value is needed to be stored. 
        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        // Error message if any exception above. 
        console.log('Error: ', error);
    }
}