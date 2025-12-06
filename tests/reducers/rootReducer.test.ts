import { describe, test, expect } from '@jest/globals';
import store from '../../src/services/store';
import type { RootState } from '../../src/services/store';

describe('rootReducer инициализация', () => {
  test('корректное начальное состояние', () => {
    const state: RootState = store.getState();

    expect(state.burger.constructor.bun).toBeNull();
    expect(state.burger.constructor.ingredients).toEqual([]);

    expect(state.burger.ingredients.data).toEqual([]);
    expect(state.burger.ingredients.loading).toBe(false);
    expect(state.burger.ingredients.error).toBeNull();

    expect(state.burger.order.data).toBeNull();
    expect(state.burger.order.loading).toBe(false);
    expect(state.burger.order.error).toBeNull();

    expect(state.burger.user.data).toBeNull();
    expect(state.burger.user.loading).toBe(false);
    expect(state.burger.user.error).toBeNull();
  });
});

