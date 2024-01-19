import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleOrder } from '../../../utils/data/orderData';
import OrderForm from '../../../components/forms/OrderForm';

export default function EditOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState({});

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
  }, [id]);

  return <OrderForm orderObj={order} />;
}
