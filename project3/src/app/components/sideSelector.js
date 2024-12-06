import { useState, useEffect } from 'react';
import { CartObject} from '../objects/cartObject';

export default function SideSelector({ cart, switchPage, numRequired, employee=false}) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchSides = async () => {
            try {
                console.log('inside fetch entrees')
                const response = await fetch('./pages/api/side');
                console.log('after await');
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
    
                const data = await response.json();
                setItems(data.rows.map(row => row.name));
                console.log(items);
                // return data.rows;
                // return items;
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        console.log('about to fetch');
        fetchSides();

        
      }, []); 
      console.log(items);

    // const items = ["Chow Mein", "Fried Rice", "White Rice", "Super Greens?"];
    let numSelect = parseInt(numRequired);
    
    const toggleSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selected => selected !== item));
        } 
        else if (selectedItems.length < numSelect) {
            setSelectedItems([...selectedItems, item]);
        }
    };
    const handleSelection = (item) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([item]);
        }
    };

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

    const buttonClassName = (item, selectedItems) => {
        if (selectedItems.includes(item)) {
            return "p-4 text-2xl text-white font-semibold rounded-lg transition-colors bg-red-600";
        } else {
            return "p-4 text-2xl text-black font-semibold rounded-lg transition-colors bg-white border-4 border-transparent hover:border-red-600";
        }
    };
    const submitButtonClass = () => {
        if(selectedItems.length < 1) {
            return "mt-4 p-2 bg-gray-300 text-gray-500 text-xl rounded";
        } else {
            return "mt-4 p-2 bg-red-600 text-black text-xl rounded hover:bg-red-700 transition-colors";
        }
    }
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
