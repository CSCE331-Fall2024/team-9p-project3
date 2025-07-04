import { useEffect, useState } from "react";
import { ManagerHeader } from "../../components";

// This function implements the backend code for Z report. 
export default function XReportPage({ switchPage }) {
    const [reportData, setReportData] = useState({
        total: { orderCount: 0, totalPrice: 0 },
        hourly: [],
    });
    const [dateFrom, setDateFrom] = useState("");
    const [loading, setLoading] = useState(true); // New loading state

    // Generate the current time
    const currentDate = new Date();
        // This function format the time display such as time zones and digits number. 
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("./pages/api/zreport", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        dateTo: formattedDateTo,
                    }),
                });
                const data = await response.json();

                setReportData({
                    total: {
                        orderCount: Number(data.total.order_count), // Ensure it's a number
                        totalPrice: parseFloat(data.total.total_price), // Ensure it's a float
                    },
                    hourly: data.hourly.map((hour) => ({
                        ...hour,
                        order_count: Number(hour.order_count), // Ensure it's a number
                        total_price: parseFloat(hour.total_price), // Ensure it's a float
                    })),
                });
                setDateFrom(data.dateFrom);
            } catch (error) {
                console.error("Error fetching X-report data:", error);
            }finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
            <ManagerHeader switchPage={switchPage} />
            <div className="mt-16 flex w-full max-w-4xl">
                {/* Left Section */}
                <div className="flex-1 pr-8">
                    <h1 className="text-4xl font-bold mb-8 text-left">Z-Report</h1>
                    <div className="bg-white p-4 rounded-md shadow-md mb-6">
                        <p className="text-lg">
                        <strong>DATE FROM:</strong>{" "}
                            {loading ? "Loading..." : new Date(dateFrom).toLocaleString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                            })}
                        </p>
                        <p className="text-lg">
                            <strong>DATE TO:</strong> {formattedDateTo}
                        </p>
                        <p className="text-lg">
                            <strong>GENERATED DATE:</strong> {formattedDateTo}
                        </p>
                    </div>
                </div>
    
                {/* Center Section */}
                <div className="flex-1">
                    {/* Total Orders and Price */}
                    <div className="bg-white p-4 rounded-md shadow-md mb-6 text-center">
                        <p className="text-lg">
                            <strong>Total Orders:</strong> {reportData.total.orderCount}
                        </p>
                        <p className="text-lg">
                            <strong>Total Price:</strong> ${reportData.total.totalPrice?.toFixed(2)}
                        </p>
                    </div>
    
                    {/* Hourly Breakdown */}
                    <div className="bg-white p-4 rounded-md shadow-md text-center">
                        <h2 className="text-xl font-semibold mb-4">Hourly Breakdown</h2>
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Hour</th>
                                    <th className="border border-gray-300 px-4 py-2">Orders</th>
                                    <th className="border border-gray-300 px-4 py-2">Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.hourly.map((hour, index) => {
                                    const startHour = hour.hour;
    
                                    const endHour = new Date(startHour);
                                    endHour.setUTCHours(endHour.getUTCHours() + 1);
                                    const endHourISO = endHour.toISOString();
    
                                    const currentTime = new Date();
                                    const currentTimeString = currentTime.toLocaleString("en-US", {
                                        hour12: false, // Use 24-hour format
                                    });
    
                                    const stringpart = ".000Z";
                                    const currentTimeString2 =
                                        endHourISO.substring(0, 11) +
                                        currentTimeString.substring(11, 20) +
                                        stringpart;
    
                                    const adjustedEndHour = currentTimeString2;
    
                                    return (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {new Date(dateFrom).toLocaleString("en-US",{hour12: false,}).substring(11,19)} to{" "}
                                                {adjustedEndHour.substring(11, 19)}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {hour.order_count}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                ${hour.total_price.toFixed(2)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button
                onClick={() => switchPage("managerMainPage")}
                className="mt-5 p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
                Back
            </button>
        </div>
    );
}

