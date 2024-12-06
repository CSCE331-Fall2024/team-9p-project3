import { useState, useEffect } from 'react';
import { Cart } from '../objects/cartObject';
import Popup from './popup';
    
export default function OrderingFooter( { switchPage, cart, employee=false}) {
    const [isTranslateVisible, setTranslateVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupFunction, setPopupFunction] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');

    const openPopup = (message, onYes) => {
        setPopupMessage(message);
        setPopupFunction(() => onYes);
        setShowPopup(true);
    }

    const onYesPopup = () => {
        if (popupFunction) {
            popupFunction();
        }
        setShowPopup(false);
    }

    const onNoPopup = () => {
        setShowPopup(false);
    }

    useEffect(() => {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }, []);

    useEffect(() => {

        const script = document.createElement('script');
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
        
        window.googleTranslateElementInit = function () {
            const container = document.getElementById('google_translate_element');
            if (container) {
                container.innerHTML = '';
                new window.google.translate.TranslateElement({ pageLanguage: 'en'/* , layout: google.translate.TranslateElement.InlineLayout.SIMPLE  */}, 'google_translate_element');
            }
          };

        

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    const handleButtonClick = () => {
        setTranslateVisible(!isTranslateVisible);
        if(isTranslateVisible) {
            console.log("showing popup");
            const showOriginal = document.getElementById(':1.restore');
            const restoreButton = document.querySelector('#\\:1.restore');
            console.log(showOriginal, " vs ", restoreButton);
        } else {
            console.log("hiding popup");
            const showOriginal = document.getElementById(':1.restore');
            const restoreButton = document.querySelector('#\\:1.restore');
            console.log(showOriginal, " vs ", restoreButton);
        }
    }

    const backToStart = () => {
        if(employee) {
            const newCart = new Cart();
            switchPage('employeeMainMenuPage', newCart);
        } else {
            switchPage('customerStartPage');
        }
    }

    const backToMenu = (cart) => {
        if(employee) {
            switchPage('employeeMainMenuPage', cart);
        } else {
            switchPage('customerMainMenuPage', cart);
        }
    }

    return(
    <>
        <footer className="flex sticky bottom-0 h-[100px] justify-between items-center fixed position-fixed font-semibold bg-red-600 pl-20 pr-20 w-full">
            <button className="text-white text-xl p-2 pl-4 pr-4 bg-red-600 rounded-lg border-2 border-white hover:bg-red-700 transition-colors" onClick={() => openPopup("Are you sure you want to cancel your order?", backToStart)} >Cancel Order</button>
            <div className="relative">
                <button className='text-white text-xl p-2 pl-4 pr-4 bg-red-600 rounded-lg border-2 border-white hover:bg-red-700 transition-colors' onClick={() => handleButtonClick()}>Translate</button>
                {/* The translate element is always in the DOM, but visibility is controlled by className */}
                <div id="google_translate_element" className={`flex flex-row absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white shadow-lg border rounded z-50 ${isTranslateVisible ? '' : 'hidden'}`} />
            </div>
            <button className="text-white text-xl p-2 pl-4 pr-4 bg-red-600 rounded-lg border-2 border-white hover:bg-red-700 transition-colors" onClick={() => backToMenu(cart)}>Cancel Item</button>
        </footer>
        
        {showPopup && (
        <Popup message={popupMessage} onConfirm={onYesPopup} onCancel={onNoPopup}/>
        )}
    </>
    );

    
}


{/* <div className="relative group">
                <div className='cursor-pointer text-black text-xl p-2 pl-4 pr-4 bg-red-500 rounded hover:bg-blue-200 hover:text-blue-600 transition-colors'>Translate</div>
                <div className="hidden group-hover:flex absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white shadow-lg border rounded z-50">
                    <div id="google_translate_element"></div>
                </div>
            </div> */}