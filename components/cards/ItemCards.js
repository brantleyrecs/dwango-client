import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { removeItem } from '../../utils/data/orderData';

export default function ItemCard({ obj, orderDetails }) {
  const removeThisItem = () => {
    removeItem(obj.id).then(() => {
      window.location.reload();
    });
  };

  function RemoveButton() {
    return <Button className="delete-button" variant="black" onClick={removeThisItem}>Remove Item</Button>;
  }

  function NoRemoveButton() {
    return <div />;
  }

  function Buttons() {
    const isOpen = orderDetails.status;
    if (isOpen === 'Open') {
      return <RemoveButton />;
    }
    return <NoRemoveButton />;
  }

  return (
    <>
      <Card className="card" style={{ width: '18rem', margin: '20px' }}>
        <Card.Body>
          <Card.Title>{obj.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{obj.price}</Card.Subtitle>
          <Buttons />
        </Card.Body>
      </Card>
    </>
  );
}

ItemCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  orderDetails: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
};
