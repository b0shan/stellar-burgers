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

  // Загружаем ленту заказов если orders не переданы
  useEffect(() => {
    if (!orders) {
      dispatch(fetchFeed());
    }
  }, [dispatch, orders]);

  // Если orders переданы (для профиля), используем их, иначе используем ленту
  const ordersToDisplay = orders || feedOrders;

  const orderByDate = [...ordersToDisplay].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
