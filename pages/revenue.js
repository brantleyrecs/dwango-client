import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import getRevenue from '../utils/data/revenueData';

function Revenue() {
  const [revenue, setRevenue] = useState([]);

  const showRevenue = () => {
    getRevenue().then((data) => setRevenue(data));
  };

  useEffect(() => {
    showRevenue();
  }, []);

  const calculateTotalRevenue = () => {
    const total = revenue.reduce((acc, item) => acc + parseFloat(item.total_order_amount), 0);
    return total.toFixed(2);
  };

  const calculateTotalTip = () => {
    const total = revenue.reduce((acc, item) => acc + parseFloat(item.tip_amount), 0);
    return total.toFixed(2);
  };

  return (
    <>
      <Head>
        <title>Total Revenue</title>
      </Head>
      <div className="revCard">
        <div className="revenueCard">
          <div className="revenueCard2">
            <div className="revenueInfo">
              <br />
              <h1 style={{ marginTop: '20px' }}>Revenue</h1>
              <hr className="new" />
              <br />
              <br />
              <h3>Total Revenue</h3>
              <h6>{calculateTotalRevenue()}</h6>
              <br />
              <h3>Total Tips</h3>
              <h6>{calculateTotalTip()}</h6>
              <div style={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
              }}
              >
                {revenue?.map((rev) => (
                  <div key={`rev--${rev.id}`} className="revenue" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Revenue;
