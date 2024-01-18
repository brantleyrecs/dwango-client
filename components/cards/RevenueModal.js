import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-unresolved
// import { format } from 'date-fns';
// eslint-disable-next-line import/no-extraneous-dependencies
import DateObject from 'react-date-object';
import { createRevenueNode, updateOrder } from '../../utils/data/orderData';

const initialState = {
  id: 0,
  orderId: 0,
  totalOrderAmount: 0,
  dateOfClosure: '',
  paymentType: '',
  tipAmount: 0,
};

function RevenueNode({ orderDetails }) {
  const [modalShow, setModalShow] = useState(false);
  const [revenue, setRevenue] = useState(initialState);
  const router = useRouter();

  const date = new DateObject();

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  useEffect(() => {
    if (orderDetails.id) {
      setRevenue({
        // id: revObj?.id,
        orderId: orderDetails.id,
        // totalOrderAmount: revObj?.total_order_amount,
        // date_of_closure: revObj?.date,
        // paymentType: revObj?.payment_type,
        // tipAmount: revObj?.tipAmount,
      });
    }
  }, [orderDetails.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRevenue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...revenue, orderId: orderDetails.id, date_of_closure: date.toString() };
    createRevenueNode(payload)
      .then(({ closed }) => {
        const patchOrder = { status: closed };
        updateOrder(patchOrder).then(() => router.push('/orders'));
      });
  };

  // const calculateOrderTotal = () => {
  //   if (orderDetails.id && orderDetails.items.length > 0) {
  //     const total = orderDetails.items.reduce((acc, item) => acc + parseFloat(item.price), 0);
  //     return total.toFixed(2);
  //   }
  //   return '0.00';
  // };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Close Order
      </Button>
      <Modal
        onSubmit={handleSubmit}
        show={modalShow}
        onHide={handleClose}
      >
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Order Closing</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>{orderDetails.customer_name}</p>
              <p>{orderDetails.phone_number}</p>
              <p>{date.toString()}</p>
              {/* <p>{calculateOrderTotal()}</p> */}
              <Form>
                {/* Tip Amount */}
                <input type="text" name="tipAmount" className="input" style={{ width: '450px' }} placeholder="Tip Amount" required value={revenue.tipAmount} onChange={handleChange} />

                <select className="input" style={{ width: '450px' }} name="paymentType" value={revenue.paymentType} onChange={handleChange}>
                  <option value="">Select a Payment Type</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </Modal>
    </>
  );
}

RevenueNode.propTypes = {
  orderDetails: PropTypes.shape({
    id: PropTypes.number,
    customer_name: PropTypes.string,
    phone_number: PropTypes.number,
    // items: PropTypes.string,
  }).isRequired,
  revObj: PropTypes.shape({
    id: PropTypes.number,
    total_order_amount: PropTypes.number,
    date: PropTypes.string,
    payment_type: PropTypes.string,
    tipAmount: PropTypes.number,
  }).isRequired,
};

export default RevenueNode;
