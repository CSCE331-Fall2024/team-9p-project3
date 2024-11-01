import { useState } from 'react';

export default function EntreesSelector({ cart, numRequired, switchPage, newCartObj}) {
    const [selectedItems, setSelectedItems] = useState([]);

    const items = ["Broccoli Beef", "Orange Chicken", "CHIMKEN", "CHIMKEN2"];
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
        //onSubmit(selectedItems);
        console.log(selectedItems);
        console.log(newCartObj.entreeItems);
        /* selectedItems.forEach(entree => {
            newCartObj.entreeItems.push(entree);
        }); */
        newCartObj.entreeItems = selectedItems;
        cart.push(newCartObj);
        setSelectedItems([]);
        switchPage('sidePage');
    };

    const buttonClassName = (item, selectedItems) => {
        if (selectedItems.includes(item)) {
            return "p-4 text-2xl text-black rounded transition-colors bg-gray-500";
        } else {
            return "p-4 text-2xl text-black rounded transition-colors bg-gray-300 hover:bg-gray-400";
        }
    };
    return (
        <div className="flex flex-col items-center w-full h-full p-8">
            <div className="grid grid-cols-2 gap-10 w-full h-full">
                {items.map((item) => ( //essentially javascript equivalent of   (for item : items)
                <button key={item} className={buttonClassName(item, selectedItems)} onClick={() => toggleSelection(item)}>
                    {item}
                </button>))}
            </div>
            <button
                onClick={() => handleSubmit()}
                className="mt-4 p-2 bg-red-500 text-black text-xl rounded hover:bg-red-600 transition-colors">
                Submit 
            </button>
        </div>
  );
}
