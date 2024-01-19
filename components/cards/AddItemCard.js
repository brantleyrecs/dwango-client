import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';

export default function AddItemCard({ obj }) {
  return (
    <>
      <Form>
        {['checkbox'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="1"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="2"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              disabled
              label="3 (disabled)"
              type={type}
              id={`inline-${type}-3`}
            />
          </div>
        ))}
      </Form>
      <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
        <option value={obj.id}>{obj.name} || {obj.price}</option>
      </Form.Select>
    </>
  );
}

AddItemCard.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};
