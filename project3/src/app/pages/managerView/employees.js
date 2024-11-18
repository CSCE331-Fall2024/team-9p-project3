import { useState, useEffect } from 'react';

export default function EmployeesPage({ switchPage }) {
    const [employees, setEmployees] = useState([]); // State to store employees
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

    const handleGoBack = () => {
        switchPage('managerMainPage'); // Redirects back to the manager main page
    };

    useEffect(() => {
        // Fetch data from the API when the component loads
        const fetchData = async () => {
            try {
                const res = await fetch('./pages/api/getemployee');
                if (!res.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await res.json();
                setEmployees(data); // Update the employees state
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setLoading(false); // Set loading to false after the request is complete
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Display a loading message while fetching data
    }

    if (error) {
        return <p>Error: {error}</p>; // Display error message if fetching fails
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Employees</h1>
            {employees.length > 0 ? (
                <table className="table-auto border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">ID</th>
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            <th className="border border-gray-400 px-4 py-2">Manager Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.employee_id}>
                                <td className="border border-gray-400 px-4 py-2">{employee.employee_id}</td>
                                <td className="border border-gray-400 px-4 py-2">{employee.name}</td>
                                <td className="border border-gray-400 px-4 py-2">{employee.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No employees found.</p>
            )}
            <button
                onClick={handleGoBack}
                className="mt-4 p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
                Back
            </button>
        </div>
    );
}
