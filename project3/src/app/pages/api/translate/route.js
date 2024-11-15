import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the request body to get text array and target language
    const { textArray, targetLang } = await req.json();

    // Replace with your actual Google Translate API key
    const API_KEY = 'AIzaSyDZz-SqUT8OkSGwn-CynD-Ked1b1YPjqkc';

    // Formulate Google Translate API URL
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    // Prepare the request payload
    const payload = {
      q: textArray,
      target: targetLang,
      format: 'text'
    };

    // Send POST request to Google Translate API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Translation failed with status ${response.status}`);
    }

    const data = await response.json();

    // Extract translated texts
    const translations = data.data.translations.map(t => t.translatedText);

    // Respond with translations
    return NextResponse.json({ translations });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
