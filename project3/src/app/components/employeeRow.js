import React, { useState } from 'react';

// EmployeeRow function implements the managing Employees table in the Manager view. 
function EmployeeRow({ employee, fetchData }) {
    // Get employees' id
    const prevID = employee.employee_id;

    // Declare state variables and functions to update it. 
    // The initial value of each state variables is set by useState. 
    const [employeeId, setEmployeeId] = useState(employee.employee_id);
    const [name, setName] = useState(employee.name);
    const [password, setPassword] = useState(employee.password);
    const [manager, setManager] = useState(employee.manager.toString());

    // This function sends a POST request to the specific API endpoint for adding a new employee. 
    async function sendData(prevID, newID, name, password, isManager) {

        // "./pages/api/employee/update" is the path of the API endpoint
        const response = await fetch("./pages/api/employee/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Define the request body so that the API endpoint can use the relevant value.
            body:JSON.stringify({
                "prevID":prevID,
                "newID":newID,
                "name":name,
                "password":password,
                "isManager":isManager
            })
        });
        // Check whether update the employee table successfully. 
        if(response.ok) {
            console.log("Update Successful");
        }
        else {
            console.log("Error: ", response.status);
        }

    }

    // This function sends a POST request to a different API endpoint for removing a employee. 
    async function deleteEntry(id, name) {
        // The path of this specific API endpoint
        const response = await fetch ('./pages/api/employee/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Define the request body so that the API endpoint can use the relevant value.
            body:JSON.stringify({
                "id":id,
                "name":name
            })
        });
        fetchData();

    }
    // output on the frontend employee interface page 
    return (
        <tr>
            <td className="border border-gray-400 px-4 py-2">
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                />
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <input
                    type="text"
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                />
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => sendData(prevID, employeeId, name, password, manager)}>&#x2705;</button>
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => deleteEntry(employeeId, name)}>&#10060;</button>
            </td>
        </tr>
    );
}

export default EmployeeRow;
