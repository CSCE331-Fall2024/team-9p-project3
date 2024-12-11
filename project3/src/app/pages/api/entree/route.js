import { query } from '../dbconn';
import { NextRequest, NextResponse } from "next/server";

// This function handles the HTTP GET request, which is used for selecting all menu items from database. 
export async function GET(req) {
    // Console message. Check whether go into this server side successfully. 
    console.log('inside handler');

    // Check if the request is GET 
    if (req.method === 'GET') {
        try {
            // Executes the Database SQL command using query() function.
            // Below database SQL command is selecting all menu items (that is, type = 2).  
            const result = await query('SELECT * FROM servable_items WHERE type = 2;'); 
            return NextResponse.json(result);

        } catch (error) {
            // Error message if any exception above. 

            // console.error("Query error:", error);
            // res.status(500).json({ error: 'Database query failed' });
            console.error('get better: error');
        }
    } else {
        // res.setHeader('Allow', ['GET']);
        // res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}