import { useState, useEffect } from 'react';
import {EmployeeRow, ManagerHeader} from "../../components";

export default function EmployeesPage({ switchPage }) {
    const [employees, setEmployees] = useState([]); // State to store employees
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [manager, setManager] = useState('');

    const handleGoBack = () => {
        switchPage('managerMainPage'); // Redirects back to the manager main page
    };

    async function addNew() {
        try {
            const response = await fetch("./pages/api/employee/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    "newID":employeeId,
                    "name":name,
                    "password":password,
                    "isManager":manager
                })
            });
            if(response.ok) {
                console.log("Add Successful");
                fetchData();
            }
            else {
                console.log("Error: ", response.status);
            }
        }
        catch (error) {
            console.error('Error: ', error);
        }
    }


    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await fetch('./pages/api/employee/read');
            if (!res.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await res.json();
            setEmployees(data);

        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);

        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Display a loading message while fetching data
    }

    if (error) {
        return <p>Error: {error}</p>; // Display error message if fetching fails
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
            <ManagerHeader switchPage={switchPage}/>
            <h1 className="text-4xl font-bold mb-8">Employees</h1>
            {employees.length > 0 ? (
                <table className="table-auto border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">ID</th>
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            <th className="border border-gray-400 px-4 py-2">Password</th>
                            <th className="border border-gray-400 px-4 py-2">Manager Status</th>
                            <th className="border border-gray-400 px-4 py-2">Save Change</th>
                            <th className="border border-gray-400 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                                <EmployeeRow key={employee.employee_id} employee={employee} fetchData={fetchData}></EmployeeRow>
                        ))}
                        
                        
                        <tr key={-1}>
                            <td className="border border-gray-400 px-4 py-2">
                                <input
                                    type="text"
                                    className='new'
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <input
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <input
                                    type="text"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <input
                                    type="text"
                                    onChange={(e) => setManager(e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button onClick={() => addNew(employeeId, name, manager)}>&#x2705;</button>
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button>&#10060;</button>
                            </td>
                        </tr>




                    </tbody>
                </table>
            ) : (
                <p>No employees found.</p>
            )}
            <button
                onClick={handleGoBack}
                className="mt-5 p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
                Back
            </button>
        </div>
    );
}
