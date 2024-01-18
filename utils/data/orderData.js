import { clientCredentials } from '../client';

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.warn('Error retrieving order:', error);
      reject(error);
    });
});

const createOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Error: Order not Created:', error);
      reject(error);
    });
});

const updateOrder = (id, currentOrder) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentOrder),
  })
    .then(resolve)
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

const addItem = (id, item) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}/order_item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Error: Item not added:', error);
      reject(error);
    });
});

const removeItem = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_items/${id}`, {
    method: 'DELETE',
  })
    .then(resolve())
    .catch(reject);
});

const createRevenueNode = (node) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/revenue-nodes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(node),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Error: Order not Created:', error);
      reject(error);
    });
});

export {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  addItem,
  removeItem,
  createRevenueNode,
};
