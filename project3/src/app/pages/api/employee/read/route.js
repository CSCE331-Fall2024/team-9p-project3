import { query } from '../../dbconn';
import { NextRequest, NextResponse } from "next/server";

// This function handles the HTTP GET request, which is used for reading the entire Employee table. 
export async function GET(req) {
    // Console message 
    console.log('inside handler');
    // Check if the request is GET
    if (req.method === 'GET') {
        try {
            // Executes the Database query using query() function.
            // Below database SQL command is selecting (or reading) the entire Employee table. 
            const result = await query("SELECT * FROM employees"); 

            // return the value so that the client side can use it. 
            return NextResponse.json(result.rows);
        } catch (error) {
            
            // Output the error message on the console if any exception above. 
            console.error('get better: error');
        }
    } else {
    }
}