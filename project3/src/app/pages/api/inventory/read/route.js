import { query } from '../../dbconn';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req) {
    console.log('inside handler');
    if (req.method === 'GET') {
        try {
            const result = await query("SELECT * FROM inventory_items"); 
            return NextResponse.json(result.rows);
        } catch (error) {
            console.error('get better: error');
        }
    } else {
    }
}