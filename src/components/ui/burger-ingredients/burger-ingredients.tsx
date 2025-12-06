import React, { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick
  }) => (
    <>
      <section 
        className={styles.burger_ingredients}
        data-testid="ingredients-section"
      >
        <nav>
          <ul className={styles.menu}>
            <Tab 
              value='bun' 
              active={currentTab === 'bun'} 
              onClick={onTabClick}
              data-testid="tab-buns"
            >
              Булки
            </Tab>
            <Tab
              value='main'
              active={currentTab === 'main'}
              onClick={onTabClick}
              data-testid="tab-mains"
            >
              Начинки
            </Tab>
            <Tab
              value='sauce'
              active={currentTab === 'sauce'}
              onClick={onTabClick}
              data-testid="tab-sauces"
            >
              Соусы
            </Tab>
          </ul>
        </nav>
        <div 
          className={styles.content}
          data-testid="ingredients-container"
        >
          <IngredientsCategory
            title='Булки'
            titleRef={titleBunRef}
            ingredients={buns}
            ref={bunsRef}
            data-testid="ingredient-category-bun"
          />
          <IngredientsCategory
            title='Начинки'
            titleRef={titleMainRef}
            ingredients={mains}
            ref={mainsRef}
            data-testid="ingredient-category-main"
          />
          <IngredientsCategory
            title='Соусы'
            titleRef={titleSaucesRef}
            ingredients={sauces}
            ref={saucesRef}
            data-testid="ingredient-category-sauce"
          />
        </div>
      </section>
    </>
  )
);