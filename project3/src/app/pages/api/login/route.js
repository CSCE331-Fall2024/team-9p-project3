import { query } from '../dbconn';
import { NextRequest, NextResponse } from "next/server";
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


/* export const loginUser = async (username, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        const user = userCredential.user;
        console.log("Loggied in: ", user);
        //determine manager/employee or invalid status here
    } catch (error) {
        console.error("Login failed: ", error.message);
    }
} */
export const createUser = async (email, password, role) {
    
}

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