/// <reference types="cypress" />

// Добавления ингредиента по типу
Cypress.Commands.add('addIngredientByType', (type: string) => {
  
  const selector = `[data-testid^="ingredient-${type}-"]`;
  
  return cy.get(selector).first().as('ingredientContainer').within(() => {
    
    cy.get('[data-testid^="ingredient-add-button-"]').click();
  }).then(() => {
    return cy.get('@ingredientContainer');
  });
});

// Открытие модального окна ингредиента
Cypress.Commands.add('openIngredientModal', (type: string) => {
  const selector = `[data-testid^="ingredient-${type}-"]`;
  
  return cy.get(selector).first().as('ingredientContainer').within(() => {
    
    cy.get('[data-testid^="ingredient-link-"]').click();
  }).then(() => {
    return cy.get('@ingredientContainer');
  });
});

// Проверка загрузки ингредиентов
Cypress.Commands.add('checkIngredientsLoaded', () => {
  cy.get('[data-testid="ingredients-section"]').should('exist');
  cy.get('[data-testid^="ingredient-"]').should('have.length.greaterThan', 0);
});

// Проверка счетчика ингредиента
Cypress.Commands.add('checkIngredientCounter', (ingredientId: string, expectedCount: number) => {
  cy.get(`[data-testid="ingredient-counter-${ingredientId}"]`)
    .should('exist')
    .and('contain', expectedCount.toString());
});

// Команда для создания заказа
Cypress.Commands.add('createOrder', () => {
  // Мокаем запрос
  cy.intercept('POST', '**/api/orders', {
    statusCode: 200,
    body: {
      success: true,
      order: { number: 12345, name: 'Space бургер' }
    }
  }).as('createOrder');
  
  // Нажимаем кнопку оформления заказа
  cy.get('[data-testid="order-button"]').should('not.be.disabled');
  cy.get('[data-testid="order-button"]').click();
  
  // Ждем выполнения запроса
  cy.wait('@createOrder');
  
  // Проверяем модальное окно
  cy.get('[data-testid="order-details-modal"]').should('be.visible');
});

// Команда для получения ингредиента по ID
Cypress.Commands.add('getIngredientById', (ingredientId: string) => {
  return cy.get(`[data-testid="ingredient-${ingredientId}"]`);
});