/// <reference types="cypress" />

describe('Конструктор бургеров - основные тесты', () => {
  
  beforeEach(() => {
    // Мокем API запросы
    cy.intercept('GET', 'api/ingredients', { 
      fixture: 'ingredients.json' 
    }).as('getIngredients');
    
    cy.intercept('GET', 'api/auth/user', { 
      fixture: 'user.json' 
    }).as('getUser');
    
    cy.intercept('POST', 'api/orders', { 
      fixture: 'order.json' 
    }).as('createOrder');
    
    // Авторизуем пользователя
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    
    // Открываем главную страницу
    cy.visit('/');
    
    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
  });
});