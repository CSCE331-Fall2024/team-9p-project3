import { useState, useEffect } from 'react';
import { CartObject} from '../objects/cartObject';

// Defines a React component called AppetizerSelector. 
// Used for showing appetizers in Appetizer select page. 
export default function AppetizerSelector({ cart, switchPage, numRequired, employee=false}) {

    // Declare state variables and functions to update it. 
    // The initial value of each state variables is set by useState. 
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);

    // useEffect defines and runs a function named fetchApps. 
    useEffect(() => {
        // This fetchApps function sends a GET request, get the return value from the server, and update the state variable named items. 
        const fetchApps = async () => {
            try {
                // Console message. Used for checking whether sending the request is successful. 
                console.log('inside fetch entrees')

                // Send the GET request to this API endpoint and save the return value to the variable called response. 
                const response = await fetch('./pages/api/appetizer');

                // Console message
                console.log('after await');
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
    
                const data = await response.json();

                // Update the state variable items. 
                setItems(data.rows.map(row => row.name));
                console.log(items);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        console.log('about to fetch');
        
        // run above fetchApps function
        fetchApps();

        
      }, []); // [] ensures that useEffect runs only once. 
      console.log(items);

    let numSelect = parseInt(numRequired);

    // toggleSelection function implements select and deselect functions when customers select appetizers in the Appetizer interface. 
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

    // handleSelection function replaces the entire selectedItems list with the argument item. 
    const handleSelection = (item) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([item]);
        }
    };

    // handleSubmit function adds the selected Appetizer to customer's cart. 
    const handleSubmit = () => {
        const newCartObject = new CartObject(selectedItems.at(0));
        cart.addItem(newCartObject)
        setSelectedItems([]);
        if(employee) {
            switchPage('employeeMainMenuPage', cart);
        } else {
            switchPage('customerMainMenuPage', cart);
        }
    };

    // This function makes and styles buttons
    const buttonClassName = (item, selectedItems) => {
        if (selectedItems.includes(item)) {
            return "p-4 text-2xl text-black rounded font-semibold transition-colors bg-red-600";
        } else {
            return "p-4 text-2xl text-black rounded font-semibold transition-colors bg-white border-4 border-transparent hover:border-red-600";
        }
    };
    return (
        <div className="flex flex-col items-center w-full h-full p-8">
            <div className="grid grid-cols-2 gap-10 w-full h-full">
                {items.map((item) => ( //essentially javascript equivalent of   (for item : items)
                <button key={item} className={buttonClassName(item, selectedItems)} onClick={() => handleSelection(item)}>
                    {item}
                </button>))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 p-2 bg-red-600 text-black text-xl font-semibold rounded hover:bg-red-700 transition-colors">
                Submit 
            </button>
        </div>
  );
}
