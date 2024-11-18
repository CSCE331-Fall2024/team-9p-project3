import React, { useState } from 'react';

function EmployeeRow({ employee }) {
    const prevID = employee.employee_id;
    const [employeeId, setEmployeeId] = useState(employee.employee_id);
    const [name, setName] = useState(employee.name);
    const [manager, setManager] = useState(employee.manager.toString());

    async function sendData(prevID, newID, name, isManager) {
        console.log(prevID)
        const response = await fetch("./pages/api/sendemployee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "prevID":prevID,
                "newID":newID,
                "name":name,
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

    return (
        <tr key={employee.employee_id}>
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
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                />
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => sendData(prevID, employeeId, name, manager)}>&#x2705;</button>
            </td>
        </tr>
    );
}

export default EmployeeRow;
