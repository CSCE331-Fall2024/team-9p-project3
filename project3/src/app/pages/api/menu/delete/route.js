const { query } = require('../../dbconn'); 

// This function handles the HTTP Post request, which is used for removing a Menu item. 
export async function POST(req) {
    try {
        const data = await req.json();
        // Initialize the variable
        const id = data.id;

        // Executes the Database commands using query() function. 
        // Below database SQL command is removing a menu item from the Servable_items table in the database.
        const resp = await query('DELETE FROM servable_items WHERE item_id = $1', [id]);
        console.log(resp)

        // Since it is deletion instead of selection, no return value is needed to be stored. 
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