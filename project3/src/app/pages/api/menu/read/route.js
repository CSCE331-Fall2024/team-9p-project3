import { query } from '../../dbconn';
import { NextRequest, NextResponse } from "next/server";

// This function handles the HTTP GET request, which is used for selecting the entire servable_items table from the database. 
export async function GET(req) {
    // Console Message
    console.log('inside handler');
    // Check if the request is GET
    if (req.method === 'GET') {
        try {   
            // Executes the Database command using query() function.
            // Below database SQL command is selecting (or reading) the entire servable_items table.
            const result = await query("SELECT * FROM servable_items"); 

            // return the selected value so that the client side can use it.
            return NextResponse.json(result.rows);
        } catch (error) {
            // Output the error message on the console if any exception above. 
            console.error('get better: error');
        }
    } else {
    }
}