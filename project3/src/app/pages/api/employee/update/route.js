const { query } = require('../../dbconn'); 

// This function handles the HTTP POST request, which is used for updating Employee information. 
export async function POST(req) {
    try {
        const newData = await req.json();
        // Initialize variables 
        const prevID = newData.prevID;
        const newID = newData.newID;
        const name = newData.name;
        const isManager = newData.isManager;

        // Executes the Database SQL command using query() function.
        // Below database SQL command is updating the specific attributes of a sepcific employee in the Employee table. 
        const resp = await query('UPDATE employees SET name= $1, manager = $2, employee_ID = $3 WHERE employee_ID = $4;', [name, isManager, newID, prevID]);

        // Console message
        console.log(resp)
        return new Response({
            status: 200,
            headers: { "Content-Type": "application/json" }
        });    
    }
    catch (error){
        // output error message on the console if any exception above. 
        console.log('Error: ', error);
    }
}