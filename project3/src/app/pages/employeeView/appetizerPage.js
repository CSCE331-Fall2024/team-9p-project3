import { CartSidePanel, OrderingHeader, OrderingTopPanel, MenuItemButton, OrderingFooter, AppetizerSelector } from "../../components";


export default function EmployeeAppetizerPage({cart, switchPage}) {
    var topPanelString = "Choose ";
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader cart={cart} switchPage={switchPage} employee={true}/>
            <div className="flex flex-row h-full w-full">
                <CartSidePanel cart={cart}/>
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <OrderingTopPanel title="Choose an Appetizer"/>
                    <div className="flex justify-center items-center h-5/6 w-full">
                        <AppetizerSelector cart={cart} switchPage={switchPage} numRequired={1} employee={true}/>
                    </div>
                </div>
            </div>
            <OrderingFooter switchPage={switchPage} cart={cart} employee={true}/>
        </main>
    );
}