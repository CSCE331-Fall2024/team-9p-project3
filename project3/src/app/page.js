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
  const [param2, setParam2] = useState('');
  const [param3, setParam3] = useState('');

  // Function to switch pages
  const switchPage = (page, param1=null, param2=null, param3=null) => {
    console.log(`Switching to: ${page}, with param1: ${param1}, param2: ${param2}, param3: ${param3}.`);
    setCurrentPage(page);
    if(param1) {
      setParam1(param1);
      if(param2) {
        setParam2(param2);
        if(param3) {
          setParam3(param3);
        }
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'startPage':
        return <StartPage switchPage={switchPage} />;
      case 'customerStartPage':
        return <CustomerStartPage switchPage={switchPage} />;
      case 'customerMainMenuPage':
        return <CustomerMainMenuPage switchPage={switchPage} cart={param1}/>;
      case 'entreePage':
        return <EntreePage switchPage={switchPage} numRequired={param1} cart={param2} newCartObj={param3}/>;
      case 'sidePage' :
        return <SidePage switchPage={switchPage} numEntreesRequired={param1} cart={param2}/>;
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
