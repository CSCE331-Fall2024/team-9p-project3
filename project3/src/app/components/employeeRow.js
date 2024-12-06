import React, { useState } from 'react';

function EmployeeRow({ employee, fetchData }) {
    const prevID = employee.employee_id;
    const [employeeId, setEmployeeId] = useState(employee.employee_id);
    const [name, setName] = useState(employee.name);
    const [password, setPassword] = useState(employee.password);
    const [manager, setManager] = useState(employee.manager.toString());

    async function sendData(prevID, newID, name, password, isManager) {
        const response = await fetch("./pages/api/employee/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "prevID":prevID,
                "newID":newID,
                "name":name,
                "password":password,
                "isManager":isManager
            })
        });
        if(response.ok) {
            console.log("Update Successful");
        }
        else {
            console.log("Error: ", response.status);
        }

    }

    async function deleteEntry(id, name) {
        const response = await fetch ('./pages/api/employee/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "id":id,
                "name":name
            })
        });
        fetchData();

    }

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
