describe('E2E тесты конструктора бургеров - все требования', () => {
  beforeEach(() => {
    // Перехватываем все запросы
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    
    // Подставляем токены авторизации
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    
    cy.visit('/');
    
    // Ждем загрузки
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    // Очищаем токены после теста
    cy.clearCookies();
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });

  describe('1. Добавление ингредиентов в конструктор', () => {
    it('Добавляет булку в конструктор', () => {
      cy.get('[data-testid^="ingredient-bun-"]').first()
        .find('button').contains('Добавить').click();
      
      cy.get('[data-testid="constructor-bun-top"]').should('exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
      cy.contains('Выберите булки').should('not.exist');
    });

    it('Добавляет начинку в конструктор', () => {
      // Сначала булка
      cy.get('[data-testid^="ingredient-bun-"]').first()
        .find('button').contains('Добавить').click();
      
      // Потом начинка
      cy.get('[data-testid^="ingredient-main-"]').first()
        .find('button').contains('Добавить').click();
      
      cy.get('[data-testid^="constructor-item-"]').should('exist');
      cy.contains('Выберите начинку').should('not.exist');
    });
  });

  describe('2. Модальное окно ингредиента', () => {
    it('Открывает и закрывает модальное окно', () => {
      cy.get('[data-testid^="ingredient-link-"]').first().click();
      cy.contains('Детали ингредиента').should('exist');
      
      cy.get('body').click(10, 10);
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('Закрывает модальное окно по клику на крестик (если есть)', () => {
      cy.get('[data-testid^="ingredient-link-"]').first().click();
      cy.contains('Детали ингредиента').should('exist');
      
      cy.get('body').then(($body) => {
        const closeButton = $body.find('[class*="close"]').first();
        if (closeButton.length > 0) {
          cy.wrap(closeButton).click();
          cy.contains('Детали ингредиента').should('not.exist');
        }
      });
    });
  });

  describe('3. Соответствие данных в модальном окне', () => {
    it('Отображает данные выбранной булки', () => {
      cy.contains('Краторная булка N-200i').click();
      
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('1255').should('exist');
      cy.contains('420').should('exist'); 
      cy.contains('80').should('exist');  
    });

    it('Отображает данные выбранной начинки', () => {
      cy.contains('Биокотлета из марсианской Магнолии').click();
      
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.contains('424').should('exist');
      cy.contains('4242').should('exist'); 
      cy.contains('420').should('exist');  
    });
  });

  describe('4. Создание заказа', () => {
    it('Оформляет заказ и проверяет весь процесс', () => {
      // Мокаем создание заказа
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
      
      // Добавляем ингредиенты
      cy.get('[data-testid^="ingredient-bun-"]').first()
        .find('button').contains('Добавить').click();
      
      cy.get('[data-testid^="ingredient-main-"]').first()
        .find('button').contains('Добавить').click();
      
      // Проверяем что кнопка активна
      cy.get('[data-testid="order-button"]').should('not.be.disabled');
      
      // Оформляем заказ
      cy.get('[data-testid="order-button"]').click();
      
      // Ждем создания заказа
      cy.wait('@createOrder');
      
      // Проверяем модальное окно с номером заказа
      cy.contains('идентификатор заказа').should('exist');
      cy.contains('12345').should('exist');
      
      // Закрываем модальное окно
      cy.get('body').click(10, 10);
      
      // Проверяем что конструктор очистился
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-testid="total-price"]').should('have.text', '0');
      cy.get('[data-testid="order-button"]').should('be.disabled');
    });
  });
});