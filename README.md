
# POS System for Fast Food Restaurants

## Overview
This is a Point of Sale (POS) system built for fast food restaurants. The application is developed using Next.js and Firebase to provide a robust, modular, and user-friendly interface for managing orders, employees, and menu items. It connects to a PostgreSQL database for data persistence.

---

## Features
### Key Features
- **Order Management**: Add, update, and view orders in real-time.
- **User Roles**:
  - Employees: Place and manage orders.
  - Managers: Manage employees and view detailed order history.
- **Firebase Authentication**: Secure role-based access control.
- **Responsive UI**: Works seamlessly across desktop and mobile devices.
- **Modular Design**:
  - Menu items, employees, and orders are handled via separate, reusable components.
  - Context and state management to streamline data flow.

### Technologies Used
- **Frontend**: Next.js, React
- **Authentication**: Firebase Authentication with Admin SDK
- **Backend**: PostgreSQL with custom API routes
- **Environment Management**: `.env.local` for secure environment variables
- **Styling**: Tailwind CSS
- **Version Control**: Git & GitHub

### Folder Structure:
- `database_setup/`: Contains database configuration files and scripts for setting up and managing the backend database.
- `public/`: Static files like images and icons.
- `src/app/components/`: Reusable UI components used throughout the application.
- `src/app/fonts/`: Custom fonts used for styling the application.
- `src/app/objects/`: Define cart-related classes in the cartObject.js file.  
- `src/app/pages/`: Main application pages, categorized by user roles:
  - `api/`: Contains all API route handlers. Each subfolder or file represents a specific service.
  - `customerView/`: Pages for customer interactions.
  - `employeeView/`: Employee-specific pages.
  - `managerView/`: Management functionalities like inventory, menu,usrage chart, and reports.
  - `loginPage.js`: A page facilitating login functionality for employees and managers.
  - `start.js`: Start page for this POS system. 
- Global configuration files (`globals.css`, `next.config.js`).


---

## Setup Guide
### Prerequisites
1. **Node.js**: Ensure you have Node.js installed (v16+ recommended).
2. **PostgreSQL**: Set up a PostgreSQL server for the database.
3. **Firebase Project**: Create a Firebase project and configure Authentication and Admin SDK.
4. **Environment Variables**: Add the required keys to a `.env.local` file.

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/CSCE331-Fall2024/team-9p-project3.git
   cd pos-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Visit the application at `http://localhost:3000`.

---

## API Endpoints
| Method | Endpoint                     | Description                     |
|--------|------------------------------|---------------------------------|
| POST   | `/api/employee/create`       | Add a new employee              |
| GET    | `/api/employee/read`         | Fetch all employees             |
| POST   | `/api/employee/delete`       | Remove an employee              |
| POST   | `/api/order/create`          | Place a new order               |
| GET    | `/api/order/read`            | Fetch all orders                |

---

## Contributors
- **Kyle Easton**: Full Stack
- **Truman Harp**: Full Stack
- **Mario Torres Ramos**: Full Stack (Frontend Focus)
- **Yuan Wang**: Full Stack (Backend Focus)
