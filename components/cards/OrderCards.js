import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
// import { useAuth } from '../../utils/context/authContext';

export default function OrderCard({ obj }) {
  // const { user } = useAuth();

  return (
    <>
      <Link href={`/orders/${obj.id}`} passHref>
        <Card style={{ cursor: 'pointer', margin: '20px' }}>
          <Card.Body>{obj.customer_name}</Card.Body>
          <Card.Body>{obj.phone_number}</Card.Body>
        </Card>
        {/* <div className="myCard" style={{ cursor: 'pointer' }}>
          <div className="title">
            <Card.Text className="post-title-link">
              {obj.customerName}
            </Card.Text>
          </div>
        </div> */}
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
