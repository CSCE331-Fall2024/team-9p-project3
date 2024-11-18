import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const apiKey = process.env.OPENWEATHER_API_KEY;


    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Couldn't get weather");
        }

        const weather = await response.json();
        return NextResponse.json(weather);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message}, {status:500});
    }

}