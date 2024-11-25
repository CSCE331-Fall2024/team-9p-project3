const { query } = require('../../dbconn'); 

export async function POST(req) {
    try {
        const newData = await req.json();

        const prevID = newData.prevID;
        const newID = newData.newID;
        const name = newData.name;
        const stock = newData.stock;

        const resp = await query('UPDATE inventory_items SET name= $1, stock= $2, item_ID = $3 WHERE item_ID = $4;', [name, isManager, newID, prevID]);
        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        console.log('Error: ', error);
    }
}