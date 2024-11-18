const { query } = require('../dbconn'); 

export async function POST(req) {
    try {
        const newData = await req.json();

        const prevID = newData.prevID;
        const newID = newData.newID;
        const name = newData.name;
        const isManager = newData.isManager;

        const resp = await query('UPDATE employees SET name= $1, manager = $2, employee_ID = $3 WHERE employee_ID = $4;', [name, isManager, newID, prevID]);
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