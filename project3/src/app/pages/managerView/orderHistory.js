export default function OrderHistoryPage({ switchPage }) {
    const handleGoBack = () => {
        switchPage('managerMainPage'); // Redirects back to the login page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">OrderHistory</h1>
            <button
                onClick={handleGoBack}
                className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
                Back
            </button>
        </div>
    );
}