import Image from "next/image";
import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter } from "../../components";

// This function implements the Employee Main Menu Page. 
export default function EmployeeMainMenuPage({ cart, switchPage }) {
    // if(cart == '' || !cart) {
    //     cart = new Cart();
    // } 
    return (
        <main className="flex flex-col justify-center items-center bg-gray-200 h-screen">
            <OrderingHeader cart={cart} switchPage={switchPage} employee={true}/>
            <div className="flex flex-col justify-center items-end h-full w-full">
                <OrderingTopPanel title="Choose Your Item"/>
                <div className="flex justify-center items-center h-5/6 bg-gray-200 w-full">
                    <div className="grid grid-cols-2 gap-10 w-full h-full p-8">
                        <MenuItemButton title="Bowl" switchPage={switchPage} cart={cart} employee={true}/>
                        <MenuItemButton title="Plate" switchPage={switchPage} cart={cart} employee={true}/>
                        <MenuItemButton title="Bigger Plate" switchPage={switchPage} cart={cart} employee={true}/>
                        <MenuItemButton title="Appetizer" switchPage={switchPage} cart={cart} employee={true}/>
                    </div>
                </div>
            </div>
            <OrderingFooter switchPage={switchPage} cart={cart} employee={true}/>
        </main>
    );
}
