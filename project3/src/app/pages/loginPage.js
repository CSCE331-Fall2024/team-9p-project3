import { useState } from 'react';

export default function LoginPage({ switchPage }) {

    const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username === 'manager') {
            switchPage('managerMainPage');
        } else {
            setError('Invalid username or Password');
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
