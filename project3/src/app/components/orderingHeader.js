import { Cart } from "../objects/cartObject";
import WeatherDisplay from "./weatherDisplay";
import Image from 'next/image';

export default function OrderingHeader( {switchPage, cart, employee=false} ) {
    console.log("ordering header rendered with employee = ", employee);
    return(
        <header className="flex sticky top-0 h-[120px] justify-between items-center position-fixed gap-6 bg-red-600 w-full">
            <div className="flex items-center ml-5">
                <Image 
                    src="/PELogo.png" 
                    alt="Panda Express Logo" 
                    width={80} 
                    height={80} 
                    className="m-4"
                />
                <h1 className="text-2xl text-white font-semibold ml-5">
                    Panda Express
                </h1>
            </div>
            <WeatherDisplay></WeatherDisplay>
            <button 
                onClick={() => switchPage('cartPage', cart, employee)} 
                className="bg-red-600 text-white font-semibold py-3 px-4 rounded-lg border-2 mr-8 border-white hover:bg-red-700"
            >
                View Cart: ${cart.getCartPrice().toFixed(2)}
            </button>
        </header>
    );
}