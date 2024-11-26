import React, { useState } from 'react';

function MenuRow({ item, fetchData }) {
    const [itemID, setItemID] = useState(item.item_id);
    const [name, setName] = useState(item.name);
    const [inventory, setInventory] = useState(item.inventory);
    const [type, setType] = useState(item.type);
    const prevId = itemID;

    async function sendData() {
        const response = await fetch("./pages/api/menu/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "prevID":prevId,
                "newID":itemID,
                "name":name,
                "inventory":inventory,
                "type":type
            })
        });
        if(response.ok) {
            console.log("Update Successful");
        }
        else {
            console.error("Error: ", response.status);
        }

    }

    async function deleteEntry(id) {
        const response = await fetch ('./pages/api/menu/delete', {
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
