import Image from "next/image";
import {CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter } from "../../components";

// This functon implements EntreePage
export default function EntreePage({cart, switchPage, numRequired, newCartObj }) {
    var topPanelString = "Choose ";
    switch (numRequired) {
        case '1':
            topPanelString += "1 entree"
            break;
        default:
            topPanelString += `${numRequired} entrees`
            break;
    }



    return (
        <main className="flex flex-col justify-center items-center bg-gray-200 h-screen">
            <OrderingHeader cart={cart} switchPage={switchPage} classname="sticky"/>
            <div className="flex flex-col flex-grow justify-center items-end w-full overflow-hidden">
                <OrderingTopPanel title={topPanelString}/>
                <EntreesSelector cart={cart} numRequired={numRequired} switchPage={switchPage} newCartObj={newCartObj}/>
            </div>
            <OrderingFooter switchPage={switchPage} cart={cart}/>
        </main>
    );
}
