import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import { getSingleItem } from '../../utils/data/itemData';
// import { addItem } from '../../utils/data/orderData';

export default function AddItemCard({ obj }) {
  // const [itemObj, setItemObj] = useState({});
  // const router = useRouter();

  // const singleItem = (id) => {
  //   getSingleItem(id).then(setItemObj);
  // };

  // const addThisItem = () => {
  //   if (window.confirm('Add item?')) {
  //     addItem(obj.id).then(() => {
  //       router.push('../../../orders');
  //     });
  //   }
  // };

  // useEffect(() => {
  //   singleItem();
  // }, []);

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
      {/* <Card className="card" style={{ width: '18rem', margin: '20px' }}>
        <Card.Body>
          <Card.Title>{obj.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{obj.price}</Card.Subtitle>
        </Card.Body>
      </Card> */}
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
