import { query } from '../dbconn';
import { NextRequest, NextResponse } from "next/server";


// export default async function handler(req, res) {
//     console.log('inside handler');
//     if (req.method === 'GET') {
//         try {
//             const result = await query('SELECT * FROM servable_items WHERE type = 2;'); 
//             res.status(200).json(result.rows); 
//         } catch (error) {
//             console.error("Query error:", error);
//             res.status(500).json({ error: 'Database query failed' });
//         }
//     } else {
//         res.setHeader('Allow', ['GET']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

export async function GET(req) {
    console.log('inside handler');
    if (req.method === 'GET') {
        try {
            const result = await query('SELECT * FROM servable_items WHERE type = 2;'); 
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