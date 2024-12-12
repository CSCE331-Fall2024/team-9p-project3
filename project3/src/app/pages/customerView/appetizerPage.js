import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, OrderingFooter, AppetizerSelector } from "../../components";

// This function shows the Appetizer frontend interface
export default function AppetizerPage({cart, switchPage}) {
    var topPanelString = "Choose ";
    return (
        <main className="flex flex-col justify-center bg-gray-200 items-center h-screen">
            <OrderingHeader cart={cart} switchPage={switchPage}/>
            <div className="flex flex-col justify-center items-end h-full w-full">
                <OrderingTopPanel title="Choose an Appetizer"/>
                <div className="flex justify-center items-center h-5/6 w-full">
                    <AppetizerSelector cart={cart} switchPage={switchPage} numRequired={1}/>
                </div>
            </div>
            <OrderingFooter switchPage={switchPage} cart={cart}/>
        </main>
    );
}