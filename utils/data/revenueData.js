import { clientCredentials } from '../client';

const getRevenue = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/revenue-nodes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getRevenue;
