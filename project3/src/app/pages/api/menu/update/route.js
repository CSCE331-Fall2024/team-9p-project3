const { query } = require('../../dbconn'); 

export async function POST(req) {
    try {
        const newData = await req.json();

        const prevID = newData.prevID;
        const newID = newData.newID;
        const name = newData.name;
        let inventory = newData.inventory;
        const type = newData.type;

        inventory = inventory.toString()
        inventory = JSON.stringify(inventory.split(',').map(item => item.trim()));
 
        console.log(prevID, newID, name, inventory, type)
        const resp = await query('UPDATE servable_items SET name= $1, inventory= $2, item_ID = $3, type = $5 WHERE item_ID = $4;', [name, inventory, newID, prevID, type]);
        console.log(resp);
        return new Response({
            status: resp.status,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        console.log('Error: ', error);
    }
}