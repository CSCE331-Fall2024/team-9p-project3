import Image from "next/image";
import {CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter } from "../../components";

export default function EmployeeEntreePage({cart, switchPage, numRequired, newCartObj}) {
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
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader cart={cart} switchPage={switchPage} employee={true}/>
            <div className="flex flex-row h-full w-full">
                <CartSidePanel cart={cart}/>
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <OrderingTopPanel title={topPanelString}/>
                    <div className="flex justify-center items-center h-5/6 w-full bg-red-800">
                        <EntreesSelector cart={cart} numRequired={numRequired} switchPage={switchPage} newCartObj={newCartObj} employee={true}/>
                    </div>
                </div>
            </div>
            <OrderingFooter switchPage={switchPage} cart={cart} employee={true}/>
        </main>
    );
}
