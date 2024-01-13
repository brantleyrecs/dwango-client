import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function ItemCard({ obj }) {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{obj.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{obj.price}</Card.Subtitle>
          <Card.Link href="#">Remove Item</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}

ItemCard.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
