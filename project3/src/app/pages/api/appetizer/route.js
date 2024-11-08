import { query } from '../dbconn';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req) {
    console.log('inside handler');
    if (req.method === 'GET') {
        try {
            const result = await query('SELECT * FROM servable_items WHERE type = 3;'); 
            return NextResponse.json(result);
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