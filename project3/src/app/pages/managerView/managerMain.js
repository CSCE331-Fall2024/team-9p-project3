export default function ManagerMainPage({ switchPage }) {
    const handleGoBack = () => {
        switchPage('loginPage'); // Redirects back to the login page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Manager View</h1>
            
            <div className="flex flex-col gap-4 w-1/2">
                <button
                    onClick={() => switchPage('employeesPage')}
                    className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Employees
                </button>
                
                <button
                    onClick={() => switchPage('menuItemsPage')}
                    className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Menu Items
                </button>
                
                <button
                    onClick={() => switchPage('inventoryPage')}
                    className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Inventory
                </button>
                
                <button
                    onClick={() => switchPage('orderHistoryPage')}
                    className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Order History
                </button>
                
                <button
                    onClick={() => switchPage('xReportPage')}
                    className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    X Report
                </button>
                
                <button
                    onClick={() => switchPage('zReportPage')}
                    className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Z Report
                </button>
                
                <button
                    onClick={() => switchPage('usageChartPage')}
                    className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Usage Chart
                </button>

                <button
                    onClick={handleGoBack}
                    className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600 mt-9"
                >
                    Go Back to Login
                </button>
            </div>
        </div>
    );
}
