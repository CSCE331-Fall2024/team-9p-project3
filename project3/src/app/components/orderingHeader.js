import { Cart } from "../objects/cartObject";
import WeatherDisplay from "./weatherDisplay";

export default function OrderingHeader( {switchPage, cart, employee=false} ) {
    console.log("ordering header rendered with employee = ", employee);
    return(
        <header className="flex justify-between items-center gap-6 w-full h-10">
            <h2 className="text-lg ml-12">
                Panda Express
            </h2>
            <WeatherDisplay></WeatherDisplay>
            <button className="text-lg mr-12" onClick={() => switchPage('cartPage', cart, employee)}>
                Order Total = ${cart.getCartPrice().toFixed(2)}
            </button>
        </header>
    );
}