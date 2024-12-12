import { useState, useEffect } from 'react';
import { Cart } from '../objects/cartObject';
import { auth } from './api/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { deleteUser } from 'firebase/auth';

// This function implments the backend codes for the Log in Page
export default function LoginPage({ switchPage }) {
    // Declare state variables and functions to update it. 
    // The initial value of each state variables is set by useState. 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // This function implements the function of log in. 
    const handleNewLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username+"@project3.com", password);
            const user = userCredential.user;
            console.log("Loggied in: ", user);
            //determine manager/employee or invalid status here
            getUserRole();
        } catch (error) {
            console.error("Login failed: ", error.message);
        }
    }

    
        // This function gets whether the person who log in is employee or manager. 
        const getUserRole = async() => {
            /* if(username === "employee") {
                const newCart = new Cart();
                switchPage('employeeMainMenuPage', newCart);
            } */
            try{
                // Send a GET request
                const response = await fetch(`./pages/api/login?username=${username}`);
                const isValid = await response.json();
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                console.log(isValid.valid);
                console.log(isValid.manager);
                console.log(response);
                if (isValid.valid) {
                    //TODO find out if user is manager or employee and switch page accordingly
                    if(isValid.manager) {
                        switchPage('managerMainPage');
                    } else {
                        switchPage('employeeMainMenuPage', new Cart());
                    }
                    
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
            <h1 className="text-4xl font-bold text-black mb-8">Log In</h1>
            <div className="flex flex-col gap-4 w-1/3">
                <div className="h-6">
                    {error && <p className="text-red-600">{error}</p>}
                </div>                
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-4 border rounded-md focus:outline-none focus:border-red-600 text-black"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-4 border rounded-md focus:outline-none focus:border-red-600 text-black"
                />
                <button
                    onClick={handleNewLogin}
                    className="p-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Log In
                </button>
            </div>
        </div>
    );
}
