
export default function StartPage({ switchPage }) {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center bg-gray-200 justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="">
                <h1 className="text-5xl cursor-pointer hover:text-red-600 m-5" onClick={() => switchPage('loginPage')}>
                        Log In
                    </h1>
                    <button
                        onClick={() => switchPage('customerStartPage')}
                        className="text-5xl hover:text-red-600 m-5"
                    >
                        Launch Customer View
                    </button>
                </div>
            </main>
        </div>
    );
}
