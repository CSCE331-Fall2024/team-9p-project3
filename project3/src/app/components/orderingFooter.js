import Image from "next/image";
export default function OrderingFooter( { switchPage, cart }) {
    return(
        <footer className="flex justify-between items-center pl-20 pr-20 w-full h-16">
            <button className="text-black text-xl p-2 pl-4 pr-4 bg-red-500 rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => switchPage('customerStartPage')} >Cancel Order</button>
            <button className="text-black text-xl p-2 pl-4 pr-4 bg-red-500 rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => switchPage('customerMainMenuPage', cart)}>Go Back</button>
        </footer>
    );
}