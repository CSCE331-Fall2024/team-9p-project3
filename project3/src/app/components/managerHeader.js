export default function ManagerHeader( {switchPage} ) {
    return(
        <header className="flex justify-between items-center gap-6 w-full h-10">
            <h2 className="text-lg ml-12">
                Panda Express
            </h2>
            <h2 className="text-lg ml-12">
                Manager View
            </h2>
        </header>
    );
}