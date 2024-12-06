import { ManagerHeader } from "../../components";
import { Cart } from "@/app/objects/cartObject";

export default function ManagerMainPage({ switchPage }) {
    const handleGoBack = () => {
        switchPage('loginPage'); // Redirects back to the login page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
            <ManagerHeader switchPage={switchPage}/>
            {/* <h1 className="text-4xl font-bold mb-8">Manager View</h1> */}
            
            <div className="flex flex-col gap-4 w-1/2">
                <button
                    onClick={() => switchPage('employeesPage')}
                    className="p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                    Employees
                </button>
                
                <button
                    onClick={() => switchPage('menuItemsPage')}
                    className="p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                    Menu Items
                </button>
                
                <button
                    onClick={() => switchPage('inventoryPage')}
                    className="p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                    Inventory
                </button>
                
                <button
                    onClick={() => switchPage('xReportPage')}
                    className="p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                    X Report
                </button>
                
                <button
                    onClick={() => switchPage('zReportPage')}
                    className="p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                    Z Report
                </button>
                
                <button
                    onClick={() => switchPage('usageChartPage')}
                    className="p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                    Product Usage Chart
                </button>

                <button
                    onClick={() => switchPage('employeeMainMenuPage', new Cart())}
                    className="p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                    Switch to Employee View
                </button>

            </div>
        </div>
    );
}
