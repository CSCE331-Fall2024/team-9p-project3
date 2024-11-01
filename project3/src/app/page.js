"use client";
import { useState } from 'react';
import StartPage from './pages/start';
import CustomerStartPage from './pages/customerView/customerStart';
import CustomerMainMenuPage from './pages/customerView/customerMainMenu';
import EntreePage from './pages/customerView/entreePage';
import SidePage from './pages/customerView/sidePage';


export default function Home() {
  const [currentPage, setCurrentPage] = useState('startPage');
  const [param1, setParam1] = useState('');

  // Function to switch pages
  const switchPage = (page, param1=null) => {
    console.log(`Switching to: ${page}, with param: ${param1}`);
    setCurrentPage(page);
    if(param1) {
      setParam1(param1);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'startPage':
        return <StartPage switchPage={switchPage} />;
      case 'customerStartPage':
        return <CustomerStartPage switchPage={switchPage} />;
      case 'customerMainMenuPage':
        return <CustomerMainMenuPage switchPage={switchPage} />;
      case 'entreePage':
        return <EntreePage switchPage={switchPage} numRequired={param1}/>;
      case 'sidePage' :
        return <SidePage switchPage={switchPage}/>;
      default:
        return <StartPage switchPage={switchPage} />;
    }
  };
  return (
    <div>
      <main>
        {/* <h1>{SidePage.name} and {SidePage.name.charAt(0).toLowerCase() + SidePage.name.slice(1)}</h1> */}
        {renderPage()}
      </main>
    </div>
  );
}
