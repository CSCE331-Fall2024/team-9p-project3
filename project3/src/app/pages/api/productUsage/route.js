import { stat } from 'fs';
import { query } from '../dbconn';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req) {
    if (req.method === 'GET') {
        try {
            const startDate = req.nextUrl.searchParams.get('startDate');
            const endDate = req.nextUrl.searchParams.get('endDate');


            const result = await query(`SELECT inventory_items.item AS inventory_string, COUNT(*) AS count
                                        FROM customer_orders co
                                        JOIN LATERAL jsonb_array_elements_text(co.customer_item) AS customer_items(item_id_text) ON TRUE
                                        JOIN customer_item ci ON ci.item_id = customer_items.item_id_text::INTEGER
                                        JOIN LATERAL jsonb_array_elements_text(ci.contains) AS contains_items(item_id_text) ON TRUE
                                        JOIN servable_items si ON si.item_id = contains_items.item_id_text::INTEGER
                                        JOIN LATERAL jsonb_array_elements_text(si.inventory) AS inventory_items(item) ON TRUE
                                        WHERE co.order_time BETWEEN $1 AND $2
                                        GROUP BY inventory_items.item
                                        ORDER BY count DESC;
                                        `, [startDate, endDate]); 
            return NextResponse.json(result.rows);
        } catch (error) {
            console.error('get better: error');
        }
    } else {
    }
}