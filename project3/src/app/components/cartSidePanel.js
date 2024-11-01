export function CartSideBlock() {
    return (
        <div className="flex flex-col justify-center items-start w-full hover:bg-red-800/20 p-2">
            <div className="flex flex-row justify-between w-full">
                <h1 className="text-black text-2xl">Plate</h1>
                <h1 className="text-black text-2xl">$6.00</h1>
            </div>
            <h2 className="text-black/80 text-xl ml-2">Chow Mein</h2>
            <h2 className="text-black/80 text-xl ml-2">Beijing Beef</h2>
            <h2 className="text-black/80 text-xl ml-2">Orange Chicken</h2>
        </div>
    );
}

export default function CartSidePanel( {/*TODO */futureCartDataToProcessIntoBlocks}) {
    return (
        <div className="flex flex-col justify-start items-center h-full w-2/12 bg-gray-300">
            <div className="flex flex-col justify-center items-center h-24 w-full bg-red-900/40">
                <h1 className="text-black text-2xl">Order</h1>
            </div>
            <CartSideBlock/>
        </div>
    );
}