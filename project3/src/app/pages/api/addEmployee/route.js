const { query } = require('../dbconn'); 

export async function POST(req) {
    try {
        const newData = await req.json();

        const newID = newData.newID;
        const name = newData.name;
        const isManager = newData.isManager;

        const resp = await query('INSERT INTO employees (name, manager, employee_id) VALUES ($1, $2, $3);', [name, isManager, newID]);
        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        console.log('Error: ', error);
    }
}