import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getOrders } from '../utils/data/orderData';
import OrderCard from '../components/cards/OrderCards';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);

  const showOrders = () => {
    getOrders().then((data) => {
      const open = data.filter((order) => order.status === 'Open');
      const closed = data.filter((order) => order.status === 'closed');
      setOrders(open);
      setClosedOrders(closed);
    });
  };

  useEffect(() => {
    showOrders();
  }, []);

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <div className="post-header">
        <h1 className="welcome-text" style={{ textAlign: 'center' }}>Orders</h1>
        <hr />
        <div className="openCard">
          <div className="openCloseCard">
            <div className="openCloseCard2">
              <h1 className="welcome-text openClosed">Open</h1>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {orders.map((order) => (
          <div key={`order--${order.id}`} className="order">
            <OrderCard
              obj={order}
            />
          </div>
        ))}
      </div>
      <br />
      <div className="post-header">
        <div className="openCard">
          <div className="openCloseCard">
            <div className="openCloseCard2">
              <h1 className="welcome-text openClosed">Closed</h1>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {closedOrders.map((order) => (
          <div key={`order--${order.id}`} className="order">
            <OrderCard
              obj={order}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Orders;
