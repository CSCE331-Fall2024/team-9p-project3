import { useState, useEffect } from 'react';
// import { query } from './api/dbconn';

export default function LoginPage({ switchPage }) {
    // return(
    //     <div>
    //         <p>Hello</p>
    //     </div>
    // );
    const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');

        const handleLogin = async() => {
            try{
                const response = await fetch(`./pages/api/login?username=${username}`);
                const isValid = await response.json()
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                console.log(isValid.valid)
                if (isValid.valid) {
                    switchPage('managerMainPage');
                } else {
                    setError('Invalid username or Password');
                }
            }
            catch (error){
                console.error('Error in fetch:', error)
            }
        };



    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Login</h1>
            <div className="flex flex-col gap-4 w-1/3">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-4 border rounded-md focus:outline-none focus:border-red-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-4 border rounded-md focus:outline-none focus:border-red-500"
                />
                <button
                    onClick={handleLogin}
                    className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Log In
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
}
