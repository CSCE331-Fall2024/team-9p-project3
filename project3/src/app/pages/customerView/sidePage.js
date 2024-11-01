import Image from "next/image";
import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, EntreesSelector, OrderingFooter } from "../../components";

export default function SidePage({ switchPage, numRequired }) {
    var topPanelString = "Choose ";
    switch (numRequired) {
        case '1':
            topPanelString += "1 entree."
            break;
        default:
            topPanelString += `${numRequired} entrees.`
            break;
    }

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader/>
            <div className="flex flex-row h-full w-full">
                <CartSidePanel/>
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <OrderingTopPanel title={topPanelString}/>
                    <div className="flex justify-center items-center h-5/6 w-full">
                        <EntreesSelector onSubmit={""} numRequired={numRequired}/>
                    </div>
                </div>
            </div>
            <OrderingFooter/>
        </main>
    );
}
