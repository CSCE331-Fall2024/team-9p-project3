const { query } = require('../../dbconn'); 

export async function POST(req) {
    try {
        const newData = await req.json();

        const id = newData.ID;
        const name = newData.name;
        let inventory = newData.inventory;
        const type = newData.type;

        inventory = JSON.stringify(inventory.split(',').map(item => item.trim()));

        const resp = await query('INSERT INTO servable_items (item_id, name, inventory, type) VALUES ($1, $2, $3, $4);', [id, name, inventory, type]);
        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        console.log('Error: ', error);
    }
}