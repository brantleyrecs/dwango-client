import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
import { getOrders } from '../utils/data/orderData';
import OrderCard from '../components/cards/OrderCards';

function Orders() {
  const [orders, setOrders] = useState([]);
  // const router = useRouter();

  const showOrders = () => {
    getOrders().then((data) => setOrders(data));
  };

  useEffect(() => {
    showOrders();
  }, []);

  return (
    <>
      <div className="post-header">
        <h1 className="welcome-text">Orders</h1>
      </div>
      <hr />
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {orders.map((order) => (
          <div key={`order--${order.id}`} className="order">
            <OrderCard
              obj={order}
              // onUpdate={showOrders}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Orders;
