import { ManagerHeader } from "../../components";
import React, { useDebugValue, useState } from 'react';
import { ProductUsageChart } from "../../components";


export default function UsageChartPage({ switchPage }) {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState(null);

    const handleGoBack = () => {
        switchPage('managerMainPage'); // Redirects back to the login page
    };

    async function renderGraph() {
        console.log(startDate,endDate)
        const response = await fetch(`./pages/api/productUsage?startDate=${startDate}&endDate=${endDate}`)
        const data = await response.json()
        setData(data);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
            <ManagerHeader switchPage={switchPage}></ManagerHeader>
            <h2 className="text-3xl font-bold mb-8">Select Start and End Dates</h2>
            <div className="flex items-center space-x-6 mb-6">
                <div>
                    <label htmlFor="start-date" className="block text-sm font-medium mb-1">Start Date:</label>
                    <input 
                        type="date" 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="end-date" className="block text-sm font-medium mb-1">End Date:</label>
                    <input 
                        type="date" 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
                <div>
                <label htmlFor="end-date" className="block text-sm font-medium mb-1">&#8203; </label>
                <button className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={renderGraph}>
                    Show Product Usage
                </button>
                </div>
            </div>


            <h1 className="text-4xl font-bold mb-8">Product Usage Chart</h1>

            <ProductUsageChart data={data}></ProductUsageChart>

            <button
                onClick={handleGoBack}
                className="mt-5 p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
                Back
            </button>
        </div>
    );
}