// import the query function from our dbconn file. 
import { query } from '../dbconn';
import { NextResponse } from "next/server";


// This function handles the HTTP Post request. 
export async function POST(req) {
    // Check if the request is POST. 
    if (req.method === 'POST') {
        try {
            // Get values from the POST request body.
            const data = await req.json()
            let items = (data.menuItems).toString()
            
            // Format the Menu items list for the database query
            items = `[${items
                .split(',')
                .map(item => `'${item.trim()}'`) // Add single quotes around each item
                .join(', ')}]`;
            
            // Executes the Database query using query() function and saves its return value to the variable called result. 
            const result = await query(`SELECT DISTINCT inventory_item
                                        FROM servable_items
                                        CROSS JOIN LATERAL jsonb_array_elements_text(inventory) AS inventory_item
                                        WHERE name = ANY (ARRAY ${items});
                                        `); 
            return NextResponse.json(result.rows);
          
        // catch the error and return the error message if any exception above. 
        } catch (error) { 
            console.error('get better:', error);
            return new Response({
                status: 500,
                headers: { "Content-Type": "application/json" }
            });          }
    } else {

    }
}