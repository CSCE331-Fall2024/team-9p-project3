const { query } = require('../../dbconn'); 
import { authAdmin } from '../../firebaseAdmin';

// This function handles the HTTP Post request, which is used for removing an employee from the Employee table. 
export async function POST(req) {
    try {
        // Initialize variables
        const data = await req.json();
        const id = data.id;
        const name = data.name;

        // Executes the Database query using query() function.
        // Below database SQL command is removing a specific line from the Employee table.  
        const resp = await query('DELETE FROM employees WHERE employee_id = $1', [id]);

        // console message. Used for checking the result of database query. 
        console.log(resp);

        const userToDelete = authAdmin.getUserByEmail(name+"@project3.com");

        // console message
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