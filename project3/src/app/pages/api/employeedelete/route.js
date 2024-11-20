const { query } = require('../dbconn'); 

export async function POST(req) {
    try {
        const data = await req.json();

        const id = data.id;

        const resp = await query('DELETE FROM employees WHERE employee_id = $1', [id]);
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