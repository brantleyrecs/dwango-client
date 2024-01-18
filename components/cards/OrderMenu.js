import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { useRouter } from 'next/router';
import { getItems } from '../../utils/data/itemData';
// import ItemCard from './ItemCards';
// import AddItemCard from './AddItemCard';
import { addItem } from '../../utils/data/orderData';

const initialState = {
  item: 0,
  order: '',
};

// eslint-disable-next-line react/prop-types
function OrderMenu({ orderId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [modalShow, setModalShow] = React.useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };
  // const router = useRouter();

  const allMenuItems = () => {
    getItems().then(setMenuItems);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.warn(orderId);
    const payload = formInput;
    addItem(orderId, payload).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    allMenuItems();
    setFormInput((prevState) => ({
      ...prevState,
      item: menuItems.id,
      order: orderId,
    }));
  }, [menuItems.id, orderId]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Item
      </Button>
      <Modal
        show={modalShow}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Order Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingSelect">
            <Form.Select
              aria-label="Item"
              name="item"
              onChange={handleChange}
              value={formInput.item}
              onSelect={console.warn(formInput)}
              // onSelect={console.warn(formInput.id)}
              className="mb-3"
            >
              <option value="">Select an Item</option>
              {
              menuItems.map((items) => (
                <>
                  <option
                    key={items?.id}
                    value={items?.id}
                  >
                    {items.name}
                  </option>
                </>
              ))
            }
            </Form.Select>
          </FloatingLabel>
          <Button className="delete-button" variant="black" onClick={handleSubmit}>Add</Button>
        </Modal.Body>
        <Modal.Footer>
          {/* eslint-disable-next-line react/destructuring-assignment, react/prop-types */}
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderMenu;
