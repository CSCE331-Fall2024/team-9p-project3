import React, { useState } from 'react';

// This inventoryRow function implements the managing inventory items table in the Manager view. 
function InventoryRow({ item, fetchData }) {
    // Declare state variables and functions to update it. 
    // The initial value of each state variables is set by useState. 
    const [itemID, setItemID] = useState(item.item_id);
    const [name, setName] = useState(item.name);
    const [stock, setStock] = useState(item.stock);
    const prevId = itemID

    // This function sends a POST request to the specific server for updating the Inventory items table on the Manager view interface.
    async function sendData(id, name, stock) {
        // The Path of the API endpoint
        const response = await fetch("./pages/api/inventory/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Define the request body so that the specific server can use the relevant value.
            body:JSON.stringify({
                "prevId":prevId,
                "newId":id,
                "name":name,
                "stock":stock
            })
        });
        // Check whether the server works successfully. 
        if(response.ok) {
            console.log("Update Successful");
        }
        else {
            // output the error message on the console if the server doesn't work well. 
            console.log("Error: ", response.status);
        }

    }
    // This function sends a POST request to a different API endpoint for removing an inventory item. 
    async function deleteEntry(id) {
        // The path of the API endpoint (server). 
        const response = await fetch ('./pages/api/inventory/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Define the request body. 
            body:JSON.stringify({
                "id":id
            })
        });
        fetchData();

    }
    // display inventory items on the inventory interface in the Manager view      
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
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => sendData(itemID, name, stock)}>&#x2705;</button>
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => deleteEntry(itemID)}>&#10060;</button>
            </td>
        </tr>
    );
}

export default InventoryRow;
