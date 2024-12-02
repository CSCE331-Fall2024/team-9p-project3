// import { ManagerHeader } from "../../components";

// export default function XReportPage({ switchPage }) {
//     const handleGoBack = () => {
//         switchPage('managerMainPage'); // Redirects back to the login page
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
//             <ManagerHeader switchPage={switchPage}/>
//             <h1 className="text-4xl font-bold mb-8">X-Report</h1>
//             <button
//                 onClick={handleGoBack}
//                 className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
//             >
//                 Back
//             </button>
//         </div>
//     );
// }

import { ManagerHeader } from "../../components";

export default function XReportPage({ switchPage }) {
    const handleGoBack = () => {
        switchPage('managerMainPage'); // Redirects back to the login page
    };

    // Get current date and time
    const currentDate = new Date();

    // Calculate DATE FROM (start of the current day at 00:00:00)
    const dateFrom = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        0,
        0,
        0
    );

    // Format dates
    const formatDateTime = (date) => {
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
    };

    const formattedDateFrom = formatDateTime(dateFrom);
    const formattedDateTo = formatDateTime(currentDate);

    // Sample data for the X-Report table
    const xReportData = [
        { type: "Sales", value: "$1,500" },
        { type: "Returns", value: "$200" },
        { type: "Voids", value: "$50" },
        { type: "Discards", value: "$30" },
        { type: "Payment Methods", value: "Credit: $1,200, Cash: $300" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
            <ManagerHeader switchPage={switchPage} />
            <div className="mt-16"> {/* Added margin-top to push content down */}
                <h1 className="text-4xl font-bold mb-8">X-Report</h1>

                {/* Report Details */}
                <div className="w-full max-w-4xl bg-white p-4 rounded-md shadow-md mb-6">
                    <p className="text-lg">
                        <strong>DATE FROM:</strong> {formattedDateFrom}
                    </p>
                    <p className="text-lg">
                        <strong>DATE TO:</strong> {formattedDateTo}
                    </p>
                    <p className="text-lg">
                        <strong>GENERATED DATE:</strong> {formattedDateTo}
                    </p>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto w-full max-w-4xl">
                    <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                        <thead className="bg-gray-300">
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">Type</th>
                                <th className="border border-gray-400 px-4 py-2">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {xReportData.map((item, index) => (
                                <tr key={index} className="bg-white even:bg-gray-100">
                                    <td className="border border-gray-400 px-4 py-2">{item.type}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button
                    onClick={handleGoBack}
                    className="p-4 mt-8 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Back
                </button>
            </div>
        </div>
    );
}


