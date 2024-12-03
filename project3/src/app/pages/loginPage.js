import { useState, useEffect } from 'react';
import { Cart } from '../objects/cartObject';
import { auth } from './api/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


export default function LoginPage({ switchPage }) {

    const handleNewLogin = async (username, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const user = userCredential.user;
            console.log("Loggied in: ", user);
            //determine manager/employee or invalid status here
        } catch (error) {
            console.error("Login failed: ", error.message);
        }
    }

    const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');

        const handleLogin = async() => {
            if(username === "employee") {
                const newCart = new Cart();
                switchPage('employeeMainMenuPage', newCart);
            }
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
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
            <h1 className="text-4xl font-bold mb-8">Log In</h1>
            <div className="flex flex-col gap-4 w-1/3">
                <div className="h-6">
                    {error && <p className="text-red-600">{error}</p>}
                </div>                
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-4 border rounded-md focus:outline-none focus:border-red-600"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-4 border rounded-md focus:outline-none focus:border-red-600"
                />
                <button
                    onClick={handleLogin}
                    className="p-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Log In
                </button>
            </div>
        </div>
    );
}
