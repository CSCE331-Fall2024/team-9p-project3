import { useEffect, useState } from 'react';

// This function display daily weather such as temperature. 
export default function WeatherDisplay() {

    // Declare state variables and functions to update it. 
    // The initial value of each state variables is set by useState. 
    const [temperature, setTemperature] = useState(null);
    const [iconUrl, setIconUrl] = useState(null);
    const [error, setError] = useState(null);

    // This function defines and runs fetchWeather function. 
    useEffect(() => {
        // This fetchWeather function sends a GET request to the server side
        async function fetchWeather() {
            try {
                // The Path of the specific API endpoint 
                const response = await fetch('./pages/api/weather?lat=30.628&lon=-96.3344');

                // Check whether the server side works well. 
                if (!response.ok) {
                    throw new Error(`Error fetching weather data: ${response.status}`);
                }
                const data = await response.json();

                // Extract temperature and icon code
                const tempInKelvin = data.main?.temp;
                const iconCode = data.weather?.[0]?.icon;

                if (tempInKelvin !== undefined) {
                    // Convert temperature to Fahrenheit
                    const tempInFahrenheit = (tempInKelvin - 273.15) * (9 / 5) + 32;
                    setTemperature(tempInFahrenheit.toFixed(1)); // Set temperature to one decimal place
                }
                if (iconCode) {
                    setIconUrl(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
                }
            } catch (err) {
                setError(err.message);
            }
        }

        fetchWeather();
    }, []); // [] ensures that useEffect runs only once. 

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!temperature || !iconUrl) {
        return <div>Loading weather...</div>;
    }

    return (
        <div className="flex items-center space-x-4 p-4">
            <img src={iconUrl} alt="Weather icon" className="w-12 h-12" />
            <p className="text-lg font-medium">Current Temperature: {temperature} °F</p>
        </div>
    );
}
