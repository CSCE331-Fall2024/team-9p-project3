import { Cart } from "@/app/objects/cartObject";

export default function CustomerStartPage({ switchPage }) {
    const newCart = new Cart();
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-1 justify-center items-center w-full bg-white">
                <h1 className="text-8xl text-red-500">
                    Welcome to Panda Express!
                </h1>
            </div>
            <button 
                onClick={() => switchPage('customerMainMenuPage', newCart)}
                className="flex justify-center items-center w-full h-1/3 bg-red-500 text-black text-2xl hover:bg-red-600 transition-colors"
            >
                <h1 className="text-4xl text-white">
                    Touch to Start Order
                </h1>
            </button>
        </div>
    );
}
