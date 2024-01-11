import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getSingleOrder } from '../../utils/data/orderData';
// import { useAuth } from '../../utils/context/authContext';

function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const router = useRouter();
  const { id } = router.query ?? {};

  useEffect(() => {
    getSingleOrder(id).then(setOrderDetails);
  }, [id]);

  return (
    <>
      <Head>
        <title>{orderDetails?.customer_name}</title>
      </Head>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{orderDetails?.customer_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Phone #: {orderDetails?.phone_number}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted"> email: {orderDetails?.email}</Card.Subtitle>
          <Card.Text style={{ fontSize: '10px' }}>
            Status: {orderDetails?.status} || Order Type: {orderDetails?.order_type}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default ViewOrder;
