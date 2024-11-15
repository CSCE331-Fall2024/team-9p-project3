import { query } from '../dbconn';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
    const username = req.nextUrl.searchParams.get('username');
    console.log(username)
    const result = await query('SELECT COUNT(*) FROM employees WHERE name = $1', [username]);
    if (parseInt(result.rows[0].count, 10) > 0) {
        return NextResponse.json({ valid: true });
    } else {
        return NextResponse.json({ valid: false });
    }
}