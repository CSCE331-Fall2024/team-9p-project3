export default function MenuItemButton({title, switchPage, cart}) {
    let reqEntrees = "1";
    switch (title) {
        case 'Bowl':
            reqEntrees = '1';
            break;
        case 'Plate':
            reqEntrees = '2';
            break;
        case 'Bigger Plate':
            reqEntrees = '3';
            break;
        case 'Appetizer':
            reqEntrees = '0';
            break;
        default:
            break;
    }
    function handleChoice() {
        if(reqEntrees == 0) {
            //TODO appetizer page
            switchPage('appetizerPage', reqEntrees, cart);
        } else {
            switchPage('sidePage', reqEntrees, cart);
        }
    }

    return(
        <button onClick={() => handleChoice()} className="flex justify-center items-center bg-red-300 text-black text-3xl hover:bg-red-400 transition-colors rounded">
            {title}
        </button>
    );
}
