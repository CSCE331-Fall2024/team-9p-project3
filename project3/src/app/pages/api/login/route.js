import { query } from '../dbconn';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
    const username = req.nextUrl.searchParams.get('username');
    console.log(username)
    const result = await query('SELECT manager FROM employees WHERE name = $1', [username]);
    console.log('QUERY RESULT:', result.rows);
    if (result.rows.length > 0) {
        const isManager = result.rows[0].manager;
        return NextResponse.json({ valid: true, manager: isManager });
    } else {
        return NextResponse.json({ valid: false });
    }
}