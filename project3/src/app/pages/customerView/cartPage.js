import { useState } from "react";
import { OrderingHeader, Popup, OrderingFooter, AllergenText } from "../../components";
import { Cart } from "@/app/objects/cartObject";


export default function CartPage({ cart, switchPage, employee=false }) {
    console.log("Starting Cartpage. Employee = ", employee);

    // Declare state variables and functions to update it. 
    // The initial value of each state variables is set by useState. 
    const [newCart, setCart] = useState(cart);
    const [showPopup, setShowPopup] = useState(false);
    const [popupFunction, setPopupFunction] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [allergyPopup, setAllergyPopup] = useState(false);

    const openPopup = (message, onYes) => {
        setPopupMessage(message);
        setPopupFunction(() => onYes);
        setShowPopup(true);
    }

    const onYesPopup = () => {
        if (popupFunction) {
            popupFunction();
        }
        setShowPopup(false);
    }

    const onNoPopup = () => {
        setShowPopup(false);
    }

    const handleRemoveItem = (cartObject) => {
        newCart.removeItem(cartObject);
        setCart(new Cart( ...newCart.items));
    }

    const handleOrderMore = (cart) => {
        if(employee) {
            switchPage('employeeMainMenuPage', cart);
        } else {
            switchPage('customerMainMenuPage', cart);
        }
        
    }

    const copyCartItem = (cartObject) => {
        newCart.addItem(cartObject);
        setCart(new Cart( ...newCart.items));
    }
    // This function upload orders and all relative data to the backend database. 
    const handlePlaceOrder = async(cart) => {
        // cart parameter is a Cart class defined in objects/cartObject.js
        console.log("Outside try");
        try {
            // Console Message
            console.log("Inside try");
            // This function sends a POST request to the specific API endpoint for updating the customer_items and customer_orders table.
            const response = await fetch("./pages/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartData: cart }),
            });
            console.log("After fetch");
            
            // Check if the server works well. 
            if (response.ok) {
                console.log("Fetch response OK");
                const data = await response.json();
                console.log("Order placed successfully", data);
                if(employee) {
                    const newCart = new Cart();
                    switchPage('employeeMainMenuPage', newCart);
                } else {
                    switchPage('customerStartPage');
                }
            } else {
                console.error("Failed to place order");
            }
        } catch (error) {
            console.error("Error in placing order:", error);
        }
        console.log("End of try");
        // uncomment line below after done to transition back to start page after placing order
        // switchPage('customerStartPage');
        }
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader cart={newCart} switchPage={switchPage} employee={employee}/>
            {/* <h1>EMPLOYEE VIEW = {employee.toString()}</h1> */}
            <div className="flex flex-row h-full w-full">
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <div className="flex justify-center items-center w-full bg-gray-200 border-b-2 border-black">
                        <h1 className="text-black text-5xl font-semibold m-3">My Cart</h1>
                    </div>
                    <div className="flex flex-col h-full w-full bg-gray-200">
                            {newCart.items.map((cartObject, index) => (
                                <div key={index} className="flex flex-row w-full bg-white border-b-2 border-black">
                                    <div className="flex flex-col justify-start items-start h-full w-1/2 pl-2 pt-2">
                                        <h2 className="text-black text-3xl">{cartObject.getItemType()}</h2>
                                        {cartObject.getItems().map((entree, index2) => (
                                            <h3 key={index2} className="text-black text-xl ml-2">{entree}</h3>
                                        ))}
                                    </div>
                                    <div className="flex flex-col justify-center items-start h-full w-1/6">
                                        <h2 className="text-black text-2xl">${cartObject.getPrice().toFixed(2)}</h2>
                                    </div>
                                    <div className="flex flex-row justify-center items-center h-full w-1/3 gap-10">
                                        <button className="text-white text-lg p-2 font-semibold bg-red-600 rounded hover:bg-red-700 transition-colors" onClick={() => openPopup("Are you sure you want to remove this item", () => handleRemoveItem(cartObject))}>Remove</button>
                                        <button className="text-white text-lg p-2 font-semibold bg-red-600 rounded hover:bg-red-700 transition-colors" onClick={() => copyCartItem(cartObject)}>Copy</button>
                                    </div>
                                </div>
                                
                            ))}
                            <div className="mt-3 flex flex-row justify-between items-center h-full max-h-16 w-full bg-gray-200">
                                <div className="text-black text-2xl font-bold w-1/2 pl-2 flex flex-row justify-start items-center gap-10">Total:
                                    <button className="text-white text-xl p-2 pl-4 pr-4 bg-red-600 rounded hover:bg-red-700 transition-colors" onClick={() => handleOrderMore(newCart)}>Order More</button>
                                </div>
                                <h1 className="text-black text-2xl font-bold w-1/6">${newCart.getCartPrice().toFixed(2)}</h1>
                                <div className="w-1/3 h-full flex flex-row font-semibold justify-center items-center gap-10">
                                    {newCart.items.length > 0 ? (
                                        <button className="text-white text-xl p-2 pl-4 pr-4 bg-black rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => setAllergyPopup(true)}>View Allergen Information</button>
                                    ) : (
                                        <button className="text-gray-500 text-xl p-2 pl-4 pr-4 bg-gray-300 rounded transition-colors">View Allergen Information</button>
                                    )}
                                    {newCart.items.length > 0 ? (
                                        <button className="text-white text-xl p-2 pl-4 pr-4 bg-black rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => openPopup("Are you sure you want to place your order?", () => handlePlaceOrder(newCart))}>Place Order</button>
                                    ) : (
                                        <button className="text-gray-500 text-xl p-2 pl-4 pr-4 bg-gray-300 rounded transition-colors">Place Order</button>
                                    )}
                                    
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <OrderingFooter switchPage={switchPage} cart={cart} employee={employee}/>
            {showPopup && (
                <Popup message={popupMessage} onConfirm={onYesPopup} onCancel={onNoPopup}/>
            )}
            {allergyPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
                        <p className="text-black text-lg mb-4">Ingredients in Cart</p>
                        <div>
                            <AllergenText cart={cart}></AllergenText>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors" onClick={() => setAllergyPopup(false)}>
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
