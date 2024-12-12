const { query } = require('../../dbconn'); 

// This function handles the HTTP Post request, which is used for creating a new inventory item. 
export async function POST(req) {
    try {
        const newData = await req.json();
        // initialize variables
        const id = newData.ID;
        const name = newData.name;
        const stock = newData.stock;

        // Executes the Database command using query() function. 
        // Below database SQL command is inserting a new line to the database Inventory_items table. 
        const resp = await query('INSERT INTO inventory_items (item_id, name, stock) VALUES ($1, $2, $3);', [id, name, stock]);
        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        console.log('Error: ', error);
    }
}