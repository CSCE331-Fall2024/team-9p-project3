// export default function OrderHistoryPage({ switchPage }) {
//     const handleGoBack = () => {
//         switchPage('managerMainPage'); // Redirects back to the login page
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
//             <h1 className="text-4xl font-bold mb-8">OrderHistory</h1>
//             <button
//                 onClick={handleGoBack}
//                 className="p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
//             >
//                 Back
//             </button>
//         </div>
//     );
// }

import { useEffect, useState } from 'react';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('./pages/api/orderHistory');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.order_id}>
            <div>
              <strong>Order ID:</strong> {order.order_id}
            </div>
            <div>
              <strong>Menu Item:</strong> {order.menu_item}
            </div>
            <div>
              <strong>Servable Items:</strong> {order.servable_items.join(', ')}
            </div>
            <div>
              <strong>Order Time:</strong> {new Date(order.order_time).toLocaleString()}
            </div>
            <div>
              <strong>Price:</strong> ${order.price.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
