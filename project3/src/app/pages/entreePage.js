import Image from "next/image";
import CartSidePanel from "../components/cartSidePanel";
import OrderingHeader from "../components/orderingHeader";
import OrderingTopPanel from "../components/orderingTopPanel";
import MenuItemButton from "../components/menuItemButton";
import EntreesSelector from "../components/entreesSelector";

export default function EntreePage({ switchPage, numRequired }) {
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <OrderingHeader/>
            <div className="flex flex-row h-full w-full">
                <CartSidePanel/>
                <div className="flex flex-col justify-center items-end h-full w-full">
                    <OrderingTopPanel title="Choose Your Item"/>
                    <div className="flex justify-center items-center h-5/6 w-full">
                        <EntreesSelector/>
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
