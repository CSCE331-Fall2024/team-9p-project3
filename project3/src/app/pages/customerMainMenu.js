import Image from "next/image";
import cartSidePanel from "../components/cartSidePanel";

export default function CustomerMainMenuPage({ switchPage }) {
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <header className="flex justify-end gap-6 w-11/12">
                <h2>Order Total = $X.XX</h2>
            </header>
            <div className="flex flex-row h-full w-full">
                {cartSidePanel()}
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <div className="flex justify-center items-center h-1/6 w-full bg-white">
                    </div>
                    <div className="flex justify-center items-center h-5/6 w-full">
                        <div className="grid grid-cols-2 gap-10 w-full h-full p-8">
                            <button onClick={() => switchPage('home')} className="flex justify-center items-center bg-red-300 text-black text-3xl hover:bg-red-400 transition-colors rounded">
                                Bowl
                            </button>
                            <button onClick={() => switchPage('home')} className="">
                                Plate
                            </button>
                            <button onClick={() => switchPage('home')} className="">
                                Bigger Plate
                            </button>
                            <button onClick={() => switchPage('home')} className="">
                                Appetizer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </main>
    );
}
