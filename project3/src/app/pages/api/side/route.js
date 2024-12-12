import { query } from '../dbconn';
import { NextRequest, NextResponse } from "next/server";

// This function handle a HTTP GET request for select the menu items which type is side. 
export async function GET(req) {
    // Console Message
    console.log('inside handler');

    // Check whether the request is GET
    if (req.method === 'GET') {
        try {
            // Executes the Database command using query() function.
            // Below database SQL command is selecting menu items which type is side.
            const result = await query('SELECT * FROM servable_items WHERE type = 1;'); 
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