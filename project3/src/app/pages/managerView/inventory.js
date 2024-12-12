import { useState, useEffect } from 'react';
import { InventoryRow } from '@/app/components';
import { ManagerHeader } from '../../components';

// This function implements the backend code of managing inventory page in Manager View
export default function InventoryPage({ switchPage }) {
    // Declare state variables and functions to update it.          
    // The initial value of each state variables is set by useState.    
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 
    const [ID, setID] = useState('');
    const [name, setName] = useState('');
    const [stock,setStock] = useState('');

    // This function redirects back to the login page
    const handleGoBack = () => {
        switchPage('managerMainPage'); 
    };

    // This function sends a POST request for selecting inventory items.
    const fetchData = async () => {
        try {
            setLoading(true)
            // The Path of API endpoint
            const res = await fetch('./pages/api/inventory/read');
            if (!res.ok) {
                throw new Error('Failed to fetch inventory');
            }
            const data = await res.json();
            // Update the inventory state
            setInventoryItems(data); 
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false after the request is complete

        }
    };

    // This function implements the function of creating a new inventory item. 
    async function addNew() {
        try {
            // The Path of API endpoint. 
            const response = await fetch("./pages/api/inventory/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Define the request body so that the server side can use relevant data. 
                body:JSON.stringify({
                    "ID":ID,
                    "name":name,
                    "stock":stock
                })
            });
            // Check if the server side works well. 
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
                className="mt-5 p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
                Back
            </button>
        </div>
    );
}