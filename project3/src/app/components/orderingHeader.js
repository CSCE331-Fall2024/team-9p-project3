import { Cart } from "../objects/cartObject";

export default function OrderingHeader( {switchPage, cart} ) {
    return(
        <header className="flex justify-end gap-6 w-11/12">
            <button onClick={() => switchPage('cartPage', cart)}>
                Order Total = ${cart.getCartPrice().toFixed(2)}
            </button>
        </header>
    );
}