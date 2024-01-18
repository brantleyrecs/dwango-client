import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { getSingleOrder, deleteOrder } from '../../utils/data/orderData';
// import { getItems } from '../../utils/data/itemData';
import ItemCard from '../../components/cards/ItemCards';
import OrderMenu from '../../components/cards/OrderMenu';
import RevenueNode from '../../components/cards/RevenueModal';

function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
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
  console.warn(orderDetails);

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
      <Button className="delete-button" variant="black" href={`/orders/edit/${orderDetails.id}`}>Edit Order</Button>

      {/* MODAL */}
      <OrderMenu orderId={orderDetails.id} show={modalShow} onHide={() => setModalShow(false)} />

      <RevenueNode orderDetails={orderDetails} show={modalShow} onHide={() => setModalShow(false)} />

      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', margin: '20px',
      }}
      >
        {items?.map((item) => (
          <div key={`item--${item.id}`} className="item">
            <ItemCard
              obj={item}
              orderId={orderDetails.id}
              // onUpdate={showOrders}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewOrder;
