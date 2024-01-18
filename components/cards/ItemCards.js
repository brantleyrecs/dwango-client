import PropTypes from 'prop-types';
import React from 'react';
// import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { removeItem } from '../../utils/data/orderData';

export default function ItemCard({ obj }) {
  // const router = useRouter();
  // const { id } = router.query ?? {};

  const removeThisItem = () => {
    removeItem(obj.id).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <Card className="card" style={{ width: '18rem', margin: '20px' }}>
        <Card.Body>
          <Card.Title>{obj.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{obj.price}</Card.Subtitle>
          <Button className="delete-button" variant="black" onClick={removeThisItem}>Remove Item</Button>
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
};
