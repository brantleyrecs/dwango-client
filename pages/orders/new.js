import Head from 'next/head';
import OrderForm from '../../components/forms/OrderForm';
import { useAuth } from '../../utils/context/authContext';

const NewOrder = () => {
  const { user } = useAuth();
  return (
    <div>
      <Head>
        <title>New Order</title>
      </Head>
      <h2>Create New Order</h2>
      <OrderForm user={user} />
    </div>
  );
};

export default NewOrder;
