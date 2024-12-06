import { useState, useEffect } from 'react';
import { CartObject} from '../objects/cartObject';

export default function AppetizerSelector({ cart, switchPage, numRequired, employee=false}) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                console.log('inside fetch entrees')
                const response = await fetch('./pages/api/appetizer');
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
        fetchApps();

        
      }, []); 
      console.log(items);

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
        const newCartObject = new CartObject(selectedItems.at(0));
        cart.addItem(newCartObject)
        setSelectedItems([]);
        if(employee) {
            switchPage('employeeMainMenuPage', cart);
        } else {
            switchPage('customerMainMenuPage', cart);
        }
    };

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
