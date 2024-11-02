import Image from "next/image";
import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter } from "../../components";

export default function CartPage({ cart, switchPage }) {
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader cart={cart} switchPage={switchPage}/>
            <div className="flex flex-row h-full w-full">
                <CartSidePanel cart={cart}/>
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <OrderingTopPanel title="Choose Your Item"/>
                    <div className="flex justify-center items-center h-5/6 w-full">
                        <div className="grid grid-cols-2 gap-10 w-full h-full p-8">
                            <h1 className="text-4xl">TEST CART PAGE</h1>
                        </div>
                    </div>
                </div>
            </div>
            <OrderingFooter/>
        </main>
    );
}
