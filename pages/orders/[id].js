import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { getSingleOrder, deleteOrder } from '../../utils/data/orderData';
// import { getItems } from '../../utils/data/itemData';
import ItemCard from '../../components/cards/ItemCards';
// import { useAuth } from '../../utils/context/authContext';

function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [items, setItems] = useState([]);
  const router = useRouter();
  const { id } = router.query ?? {};

  setTimeout(() => {
    setItems(orderDetails.items);
  }, 1);

  const deleteThisOrder = () => {
    if (window.confirm('Delete order?')) {
      deleteOrder(id).then(() => {
        router.push('/orders');
      });
    }
  };

  useEffect(() => {
    getSingleOrder(id).then(setOrderDetails);
  }, [id]);

  return (
    <>
      <Head>
        <title>{orderDetails?.customer_name}</title>
      </Head>
      <Card style={{ width: '18rem', marginTop: '30px', marginBottom: '30px' }}>
        <Card.Body>
          <Card.Title>{orderDetails?.customer_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Phone #: {orderDetails?.phone_number}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted"> email: {orderDetails?.email}</Card.Subtitle>
          <Card.Text style={{ fontSize: '10px' }}>
            Status: {orderDetails?.status} || Order Type: {orderDetails?.order_type}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* <button type="button" style={{ marginTop: '20px', marginBottom: '20px' }} href={`../orders/edit/${orderDetails.id}`}>Edit Order</button> */}
      <Button className="delete-button" variant="black" onClick={deleteThisOrder}>Delete This Order</Button>
      <Button className="delete-button" variant="black" href={`/orders/edit/${orderDetails.id}`}>Edit This Post</Button>

      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', margin: '20px',
      }}
      >
        {items?.map((item) => (
          <div key={`item--${item.id}`} className="item">
            <ItemCard
              obj={item}
              // onUpdate={showOrders}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewOrder;
