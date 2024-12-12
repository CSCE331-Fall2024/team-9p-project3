import React, { useState } from 'react';

// This MenuRow function implements the managing menu items table in the Manager view. 
function MenuRow({ item, fetchData }) {
    // Declare state variables and functions to update it. 
    // The initial value of each state variables is set by useState. 
    const [itemID, setItemID] = useState(item.item_id);
    const [name, setName] = useState(item.name);
    const [inventory, setInventory] = useState(item.inventory);
    const [type, setType] = useState(item.type);
    const prevId = itemID;

    // This function sends a POST request to the specific server for updating the Menu items table on the Manager view interface.
    async function sendData() {
        // The Path of the specific server. 
        const response = await fetch("./pages/api/menu/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Define the request body so that the specific server can use the relevant value.
            body:JSON.stringify({
                "prevID":prevId,
                "newID":itemID,
                "name":name,
                "inventory":inventory,
                "type":type
            })
        });
        // Check whether the server works successfully.
        if(response.ok) {
            console.log("Update Successful");
        }
        else {
            // output the error message on the console if the server doesn't work well.
            console.error("Error: ", response.status);
        }

    }
    // This function sends a POST request to a different API endpoint for removing a Menu item.   
    async function deleteEntry(id) {
        // The path of this different server
        const response = await fetch ('./pages/api/menu/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Define the request body
            body:JSON.stringify({
                "id":id
            })
        });
        fetchData();

    }

    // display managing menu items table on the menu item interface in the Manager view  
    return (
        <tr>
            <td className="border border-gray-400 px-4 py-2">
                <input
                    type="text"
                    value={itemID}
                    onChange={(e) => setItemID(e.target.value)}
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
                    value={inventory}
                    onChange={(e) => setInventory(e.target.value)}
                />
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => sendData()}>&#x2705;</button>
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => deleteEntry(itemID)}>&#10060;</button>
            </td>
        </tr>
    );
}

export default MenuRow;
