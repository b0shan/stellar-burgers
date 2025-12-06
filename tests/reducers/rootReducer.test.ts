import store from '../../src/services/store';
import type { RootState } from '../../src/services/store';
import { describe, test, expect } from '@jest/globals';

describe('rootReducer инициализация', () => {
  test('Проверка правильной инициализации rootReducer', () => {
    const initialState: RootState = store.getState();

    // Constructor
    expect(initialState.burger.constructor.bun).toBeNull();
    expect(initialState.burger.constructor.ingredients).toEqual([]);

    // Ingredients
    expect(initialState.burger.ingredients.data).toEqual([]);
    expect(initialState.burger.ingredients.loading).toBe(false);
    expect(initialState.burger.ingredients.error).toBeNull();

    // Order
    expect(initialState.burger.order.data).toBeNull();
    expect(initialState.burger.order.loading).toBe(false);
    expect(initialState.burger.order.error).toBeNull();

    // User
    expect(initialState.burger.user.data).toBeNull();
    expect(initialState.burger.user.loading).toBe(false);
    expect(initialState.burger.user.error).toBeNull();
  });
});
