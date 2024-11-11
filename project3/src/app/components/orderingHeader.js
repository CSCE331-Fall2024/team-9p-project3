import { Cart } from "../objects/cartObject";

export default function OrderingHeader( {switchPage, cart} ) {
    return(
        <header className="flex justify-between items-center gap-6 w-full h-10">
            <h2 className="text-lg ml-12">
                Panda Express
            </h2>
            <button className="text-lg mr-12" onClick={() => switchPage('cartPage', cart)}>
                Order Total = ${cart.getCartPrice().toFixed(2)}
            </button>
        </header>
    );
}