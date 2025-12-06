/// <reference types="cypress" />

describe('Конструктор бургеров', () => {
  
  // 1. НАСТРОЙКА ПЕРЕХВАТА ЗАПРОСОВ

  beforeEach(() => {
    // 1.1 Перехват запроса ингредиентов
    cy.intercept('GET', '**/api/ingredients*', { 
      fixture: 'ingredients.json' 
    }).as('getIngredients');
    
    // 1.2 Перехват запроса данных пользователя
    cy.intercept('GET', '**/api/auth/user*', { 
      fixture: 'user.json' 
    }).as('getUser');
    
    // 1.3 Перехват запроса создания заказа
    cy.intercept('POST', '**/api/orders*', { 
      fixture: 'order.json' 
    }).as('createOrder');
    
    // 1.4 Подстановка моковых токенов авторизации
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    
    // 1.5 Открытие главной страницы
    cy.visit('http://localhost:4000');
    
    // 1.6 Ожидание загрузки 
    cy.wait('@getIngredients');
    
    // Ждем немного для полной загрузки компонентов
    cy.wait(1000);
  });


  // 2. ТЕСТИРОВАНИЕ ДОБАВЛЕНИЯ ИНГРЕДИЕНТОВ
  
  describe('Добавление ингредиентов в конструктор', () => {
    
    it('2.1 Добавляет один ингредиент (минимальное требование)', () => {
      // Ищем первую кнопку "Добавить" у ингредиента
      cy.get('[data-testid^="ingredient-add-button-"]').first().click();
      
      // Проверяем что ингредиент добавился в конструктор
      // Ищем элемент в конструкторе 
      cy.get('[data-testid^="constructor-"]').not('[data-testid*="empty"]').should('exist');
    });

    it('2.2 Добавляет булку', () => {
      // Ищем первую кнопку "Добавить" у булки
      cy.get('[data-testid^="ingredient-bun-"]').first()
        .find('[data-testid^="ingredient-add-button-"]').click();
      
      // Проверяем что булка добавилась вверх и вниз
      cy.get('[data-testid="constructor-bun-top"]').should('exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
      
      // Проверяем что исчезли сообщения "Выберите булки"
      cy.get('[data-testid="empty-bun-top"]').should('not.exist');
      cy.get('[data-testid="empty-bun-bottom"]').should('not.exist');
    });

    it('2.3 Добавляет начинку', () => {
      // Сначала добавляем булку 
      cy.get('[data-testid^="ingredient-bun-"]').first()
        .find('[data-testid^="ingredient-add-button-"]').click();
      
      // Добавляем начинку 
      cy.get('[data-testid^="ingredient-main-"]').first()
        .find('[data-testid^="ingredient-add-button-"]').click();
      
      // Проверяем начинку в конструкторе
      cy.get('[data-testid^="constructor-filling-"]').should('exist');
      
      // Проверяем что исчезло сообщение "Выберите начинку"
      cy.get('[data-testid="empty-fillings"]').should('not.exist');
    });

    it('2.4 Добавляет булку и начинку вместе', () => {
      // Булки
      cy.get('[data-testid^="ingredient-bun-"]').first()
        .find('[data-testid^="ingredient-add-button-"]').click();
      
      // Начинка
      cy.get('[data-testid^="ingredient-main-"]').first()
        .find('[data-testid^="ingredient-add-button-"]').click();
      
      // Соус
      cy.get('[data-testid^="ingredient-sauce-"]').first()
        .find('[data-testid^="ingredient-add-button-"]').click();
      
      // Проверяем все элементы
      cy.get('[data-testid="constructor-bun-top"]').should('exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
      cy.get('[data-testid^="constructor-filling-"]').should('have.length', 2);
      
      // Проверяем общую стоимость
      cy.get('[data-testid="total-price"]').should('not.contain', '0');
    });
  });

 
  // 3. ТЕСТИРОВАНИЕ МОДАЛЬНЫХ ОКОН
 
  describe('Работа модальных окон', () => {
    
    it('3.1 Открывает модальное окно ингредиента', () => {
      // Ждем полной загрузки
      cy.wait(500);
      
      // Кликаем на ингредиент (ссылку или картинку)
      cy.get('[data-testid^="ingredient-link-"]').first().click();
      
      // Проверяем что модалка открылась
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="ingredient-details"]').should('exist');
      
      // Проверяем что есть название ингредиента
      cy.get('[data-testid="ingredient-details-name"]').should('exist');
    });

    it('3.2 Закрывает модальное окно по клику на крестик', () => {
      // Открываем модалку
      cy.get('[data-testid^="ingredient-link-"]').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');
      
      // Закрываем крестиком
      cy.get('[data-testid="modal-close-button"]').click();
      
      // Проверяем закрытие
      cy.get('[data-testid="modal"]').should('not.exist');
      
      // Проверяем что вернулись на главную страницу
      cy.contains('Соберите бургер').should('be.visible');
    });

    it('3.3 Закрывает модальное окно по клику на оверлей', () => {
      // Открываем модалку
      cy.get('[data-testid^="ingredient-link-"]').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');
      
      // Закрываем через оверлей
      cy.get('[data-testid="modal-overlay"]').click({ force: true });
      
      // Проверяем закрытие
      cy.get('[data-testid="modal"]').should('not.exist');
    });
    
    it('3.4 Закрывает модальное окно по нажатию Escape', () => {
      // Открываем модалку
      cy.get('[data-testid^="ingredient-link-"]').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');
      
      // Нажимаем Escape
      cy.get('body').type('{esc}');
      
      // Проверяем закрытие
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });


  // 4. ТЕСТИРОВАНИЕ СОЗДАНИЯ ЗАКАЗА

  describe('Создание заказа', () => {
    
    beforeEach(() => {
      // Собираем бургер 
      // Булки
      cy.get('[data-testid^="ingredient-bun-"]').first()
        .find('[data-testid^="ingredient-add-button-"]').click();
      
      // Начинка
      cy.get('[data-testid^="ingredient-main-"]').first()
        .find('[data-testid^="ingredient-add-button-"]').click();
      
      // Проверяем что кнопка активна
      cy.get('[data-testid="order-button"]').should('not.be.disabled');
    });

    it('4.1 Создает заказ и проверяет номер', () => {
      // Нажимаем кнопку "Оформить заказ"
      cy.get('[data-testid="order-button"]').click();
      
      // Ждем запрос создания заказа
      cy.wait('@createOrder');
      
      // Проверяем что модальное окно открылось
      cy.get('[data-testid="order-details-modal"]').should('be.visible');
      
      // Проверяем что номер заказа верный (12345 из order.json)
      cy.get('[data-testid="order-number"]').should('contain', '12345');
      
      // Проверяем остальной текст в модалке
      cy.contains('идентификатор заказа').should('be.visible');
      cy.contains('Ваш заказ начали готовить').should('be.visible');
    });

    it('4.2 Закрывает модальное окно и проверяет закрытие', () => {
      // Создаем заказ
      cy.get('[data-testid="order-button"]').click();
      cy.wait('@createOrder');
      cy.get('[data-testid="order-details-modal"]').should('be.visible');
      
      // Закрываем модальное окно крестиком
      cy.get('[data-testid="modal-close-button"]').click();
      
      // Проверяем успешность закрытия
      cy.get('[data-testid="order-details-modal"]').should('not.exist');
      
      // Проверяем что вернулись на главную
      cy.contains('Соберите бургер').should('be.visible');
    });

    it('4.3 Проверяет что конструктор пуст после заказа', () => {
      // Создаем заказ
      cy.get('[data-testid="order-button"]').click();
      cy.wait('@createOrder');
      
      // Закрываем модалку
      cy.get('[data-testid="modal-close-button"]').click();
      
      // Проверяем что конструктор очистился
      cy.get('[data-testid="empty-bun-top"]').should('exist');
      cy.get('[data-testid="empty-bun-bottom"]').should('exist');
      cy.get('[data-testid="empty-fillings"]').should('exist');
      cy.get('[data-testid="total-price"]').should('contain', '0');
      
      // Проверяем что кнопка снова заблокирована
      cy.get('[data-testid="order-button"]').should('be.disabled');
    });
  });
});