import { useState, useEffect } from 'react';


export default function EntreesSelector({ cart, numRequired, switchPage, newCartObj, employee=false}) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const fetchEntrees = async () => {
            try {
                console.log('inside fetch entrees')
                const response = await fetch('./pages/api/entree');
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
        fetchEntrees();

        
      }, []); 
      console.log(items);


    // const items = ["Broccoli Beef", "Orange Chicken", "CHIMKEN", "CHIMKEN2"];
    let numSelect = parseInt(numRequired);
    
    const toggleSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selected => selected !== item));
        } 
        else if (selectedItems.length < numSelect) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleSubmit = () => {
        if(selectedItems.length == numRequired) {
        newCartObj.entreeItems = selectedItems;
        cart.addItem(newCartObj);
        setSelectedItems([]);
        if(employee) {
            switchPage('employeeMainMenuPage', cart);
        } else {
            switchPage('customerMainMenuPage', cart);
        }
        }
    };

    const buttonClassName = (item, selectedItems) => {
        if (selectedItems.includes(item)) {
            return "p-4 text-2xl text-black rounded-lg h-[150px] border-4 border-transparent transition-colors bg-red-600";
        } else {
            return "p-4 text-2xl text-black rounded-lg h-[150px] border-4 border-transparent transition-colors bg-white hover:border-red-600";
        }
    };

    const submitButtonClass = () => {
        if(selectedItems.length < numRequired) {
            return "mt-4 p-2 bg-gray-300 text-gray-500 text-xl rounded";
        } else {
            return "mt-4 p-2 bg-red-600 text-black text-xl rounded hover:bg-red-700 transition-colors";
        }
    }
    return (
        <>
            <div className="flex flex-col items-center mb-[10px] w-full font-semibold bg-gray-200 max-h-screen overflow-y-auto p-8">
                <div className="grid grid-cols-3 gap-10 w-full h-full">
                    {items.map((item) => ( //essentially javascript equivalent of   (for item : items)
                    <button key={item} className={buttonClassName(item, selectedItems)} onClick={() => toggleSelection(item)}>
                        {item}
                    </button>))}
                </div>

            </div>      
            <div className="flex items-center justify-center h-[100px] m-[20px] w-full">
                <button
                    onClick={() => handleSubmit()}
                    className={submitButtonClass()}>
                    Submit 
                </button>                       
            </div>
        </>

  );
}
