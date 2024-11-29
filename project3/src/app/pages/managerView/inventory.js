import { useState, useEffect } from 'react';
import { InventoryRow } from '@/app/components';
import { ManagerHeader } from '../../components';

export default function InventoryPage({ switchPage }) {

    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 
    const [ID, setID] = useState('');
    const [name, setName] = useState('');
    const [stock,setStock] = useState('');


    const handleGoBack = () => {
        switchPage('managerMainPage'); // Redirects back to the login page
    };

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await fetch('./pages/api/inventory/read');
            if (!res.ok) {
                throw new Error('Failed to fetch inventory');
            }
            const data = await res.json();
            setInventoryItems(data); // Update the inventory state

        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false after the request is complete

        }
    };


    async function addNew() {
        try {
            const response = await fetch("./pages/api/inventory/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    "ID":ID,
                    "name":name,
                    "stock":stock
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
            <h1 className="text-4xl font-bold mb-8 mt-32">Inventory</h1>
            {inventoryItems.length > 0 ? (
                <table className='table-auto border-collapse border-gray-400'>
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">ID</th>
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            <th className="border border-gray-400 px-4 py-2">Stock</th>
                            <th className="border border-gray-400 px-4 py-2">Save Change</th>
                            <th className="border border-gray-400 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryItems.map((item) => (
                            <InventoryRow key={item.item_id} item={item} fetchData={fetchData}></InventoryRow>
                        ))}

                        <tr key={-1}>
                            <td className="border border-gray-400 px-4 py-2">
                                <input
                                    type="text"
                                    className='new'
                                    onChange={(e) => setID(e.target.value)}
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
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button onClick={() => addNew()}>&#x2705;</button>
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button>&#10060;</button>
                            </td>
                        </tr>                        
                    </tbody>
                </table>
            ) : (
                <p>No items found.</p>
            )}
            <button
                onClick={handleGoBack}
                className="p-4 bg-red-500 text-white rounded-md mt-5 hover:bg-red-600"
            >
                Back
            </button>
        </div>
    );
}