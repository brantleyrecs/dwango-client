import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, updateOrder } from '../../utils/data/orderData';

const initialState = {
  id: 0,
  customerName: '',
  phoneNumber: 0,
  email: '',
  orderType: '',
  status: 'Open',
  userId: '',
};

const OrderForm = ({ orderObj }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentOrder, setCurrentOrder] = useState(initialState);

  useEffect(() => {
    if (orderObj.id) {
      setCurrentOrder({
        id: orderObj.id,
        customerName: orderObj.customer_name,
        phoneNumber: orderObj.phone_number,
        email: orderObj.email,
        orderType: orderObj.order_type,
        status: orderObj.status,
        userId: user.id,
      });
    }
  }, [orderObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      const payload = {
        id: currentOrder.id,
        title: currentOrder.title,
        imageUrl: currentOrder.image_url,
        content: currentOrder.content,
        categoryId: currentOrder.category,
        publicationDate: currentOrder.publication_date,
        userId: user.id,
      };
      updateOrder(currentOrder.id, payload)
        .then(() => router.push('/orders'));
    } else {
      const payload = { ...currentOrder, userId: user.id };
      createOrder(payload)
        .then(() => router.push('/orders'));
    }
  };

  return (
    <div className="formCard">
      <div className="bg">

        <Form onSubmit={handleSubmit}>

          {/* Customer Name */}
          <input type="text" name="customerName" className="input" placeholder="Customer Name" required value={currentOrder.customer_name} onChange={handleChange} />

          {/* Customer Phone Number */}
          <input type="text" name="phoneNumber" className="input" placeholder="Customer Phone Number" required value={currentOrder.phone_number} onChange={handleChange} />

          {/* Customer Email */}
          <input type="text" name="email" className="input" placeholder="Customer Email" required value={currentOrder.email} onChange={handleChange} />

          {/* Order Type */}
          {/* <input type="text" name="title" className="input" placeholder="Order Type (Phone-in/Walk-in)" required value={currentOrder.order_type} onChange={handleChange} /> */}

          <select className="input" name="orderType" value={currentOrder.order_type} onChange={handleChange}>
            <option value="">Select an Order Type</option>
            <option value="phone_in">Phone-In</option>
            <option value="walk_in">Walk-In</option>
          </select>
          <button type="submit" style={{ marginTop: '20px' }}>{orderObj.id ? 'Update' : 'Create'} Order</button>
          {/* <Button type="submit" style={{ marginTop: '20px' }}>{orderObj.id ? 'Update' : 'Create'} Order</Button> */}
        </Form>
      </div>
      <div className="blob" />
    </div>
  );
};

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customer_name: PropTypes.string.isRequired,
    phone_number: PropTypes.number.isRequired,
    email: PropTypes.string,
    order_type: PropTypes.string.isRequired,
    status: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};

export default OrderForm;