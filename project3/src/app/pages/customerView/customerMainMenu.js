import Image from "next/image";
import CartSidePanel from "../../components/cartSidePanel";
import OrderingTopPanel from "../../components/orderingTopPanel";
import MenuItemButton from "../../components/menuItemButton";
import OrderingHeader from "../../components/orderingHeader";
import OrderingFooter from "../../components/orderingFooter";

export default function CustomerMainMenuPage({ switchPage }) {
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader/>
            <div className="flex flex-row h-full w-full">
                <CartSidePanel/>
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
