import Image from "next/image";
import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter, SideSelector } from "../../components";

export default function SidePage({ switchPage, numEntreesRequired}) {
    var topPanelString = "Choose ";
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader/>
            <div className="flex flex-row h-full w-full">
                <CartSidePanel/>
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <OrderingTopPanel title="Choose a side"/>
                    <div className="flex justify-center items-center h-5/6 w-full">
                        <SideSelector onSubmit={""} switchPage={switchPage} numRequired={numEntreesRequired}/>
                    </div>
                </div>
            </div>
            <OrderingFooter/>
        </main>
    );
}
