export default function MenuItemButton({title, switchPage}) {
    let reqEntrees = "1";
    switch (title) {
        case 'Bowl':
            reqEntrees = '1';
            break;
        case 'Plate':
            reqEntrees = '2';
            break;
        default:
            break;
    }
    
    return(
        <button onClick={() => switchPage('entreePage', reqEntrees)} className="flex justify-center items-center bg-red-300 text-black text-3xl hover:bg-red-400 transition-colors rounded">
            {title}
        </button>
    );
}