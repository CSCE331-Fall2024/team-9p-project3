import Image from "next/image";
import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter } from "../../components";

export default function CartPage({ cart, switchPage }) {
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader cart={cart} switchPage={switchPage}/>
            <div className="flex flex-row h-full w-full">
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <div className="flex justify-center items-center w-full bg-white border-b-2 border-black">
                        <h1 className="text-black text-5xl m-3">Cart</h1>
                    </div>
                    <div className="flex flex-col h-full w-full bg-gray-100">
                            {cart.items.map((cartObject, index) => (
                                <div key={index} className="flex flex-row h-full w-full max-h-32 bg-red-200 border-b-2 border-black">
                                    <div className="flex flex-col justify-start items-start h-full w-1/2">
                                        <h2 className="text-black text-3xl">{cartObject.getItemType()}</h2>
                                        {cartObject.getItems().map((entree, index2) => (
                                            <h3 key={index2} className="text-black text-xl ml-2">{entree}</h3>
                                        ))}
                                    </div>
                                    <div className="flex flex-col justify-center items-start h-full w-1/6">
                                        <h2 className="text-black text-2xl">${cartObject.getPrice().toFixed(2)}</h2>
                                    </div>
                                    <div className="flex flex-row justify-center items-center h-full w-1/3 gap-10">
                                        <button className="text-white text-lg p-2 bg-black rounded hover:bg-gray-800 hover:text-red-300 transition-colors">Remove</button>
                                        <button className="text-white p-2 text-lg bg-black rounded hover:bg-gray-800 hover:text-red-300 transition-colors">Copy</button>
                                    </div>
                                </div>
                                
                            ))}
                    </div>
                </div>
            </div>
            <OrderingFooter/>
        </main>
    );
}
