const { query } = require('../../dbconn'); 
import { authAdmin } from '../../firebaseAdmin';

// This function handles the HTTP Post request, which is used for creating a new employee. 
export async function POST(req) {
    try {
        const newData = await req.json();

        const newID = newData.newID;
        const name = newData.name;
        const isManager = newData.isManager;
        const password = newData.password;

        // Executes the Database query using query() function. 
        // Below database SQL command is inserting a new line to the Employees table.  
        const resp = await query('INSERT INTO employees (name, manager, employee_id) VALUES ($1, $2, $3);', [name, isManager, newID]);

        const email = `${name}@project3.com`; // constructed email
        //const password = 'Password'; // Defualt password
        await authAdmin.createUser({
            uid: newID,
            email: email,
            password: password,
        });

        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        console.log('Error: ', error);
    }
}