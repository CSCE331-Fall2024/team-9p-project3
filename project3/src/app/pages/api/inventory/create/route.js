const { query } = require('../../dbconn'); 

export async function POST(req) {
    try {
        const newData = await req.json();

        const id = newData.ID;
        const name = newData.name;
        const stock = newData.stock;

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