import { FC, memo, useEffect } from 'react';
import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../slices/burgerSlice';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const dispatch = useDispatch();
  const { data: feedOrders, loading } = useSelector(
    (state) => state.burger.feed
  );

  useEffect(() => {
    if (!orders) {
      dispatch(fetchFeed());
    }
  }, [dispatch, orders]);

  const ordersToDisplay = orders || feedOrders;

  const orderByDate = [...ordersToDisplay].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
