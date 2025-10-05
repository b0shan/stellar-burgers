import { FC } from 'react';
import { TIngredient } from '@utils-types';
import styles from './order-info.module.css';

type TOrderInfo = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
  ingredientsInfo: {
    [key: string]: TIngredient & { count: number };
  };
  date: Date;
  total: number;
};

type OrderInfoUIProps = {
  orderInfo: TOrderInfo;
};

export const OrderInfoUI: FC<OrderInfoUIProps> = ({ orderInfo }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Детали заказа</h2>
    <div className={styles.orderNumber}>
      #{String(orderInfo.number).padStart(6, '0')}
    </div>
    <div className={styles.orderName}>{orderInfo.name}</div>
    <div className={styles.orderStatus}>{orderInfo.status}</div>
    <div className={styles.ingredients}>
      <h3>Состав:</h3>
      {Object.values(orderInfo.ingredientsInfo).map((ingredient) => (
        <div key={ingredient._id} className={styles.ingredient}>
          <img src={ingredient.image} alt={ingredient.name} />
          <span>{ingredient.name}</span>
          <span>
            {ingredient.count} x {ingredient.price}
          </span>
        </div>
      ))}
    </div>
    <div className={styles.total}>Итого: {orderInfo.total}</div>
  </div>
);
