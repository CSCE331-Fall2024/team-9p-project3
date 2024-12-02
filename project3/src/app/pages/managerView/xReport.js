import { useEffect, useState } from "react";
import { ManagerHeader } from "../../components";

export default function XReportPage({ switchPage }) {
    const [reportData, setReportData] = useState({
        orderCount: 0,
        totalPrice: 0,
    });

    const currentDate = new Date();
    const dateFrom = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        0,
        0,
        0
    );

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
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch("./pages/api/xreport", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        dateFrom: formattedDateFrom,
                        dateTo: formattedDateTo,
                    }),
                });
                const data = await response.json();
                console.log("Data before setXreport: ", data);
                setReportData({
                    orderCount: data[0].order_count,
                    totalPrice: data[0].total_price,
                });
            } catch (error) {
                console.error("Error fetching X-report data:", error);
            }
        };

        fetchData();
    }, [formattedDateFrom, formattedDateTo]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
            <ManagerHeader switchPage={switchPage} />
            <div className="mt-16">
                <h1 className="text-4xl font-bold mb-8">X-Report</h1>

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

                <div className="w-full max-w-4xl bg-white p-4 rounded-md shadow-md">
                    <p className="text-lg">
                        <strong>Total Orders:</strong> {reportData.orderCount}
                    </p>
                    <p className="text-lg">
                        <strong>Total Price:</strong> ${reportData.totalPrice}
                    </p>
                </div>

                <button
                    onClick={() => switchPage("managerMainPage")}
                    className="p-4 mt-8 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Back
                </button>
            </div>
        </div>
    );
}



