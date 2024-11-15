import { useState, useEffect } from 'react';
    
export default function OrderingFooter( { switchPage, cart }) {
    const [isTranslateVisible, setTranslateVisible] = useState(false);
    useEffect(() => {
        // Clear the googtrans cookie to reset translation to English
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }, []);

    useEffect(() => {
        
        /* const moveShowOriginal = () => {
            const showOriginal = document.getElementById(':1.restore');
            const container = document.getElementById('google_translate_element');
            console.log("inside moveShowOriginal");
            console.log("original is: ", showOriginal);
            if(showOriginal && container) {
                if(!container.contains(showOriginal)) {
                    console.log("moving original");
                    container.appendChild(showOriginal);
                }
            }
        }; */

        const script = document.createElement('script');
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
        
        window.googleTranslateElementInit = function () {
            const container = document.getElementById('google_translate_element');
            if (container) {
                container.innerHTML = ''; // Clear container before initializing
                new window.google.translate.TranslateElement({ pageLanguage: 'en'/* , layout: google.translate.TranslateElement.InlineLayout.SIMPLE  */}, 'google_translate_element');
                /* moveShowOriginal(); */
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

    /* useEffect(() => {
        if (isTranslateVisible) {
            const container = document.getElementById("google_translate_element");
            if (container) {
                container.innerHTML = '';
                window.googleTranslateElementInit();
            }
          
        }
      }, [isTranslateVisible]); */

    return(
        <footer className="flex justify-between items-center pl-20 pr-20 w-full h-16">
            <button className="text-black text-xl p-2 pl-4 pr-4 bg-red-500 rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => switchPage('customerStartPage')} >Cancel Order</button>
            <div className="relative">
                <button className='text-black text-xl p-2 pl-4 pr-4 bg-red-500 rounded hover:bg-blue-200 hover:text-blue-600 transition-colors' onClick={() => handleButtonClick()}>Translate</button>
                {/* The translate element is always in the DOM, but visibility is controlled by className */}
                <div id="google_translate_element" className={`flex flex-row absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white shadow-lg border rounded z-50 ${isTranslateVisible ? '' : 'hidden'}`} />
            </div>
            <button className="text-black text-xl p-2 pl-4 pr-4 bg-red-500 rounded hover:bg-gray-800 hover:text-red-300 transition-colors" onClick={() => switchPage('customerMainMenuPage', cart)}>Go Back</button>
        </footer>
    );
}


{/* <div className="relative group">
                <div className='cursor-pointer text-black text-xl p-2 pl-4 pr-4 bg-red-500 rounded hover:bg-blue-200 hover:text-blue-600 transition-colors'>Translate</div>
                <div className="hidden group-hover:flex absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white shadow-lg border rounded z-50">
                    <div id="google_translate_element"></div>
                </div>
            </div> */}