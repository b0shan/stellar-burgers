import React, { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './burger-ingredient.module.css';
import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';
import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd }) => {
    const location = useLocation();
    const { image, price, name, _id, type } = ingredient;

    return (
      <li 
        className={styles.container}
        data-testid={`ingredient-${type}-${_id}`}
      >
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={{ background: location }}
          data-testid={`ingredient-link-${_id}`}
        >
          {count && (
            <Counter 
              count={count} 
              data-testid={`ingredient-counter-${_id}`}
            />
          )}
          <img 
            className={styles.img} 
            src={image} 
            alt='картинка ингредиента.'
            data-testid="ingredient-image"
          />
          <div 
            className={`${styles.cost} mt-2 mb-2`}
            data-testid="ingredient-price-container"
          >
            <p 
              className='text text_type_digits-default mr-2'
              data-testid="ingredient-price"
            >
              {price}
            </p>
            <CurrencyIcon type='primary' />
          </div>
          <p 
            className={`text text_type_main-default ${styles.text}`}
            data-testid="ingredient-name"
          >
            {name}
          </p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAdd();
          }}
          extraClass={`${styles.addButton} mt-8`}
          data-testid={`ingredient-add-button-${_id}`}
        />
      </li>
    );
  }
);