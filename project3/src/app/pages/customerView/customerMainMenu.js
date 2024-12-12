import Image from "next/image";
import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter } from "../../components";

// This function implements Customer Main Menu page. 
export default function CustomerMainMenuPage({ cart, switchPage }) {
    // if(cart == '' || !cart) {
    //     cart = new Cart();
    // } 
    return (
        <main className="flex flex-col justify-center items-center bg-gray-200 h-screen">
            <OrderingHeader cart={cart} switchPage={switchPage}/>
            <div className="flex flex-col justify-center items-end h-full w-full">
                <OrderingTopPanel title="Choose Your Item"/>
                <div className="flex justify-center items-center bg-gray-200 h-5/6 w-full">
                    <div className="grid grid-cols-2 gap-10 w-full h-full p-8">
                        <MenuItemButton title="Bowl" switchPage={switchPage} cart={cart}/>
                        <MenuItemButton title="Plate" switchPage={switchPage} cart={cart}/>
                        <MenuItemButton title="Bigger Plate" switchPage={switchPage} cart={cart}/>
                        <MenuItemButton title="Appetizer" switchPage={switchPage} cart={cart}/>
                    </div>
                </div>
            </div>
            <OrderingFooter switchPage={switchPage} cart={cart}/>
        </main>
    );
}
