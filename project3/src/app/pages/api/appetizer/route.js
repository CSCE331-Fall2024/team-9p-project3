// import the query function from our dbconn file. 
import { query } from '../dbconn';
import { NextRequest, NextResponse } from "next/server";

// This function handles the HTTP GET request. 
export async function GET(req) {
    // Console message. Used for checking whether get into the API endpoint sucessfully. 
    console.log('inside handler');

    // Check if the request is POST. 
    if (req.method === 'GET') {
        try {
            // Executes the Database query using query() function and saves its return value to the variable called result.
            const result = await query('SELECT * FROM servable_items WHERE type = 3;'); 
            return NextResponse.json(result);

        // catch the error and return the error message if any exception above.
        } catch (error) {
            // console.error("Query error:", error);
            // res.status(500).json({ error: 'Database query failed' });
            console.error('get better: error');
        }
    } else {
        // res.setHeader('Allow', ['GET']);
        // res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}