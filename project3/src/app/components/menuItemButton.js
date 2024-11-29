export default function MenuItemButton({title, switchPage, cart, employee=false}) {
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
            if(employee) {
                switchPage('employeeAppetizerPage', reqEntrees, cart);
            } else {
                switchPage('appetizerPage', reqEntrees, cart);
            }
        } else {
            if(employee) {
                switchPage('employeeSidePage', reqEntrees, cart);
            } else {
                switchPage('sidePage', reqEntrees, cart);
            }
        }
    }

    return(
        <button 
            onClick={() => handleChoice()} 
            className="flex justify-center items-center rounded-lg font-semibold bg-white border-4 border-transparent text-black fort-semibold text-3xl hover:border-4 hover:border-red-600 hover:transition-colors rounded">
            {title}
        </button>
    );
}
