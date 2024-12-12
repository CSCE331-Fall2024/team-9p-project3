import { useEffect, useState } from 'react';
// This function implements the backend codes for Order History 
// However, our team decides to discard the Order History function. 
export default function OrderHistory() {
  // Declare state variables and functions to update it.          
  // The initial value of each state variables is set by useState.
  const [orders, setOrders] = useState([]);
  
  // The function sends a POST request. 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // The Path of specific API endpoint
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
