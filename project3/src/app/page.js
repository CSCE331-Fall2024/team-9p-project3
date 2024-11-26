"use client";
import { useState, useEffect } from 'react';
//import Head from 'next/head';
import StartPage from './pages/start';
import CustomerStartPage from './pages/customerView/customerStart';
import CustomerMainMenuPage from './pages/customerView/customerMainMenu';
import EntreePage from './pages/customerView/entreePage';
import SidePage from './pages/customerView/sidePage';
import CartPage from './pages/customerView/cartPage';
import AppetizerPage from './pages/customerView/appetizerPage';
import LoginPage from './pages/loginPage';
import ManagerMainPage from './pages/managerView/managerMain';
import EmployeesPage from './pages/managerView/employees';
import InventoryPage from './pages/managerView/inventory';
import MenuItemsPage from './pages/managerView/menuItems';
import OrderHistoryPage from './pages/managerView/orderHistory';
import XReportPage from './pages/managerView/xReport';
import ZReportPage from './pages/managerView/zReport';
import UsageChartPage from './pages/managerView/usageChart';
import EmployeeMainMenuPage from './pages/employeeView/mainMenu';
import EmployeeAppetizerPage from './pages/employeeView/appetizerPage';
import EmployeeCartPage from './pages/employeeView/cartPage';
import EmployeeEntreePage from './pages/employeeView/entreePage';
import EmployeeSidePage from './pages/employeeView/sidePage';
// import { useEffect, useState } from 'react';



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
        } else setParam3('');
      } else setParam2('');
    } else setParam1('');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'startPage':
        return <StartPage switchPage={switchPage} />;
      case 'loginPage':
        return <LoginPage switchPage={switchPage} />;
      case 'managerMainPage':
        return <ManagerMainPage switchPage={switchPage} />;
      case 'employeesPage':
        return <EmployeesPage switchPage={switchPage} />;
      case 'inventoryPage':
        return <InventoryPage switchPage={switchPage} />;
      case 'menuItemsPage':
        return <MenuItemsPage switchPage={switchPage} />;
      case 'orderHistoryPage':
        return <OrderHistoryPage switchPage={switchPage} />;
      case 'xReportPage':
        return <XReportPage switchPage={switchPage} />;
      case 'zReportPage':
        return <ZReportPage switchPage={switchPage} />;
      case 'usageChartPage':
        return <UsageChartPage switchPage={switchPage} />;
      case 'customerStartPage':
        return <CustomerStartPage switchPage={switchPage} />;
      case 'customerMainMenuPage':
        return <CustomerMainMenuPage switchPage={switchPage} cart={param1}/>;
      case 'entreePage':
        return <EntreePage switchPage={switchPage} numRequired={param1} cart={param2} newCartObj={param3}/>;
      case 'sidePage' :
        return <SidePage switchPage={switchPage} numEntreesRequired={param1} cart={param2}/>;
      case 'cartPage' :
        return <CartPage switchPage={switchPage} cart={param1} employee={param2}/>;
      case 'appetizerPage':
        return <AppetizerPage switchPage={switchPage} cart={param2}/>;
      case 'employeeMainMenuPage':
        return <EmployeeMainMenuPage switchPage={switchPage} cart={param1}/>;
      case 'employeeEntreePage':
        return <EmployeeEntreePage switchPage={switchPage} numRequired={param1} cart={param2} newCartObj={param3}/>;
      case 'employeeSidePage' :
        return <EmployeeSidePage switchPage={switchPage} numEntreesRequired={param1} cart={param2}/>;
      /* case 'employeeCartPage' :
        return <EmployeeCartPage switchPage={switchPage} cart={param1}/>; */
      case 'employeeAppetizerPage':
        return <EmployeeAppetizerPage switchPage={switchPage} cart={param2}/>;
      default:
        return <StartPage switchPage={switchPage} />;
    }
  };
  return (
    <div>
      {/* <Head></Head> */}
      <main>
        {/* <h1>{SidePage.name} and {SidePage.name.charAt(0).toLowerCase() + SidePage.name.slice(1)}</h1> */}
        {/*<div id="google_translate_element"></div>*/}
        {renderPage()}
      </main>
    </div>
  );
}
