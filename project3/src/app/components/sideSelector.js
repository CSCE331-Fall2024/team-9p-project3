import { useState, useEffect } from 'react';
import { CartObject} from '../objects/cartObject';

// This function displays all sides when customers choose sides for their Bowl, Plate, and Bigger Plate. 
export default function SideSelector({ cart, switchPage, numRequired, employee=false}) {

    // Declare state variables and functions to update it. 
    // The initial value of each state variables is set by useState. 
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);

    // useEffect defines and runs a function named named fetchEntrees. 
    useEffect(() => {

        // This function sends a GET request to the server side and update the state variable with the server's return value.
        const fetchSides = async () => {
            try {
                // console message
                console.log('inside fetch entrees')

                // Sending the GET request to the server side. The path of API endpoint is './pages/api/entree'. 
                const response = await fetch('./pages/api/side');

                // console message
                console.log('after await');
                
                // Check if the server side works well
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
    
                const data = await response.json();

                // update the state variable items 
                setItems(data.rows.map(row => row.name));
                console.log(items);
                // return data.rows;
                // return items;
            } catch (error) {
                // error message if any exception above
                console.error('Fetch error:', error);
            }
        };
        console.log('about to fetch');
        fetchSides();

        
      }, []); // [] ensures that useEffect runs only once.

      // Console Message
      console.log(items);

    let numSelect = parseInt(numRequired);
    
    // The same toggleSelection function as that in AppetizerSelector.js, which implements functions of selection and deselection. 
    const toggleSelection = (item) => {

        // Deselect: 
        // If the item is already in the selectedItems list, then remove it. 
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selected => selected !== item));
        } 

        // Select:  
        // If the item isn't in the list and the list doesn't reach the max length, then add it to the list. 
        else if (selectedItems.length < numSelect) {
            setSelectedItems([...selectedItems, item]);
        }
    };
 
    const handleSelection = (item) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([item]);
        }
    };

    // handleSubmit function adds the selected entrees to customer's cart.
    const handleSubmit = () => {
        if(selectedItems.length > 0) {
            const newCartObject = new CartObject(selectedItems.at(0));
            setSelectedItems([]);
            if(employee) {
                switchPage('employeeEntreePage', numRequired, cart, newCartObject);
            } else {
                switchPage('entreePage', numRequired, cart, newCartObject);
            }
        }
    };
    // This function makes and styles buttons
    const buttonClassName = (item, selectedItems) => {
        if (selectedItems.includes(item)) {
            return "p-4 text-2xl text-white font-semibold rounded-lg transition-colors bg-red-600";
        } else {
            return "p-4 text-2xl text-black font-semibold rounded-lg transition-colors bg-white border-4 border-transparent hover:border-red-600";
        }
    };

    // This function makes and styles the button for submission. 
    const submitButtonClass = () => {
        if(selectedItems.length < 1) {
            return "mt-4 p-2 bg-gray-300 text-gray-500 text-xl rounded";
        } else {
            return "mt-4 p-2 bg-red-600 text-black text-xl rounded hover:bg-red-700 transition-colors";
        }
    }

    // Below codes display all side items and a submit button on the frontend interface page. 
    return (
        <div className="flex flex-col items-center font-semibold w-full h-full p-8">
            <div className="grid grid-cols-2 gap-10 w-full h-full">
                {items.map((item) => ( //essentially javascript equivalent of   (for item : items)
                <button key={item} className={buttonClassName(item, selectedItems)} onClick={() => handleSelection(item)}>
                    {item}
                </button>))}
            </div>
            <button
                onClick={handleSubmit}
                className={submitButtonClass()}>
                Submit 
            </button>
        </div>
  );
}
