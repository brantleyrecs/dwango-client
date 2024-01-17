import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getItems } from '../../../../utils/data/itemData';
import AddItemCard from '../../../../components/cards/AddItemCard';
import { addItem } from '../../../../utils/data/orderData';

const initialState = {
  item: '',
};

function AddItems({ obj }) {
  const [items, setItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(initialState);
  // const [itemObj, setItemObj] = useState({});
  const router = useRouter();
  // const { id } = router.query ?? {};

  // const addThisItem = (e) => {
  //   e.preventDefault();
  //   if (window.confirm('Add item?')) {
  //     const payload = { item: item.id };
  //     addItem(payload).then(() => {
  //       router.push('/orders');
  //     });
  //   }
  // };

  // const singleItem = (id) => {
  //   getSingleItem(id).then(setItemObj);
  //   console.warn(itemObj);
  // };

  const showItems = () => {
    getItems().then(setItems);
  };

  useEffect(() => {
    showItems();
    setCurrentOrder({
      item: obj.id,
    });
  }, [obj]);

  const addThisItem = (e) => {
    e.preventDefault();
    if (window.confirm('Add item?')) {
      const payload = { ...currentOrder, item: obj.id };
      addItem(payload).then(() => {
        router.push('/orders');
      });
    }
  };

  return (
    <>
      <div className="post-header">
        <h1 className="welcome-text">Orders</h1>
      </div>
      <hr />
      <div
        style={{
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
        }}
      >
        {items.map((item) => (
          <div key={`item--${item.id}`} className="item">
            <AddItemCard
              obj={item}
            />
            <Button className="delete-button" variant="black" name="item" value={item.id} onClick={addThisItem}>Add This Item</Button>
          </div>
        ))}
      </div>
    </>
  );
}

AddItems.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

AddItems.defaultProps = {
  obj: initialState,
};

export default AddItems;
