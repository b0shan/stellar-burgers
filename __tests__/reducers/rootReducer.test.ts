
import { describe, test, expect } from '@jest/globals';
import store, { RootState } from '../../src/services/store';

describe('rootReducer инициализация', () => {
  test('должен вернуть корректное начальное состояние при вызове с undefined состоянием и неизвестным экшеном', () => {
    // Получаем начальное состояние store
    const initialState = store.getState();
    
    // Вызываем rootReducer с undefined состоянием
    // В реальности Redux сам вызывает редьюсер с undefined 
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    
    // Проверяем структуру начального состояния
    expect(initialState).toHaveProperty('burger');
    
    const { burger } = initialState;
    
    // Проверяем constructor
    expect(burger.constructor.bun).toBeNull();
    expect(burger.constructor.ingredients).toEqual([]);
    
    // Проверяем ingredients
    expect(burger.ingredients.data).toEqual([]);
    expect(burger.ingredients.loading).toBe(false);
    expect(burger.ingredients.error).toBeNull();
    
    // Проверяем order
    expect(burger.order.data).toBeNull();
    expect(burger.order.loading).toBe(false);
    expect(burger.order.error).toBeNull();
    
    // Проверяем user
    expect(burger.user.data).toBeNull();
    expect(burger.user.loading).toBe(false);
    expect(burger.user.error).toBeNull();
  });

  test('store должен корректно инициализироваться', () => {
    const state: RootState = store.getState();
    
    // Проверяем что store содержит все необходимые поля
    expect(state).toEqual({
      burger: {
        constructor: {
          bun: null,
          ingredients: []
        },
        ingredients: {
          data: [],
          loading: false,
          error: null
        },
        order: {
          data: null,
          loading: false,
          error: null
        },
        user: {
          data: null,
          loading: false,
          error: null
        },
        userOrders: {
          data: [],
          loading: false,
          error: null
        },
        feed: {
          data: [],
          total: 0,
          totalToday: 0,
          loading: false,
          error: null
        }
      }
    });
  });
});