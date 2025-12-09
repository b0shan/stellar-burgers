/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Добавляет первый ингредиент указанного типа в конструктор
       * @param type Тип ингредиента: 'bun', 'main', 'sauce'
       * @example cy.addIngredientByType('bun')
       */
      addIngredientByType(type: string): Chainable<JQuery<HTMLElement>>;
      
      /**
       * Открываем модальное окно ингредиента
       * @param type Тип ингредиента: 'bun', 'main', 'sauce'
       * @example cy.openIngredientModal('main')
       */
      openIngredientModal(type: string): Chainable<JQuery<HTMLElement>>;
      
      /**
       * Проверяем что ингредиенты успешно загрузились
       * @example cy.checkIngredientsLoaded()
       */
      checkIngredientsLoaded(): Chainable<void>;
      
      /**
       * Проверяем счетчик ингредиента
       * @param ingredientId ID ингредиента
       * @param expectedCount Ожидаемое значение счетчика
       * @example cy.checkIngredientCounter('643d69a5c3f7b9001cfa093c', 2)
       */
      checkIngredientCounter(ingredientId: string, expectedCount: number): Chainable<void>;
      
      /**
       * Создаем заказ и проверяем модальное окно
       * @example cy.createOrder()
       */
      createOrder(): Chainable<void>;
      
      /**
       * Получаем ингредиент по ID
       * @param ingredientId ID ингредиента
       * @example cy.getIngredientById('643d69a5c3f7b9001cfa093c')
       */
      getIngredientById(ingredientId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};