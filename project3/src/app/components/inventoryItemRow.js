import React, { useState } from 'react';

function InventoryRow({ item, fetchData }) {
    const [itemID, setItemID] = useState(item.item_id);
    const [name, setName] = useState(item.name);
    const [stock, setStock] = useState(item.stock);
    const prevId = itemID

    async function sendData(id, name, stock) {
        const response = await fetch("./pages/api/inventory/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "prevId":prevId,
                "newId":id,
                "name":name,
                "stock":stock
            })
        });
        if(response.ok) {
            console.log("Update Successful");
        }
        else {
            console.log("Error: ", response.status);
        }

    }

    async function deleteEntry(id) {
        const response = await fetch ('./pages/api/inventory/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "id":id
            })
        });
        fetchData();

    }

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
