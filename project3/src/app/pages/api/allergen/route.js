import { query } from '../dbconn';
import { NextResponse } from "next/server";


export async function POST(req) {
    if (req.method === 'POST') {
        try {
            const data = await req.json()
            let items = (data.menuItems).toString()
            items = `[${items
                .split(',')
                .map(item => `'${item.trim()}'`) // Add single quotes around each item
                .join(', ')}]`;
    
            const result = await query(`SELECT DISTINCT inventory_item
                                        FROM servable_items
                                        CROSS JOIN LATERAL jsonb_array_elements_text(inventory) AS inventory_item
                                        WHERE name = ANY (ARRAY ${items});
                                        `); 
            return NextResponse.json(result.rows);
        } catch (error) {
            console.error('get better:', error);
            return new Response({
                status: 500,
                headers: { "Content-Type": "application/json" }
            });          }
    } else {

    }
}