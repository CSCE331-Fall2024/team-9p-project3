export default function MenuItemButton({title}) {
    return(
        <button onClick={() => switchPage('home')} className="flex justify-center items-center bg-red-300 text-black text-3xl hover:bg-red-400 transition-colors rounded">
            {title}
        </button>
    );
}