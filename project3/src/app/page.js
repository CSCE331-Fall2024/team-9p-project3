"use client";
import { useState } from 'react';
import StartPage from './pages/start';
import CustomerStartPage from './pages/customerStart';
import CustomerMainMenuPage from './pages/customerMainMenu';
import EntreePage from './pages/entreePage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('startPage');
  const [param1, setParam1] = useState('');

  // Function to switch pages
  const switchPage = (page, param1=null) => {
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
      default:
        return <StartPage switchPage={switchPage} />;
    }
  };
  return (
    <div>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}
