export default function LoginPage({ switchPage }) {
    const handleLogin = () => {
        // You could add login logic here (authentication, form validation, etc.)
        switchPage('customerStartPage'); // Redirects after login
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Login</h1>
            <div className="flex flex-col gap-4 w-1/3">
                <input
                    type="text"
                    placeholder="Username"
                    className="p-4 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-4 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleLogin}
                    className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Log In
                </button>
            </div>
        </div>
    );
}
