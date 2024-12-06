const { query } = require('../../dbconn'); 
import { authAdmin } from '../../firebaseAdmin';

export async function POST(req) {
    try {
        const data = await req.json();
        const id = data.id;
        const name = data.name;

        const resp = await query('DELETE FROM employees WHERE employee_id = $1', [id]);
        console.log(resp);
        const userToDelete = authAdmin.getUserByEmail(name+"@project3.com");
        console.log("usertoDelete is: ", id);
        await authAdmin.deleteUser(String(id));

        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        console.log('Error: ', error);
    }
}