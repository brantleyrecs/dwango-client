import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function OrderCard({ obj }) {
  return (
    <>
      <Link href={`/orders/${obj.id}`} passHref>
        <Card className="card" style={{ cursor: 'pointer', margin: '20px' }}>
          <Card.Body>{obj.customer_name}</Card.Body>
          <Card.Body>{obj.phone_number}</Card.Body>
        </Card>
      </Link>
    </>
  );
}

OrderCard.propTypes = {
  obj: PropTypes.shape({
    customer_name: PropTypes.string,
    phone_number: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};
