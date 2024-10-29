"use client";
import { useState } from 'react';
import StartPage from './pages/start';
import CustomerStartPage from './pages/customerStart';
import CustomerMainMenuPage from './pages/customerMainMenu';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('startPage'); // Initial page state

  // Function to switch pages
  const switchPage = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'startPage':
        return <StartPage switchPage={switchPage}/>;
      case 'customerStartPage':
        return <CustomerStartPage switchPage={switchPage} />;
      case 'customerMainMenuPage':
        return <CustomerMainMenuPage switchPage={switchPage} />;
      default:
        return <StartPage switchPage={switchPage}/>;
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
