import { Cart } from "../objects/cartObject";

export default function OrderingHeader( {cart} ) {
    return(
        <header className="flex justify-end gap-6 w-11/12">
            <h2>Order Total = ${cart.getCartPrice().toFixed(2)}</h2>
        </header>
    );
}