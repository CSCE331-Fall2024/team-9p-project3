import { useState } from "react";
import Image from "next/image";
import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter } from "../../components";
import { Cart } from "@/app/objects/cartObject";

export default function CartPage({ cart, switchPage }) {
    const [newCart, setCart] = useState(cart);

    const handleRemoveItem = (cartObject) => {
        newCart.removeItem(cartObject);
        setCart(new Cart( ...newCart.items));
    }

    const copyCartItem = (cartObject) => {
        newCart.addItem(cartObject);
        setCart(new Cart( ...newCart.items));
    }

    const handlePlaceOrder = async(cart) => {
        //TODO: upload cart order
        // cart parameter is a Cart class defined in objects/cartObject.js
        console.log("Outside try");
        try {
            console.log("Inside try");
            const response = await fetch("./pages/api/entree", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartData: cart }),
            });
            console.log("After fetch");

            if (response.ok) {
                console.log("Fetch response OK");
                const data = await response.json();
                console.log("Order placed successfully", data);
                switchPage('customerStartPage');
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
            <OrderingHeader cart={newCart} switchPage={switchPage}/>
            <div className="flex flex-row h-full w-full">
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <div className="flex justify-center items-center w-full bg-white border-b-2 border-black">
                        <h1 className="text-black text-5xl m-3">Cart</h1>
                    </div>
                    <div className="flex flex-col h-full w-full bg-gray-100">
                            {newCart.items.map((cartObject, index) => (
                                <div key={index} className="flex flex-row w-full bg-red-200 border-b-2 border-black">
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
                                        <button className="text-white text-lg p-2 bg-black rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => handleRemoveItem(cartObject)}>Remove</button>
                                        <button className="text-white p-2 text-lg bg-black rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => copyCartItem(cartObject)}>Copy</button>
                                    </div>
                                </div>
                                
                            ))}
                            <div className="mt-3 flex flex-row justify-start items-center h-full max-h-16 w-full bg-gray-300">
                                <h1 className="text-black text-2xl font-bold w-1/2 pl-2">Total</h1>
                                <h1 className="text-black text-2xl font-bold w-1/6">${newCart.getCartPrice().toFixed(2)}</h1>
                                <div className="w-1/3 h-full flex flex-row justify-center items-center gap-10">
                                    <button className="text-white text-xl p-2 pl-4 pr-4 bg-black rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => switchPage('customerMainMenuPage', newCart)}>Order More</button>
                                    {newCart.items.length > 0 ? (
                                        <button className="text-white text-xl p-2 pl-4 pr-4 bg-black rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => handlePlaceOrder(newCart)}>Place Order</button>
                                    ) : (
                                        <button className="text-white text-xl p-2 pl-4 pr-4 bg-gray-600 rounded transition-colors">Place Order</button>
                                    )
                                        
                                    }
                                    
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <OrderingFooter switchPage={switchPage} cart={cart}/>
        </main>
    );
}
