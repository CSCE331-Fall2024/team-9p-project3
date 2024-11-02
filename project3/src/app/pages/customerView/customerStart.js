import { Cart } from "@/app/objects/cartObject";

export default function CustomerStartPage({ switchPage }) {
    const newCart = new Cart();
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-1 justify-center items-center w-full bg-red-700">
                <h1 className="text-8xl font-medium text-red-100">
                    Welcome to Panda Express!
                </h1>
            </div>
            <button 
              onClick={() => switchPage('customerMainMenuPage', newCart)}
              className="flex justify-center items-center w-full h-1/3 bg-red-300 text-black text-2xl hover:bg-red-400 transition-colors"
            >
              Touch to Start Order
            </button>
        </div>
    );
}
