import Image from "next/image";
import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter } from "../../components";
import { CartObject } from "@/app/objects/cartObject";

export default function CustomerMainMenuPage({ cart, switchPage }) {
    if(cart == '' || !cart) {
        cart = new CartObject();
    }
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader/>
            <div className="flex flex-row h-full w-full">
                <CartSidePanel cart={cart}/>
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <OrderingTopPanel title="Choose Your Item"/>
                    <div className="flex justify-center items-center h-5/6 w-full">
                        <div className="grid grid-cols-2 gap-10 w-full h-full p-8">
                            <MenuItemButton title="Bowl" switchPage={switchPage}/>
                            <MenuItemButton title="Plate" switchPage={switchPage}/>
                            <MenuItemButton title="Bigger Plate" switchPage={switchPage}/>
                            <MenuItemButton title="Appetizer" switchPage={switchPage}/>
                        </div>
                    </div>
                </div>
            </div>
            <OrderingFooter/>
        </main>
    );
}
