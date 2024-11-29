import Image from 'next/image';

export default function ManagerHeader({ switchPage }) {

    const handleGoBack = () => {
        switchPage('loginPage'); // Redirects back to the login page
    };

    return (
        <header className="flex justify-between items-center h-32 bg-red-600 text-white px-6 fixed top-0 left-0 w-full z-50">
            {/* Left side: Logo and title */}
            <div className="flex items-center">
                <Image 
                    src="/PELogo.png" 
                    alt="Panda Express Logo" 
                    width={80} 
                    height={80} 
                    className="mr-4"
                />
                <h1 className="text-2xl text-white font-semibold ml-5">
                    Manager View
                </h1>
            </div>

            {/* Right side: Manager View */}
            <button 
                onClick={handleGoBack} 
                className="bg-red-600 text-white font-semibold py-3 px-4 rounded-lg border-2 border-white hover:bg-red-700"
            >
                Back to Log In
            </button>
            {/* <h2 className="text-lg font-semibold">
                Manager View
            </h2> */}
        </header>
    );
}