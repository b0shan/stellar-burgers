import React, { FC, memo } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';

export const IngredientDetailsUI: FC<IngredientDetailsUIProps> = memo(
  ({ ingredientData }) => {
    const { name, image_large, calories, proteins, fat, carbohydrates } =
      ingredientData;

    return (
      <div 
        className={styles.content}
        data-testid="ingredient-details"
      >
        <img
          className={styles.img}
          alt='изображение ингредиента.'
          src={image_large}
          data-testid="ingredient-details-image"
        />
        <h3 
          className='text text_type_main-medium mt-2 mb-4'
          data-testid="ingredient-details-name"
        >
          {name}
        </h3>
        <ul 
          className={`${styles.nutritional_values} text_type_main-default`}
          data-testid="ingredient-nutrition-list"
        >
          <li 
            className={styles.nutritional_value}
            data-testid="nutrition-calories"
          >
            <p className={`text mb-2 ${styles.text}`}>Калории, ккал</p>
            <p 
              className={`text text_type_digits-default`}
              data-testid="calories-value"
            >
              {calories}
            </p>
          </li>
          <li 
            className={styles.nutritional_value}
            data-testid="nutrition-proteins"
          >
            <p className={`text mb-2 ${styles.text}`}>Белки, г</p>
            <p 
              className={`text text_type_digits-default`}
              data-testid="proteins-value"
            >
              {proteins}
            </p>
          </li>
          <li 
            className={styles.nutritional_value}
            data-testid="nutrition-fat"
          >
            <p className={`text mb-2 ${styles.text}`}>Жиры, г</p>
            <p 
              className={`text text_type_digits-default`}
              data-testid="fat-value"
            >
              {fat}
            </p>
          </li>
          <li 
            className={styles.nutritional_value}
            data-testid="nutrition-carbohydrates"
          >
            <p className={`text mb-2 ${styles.text}`}>Углеводы, г</p>
            <p 
              className={`text text_type_digits-default`}
              data-testid="carbohydrates-value"
            >
              {carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    );
  }
);