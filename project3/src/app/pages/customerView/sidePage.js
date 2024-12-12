import Image from "next/image";
import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter, SideSelector } from "../../components";

// This function implements Side Page. 
export default function SidePage({ cart, switchPage, numEntreesRequired}) {
    var topPanelString = "Choose ";
    return (
        <main className="flex flex-col justify-center bg-gray-200 items-center h-screen">
            <OrderingHeader cart={cart} switchPage={switchPage}/>
            <div className="flex flex-col justify-center items-end h-full w-full">
                <OrderingTopPanel title="Choose a side"/>
                <div className="flex justify-center items-center h-5/6 bg-gray-200 w-full">
                    <SideSelector cart={cart} switchPage={switchPage} numRequired={numEntreesRequired}/>
                </div>
            </div>
            <OrderingFooter switchPage={switchPage} cart={cart}/>
        </main>
    );
}
