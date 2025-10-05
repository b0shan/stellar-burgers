import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { createOrder, clearOrder } from '../../slices/burgerSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bun, ingredients } = useSelector((state) => state.burger.constructor);
  const user = useSelector((state) => state.burger.user.data);
  const { data: orderData, loading: orderRequest } = useSelector(
    (state) => state.burger.order
  );

  const constructorItems = {
    bun,
    ingredients: ingredients as TConstructorIngredient[]
  };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ing) => ing._id),
      bun._id
    ];

    console.log('Creating order with:', ingredientIds);
    dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((s: number, v: TIngredient) => s + v.price, 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
