import { Cart, CartObject } from "../objects/cartObject";



export function CartSideBlock( {cartObject} ) {
    if(!(cartObject instanceof CartObject)) {
        console.log("Cant make a CartSideBlock with a non CartObject");
        //return;
    }
    return (
        <div className="flex flex-col justify-center items-start w-full hover:bg-red-800/20 p-2">
            <div className="flex flex-row justify-between w-full">
                <h1 className="text-black text-2xl">{cartObject.getItemType()}</h1>
                <h1 className="text-black text-2xl">${cartObject.getPrice()}</h1>
            </div>
            {cartObject.getItems().map((entree, index) =>(
                <h2 key={index} className="text-black/80 text-xl ml-2">{entree}</h2>
            ))}
        </div>
    );
}
/**
 * 
 * @param {{ cart: Cart }} props  
 * @returns 
 */
//the @param is how I get vscode to think cart is a Cart object, but it's not necessary to call functions like addItem
export default function CartSidePanel( {cart}) {
    if(!cart) cart = new Cart();
    return (    
        <div className="flex flex-col justify-start items-center h-full w-3/12 bg-red-600 border-t-4 border-b-4 border-gray-200">
            <div className="flex flex-col justify-center items-center h-24 w-full bg-red-600">
                <h1 className="text-white font-semibold text-2xl">My Order</h1>
            </div>
            <div className="flex flex-col justify-center items-center flex-grow w-full bg-white border-8 border-red-600">
                {cart.items && cart.items.map((cartObj, index) => (
                    <CartSideBlock key={index} cartObject={cartObj}/>
                ))}                
            </div>
        </div>
    );
}