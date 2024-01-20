import React, { useEffect, useState, useRef } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getItems } from '../../utils/data/itemData';
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
  const mountedRef = useRef(true);

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const allMenuItems = () => {
    getItems().then((items) => {
      if (mountedRef.current) {
        setMenuItems(items);
      }
    });
  };
  useEffect(() => {
    allMenuItems();
    setFormInput((prevState) => ({
      ...prevState,
      item: menuItems.id,
      order: orderId,
    }));

    return () => {
      mountedRef.current = false;
    };
  }, [orderId, menuItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = formInput;
    addItem(orderId, payload).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <button className="button" onClick={handleShow} type="button">Add Item</button>
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
              className="mb-3"
            >
              <option value="">Select an Item</option>
              {
              menuItems.map((items) => (
                <option
                  key={items.id}
                  value={items.id}
                >
                  {items.name}
                </option>
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
