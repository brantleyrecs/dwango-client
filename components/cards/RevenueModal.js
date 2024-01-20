import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import DateObject from 'react-date-object';
import { createRevenueNode, closeOrder } from '../../utils/data/orderData';

const initialState = {
  id: 0,
  orderId: 0,
  totalOrderAmount: 0,
  dateOfClosure: '',
  paymentType: '',
  tipAmount: 0,
};

function RevenueNode({ orderDetails, revObj }) {
  const [modalShow, setModalShow] = useState(false);
  const [revenue, setRevenue] = useState(initialState);
  const router = useRouter();

  const date = new DateObject({
    date: new Date(),
    format: 'YYYY-MM-DD',
  });

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const calculateOrderTotal = () => {
    if (orderDetails.id && orderDetails.items.length > 0) {
      const total = orderDetails.items.reduce((acc, item) => acc + parseFloat(item.price), 0);
      return total.toFixed(2);
    }
    return '0.00';
  };

  const calculateFinalTotal = Number(revenue.tipAmount) + Number(calculateOrderTotal());

  useEffect(() => {
    if (orderDetails.id) {
      setRevenue({
        id: revObj?.id,
        orderId: orderDetails.id,
        totalOrderAmount: Number(calculateFinalTotal),
        dateOfClosure: revenue.dateOfClosure,
        paymentType: revObj?.payment_type,
        tipAmount: Number(revenue.tipAmount),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRevenue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const close = { ...orderDetails, status: 'closed' };
    closeOrder(orderDetails.id, close);

    const payload = { ...revenue };

    payload.orderId = orderDetails.id;
    payload.totalOrderAmount = Number(calculateFinalTotal);
    payload.dateOfClosure = date.format();
    payload.tipAmount = revenue.tipAmount;
    payload.paymentType = revenue.paymentType;

    createRevenueNode(payload)
      .then(() => router.push('/'));
  };

  return (
    <>
      <button className="button" onClick={handleShow} type="button">Close Order</button>
      <Modal
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
              <p value={revenue.dateOfClosure}>{date.format()}</p>
              <p>{calculateOrderTotal()}</p>
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
              <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
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
    // eslint-disable-next-line react/forbid-prop-types
    items: PropTypes.array,
  }).isRequired,
  revObj: PropTypes.shape({
    id: PropTypes.number,
    total_order_amount: PropTypes.number,
    date: PropTypes.string,
    payment_type: PropTypes.string,
    tipAmount: PropTypes.number,
  }),
};

RevenueNode.defaultProps = {
  revObj: {
  },
};

export default RevenueNode;
