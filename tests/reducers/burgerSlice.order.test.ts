import { describe, test, expect } from '@jest/globals';

import burgerReducer, { initialState } from '../../src/slices/burgerSlice';
import type { TOrder } from '../../src/utils/types';

type BurgerState = typeof initialState;

describe('burgerSlice - order слайс', () => {
  const mockOrder: TOrder = {
    _id: 'order-1',
    ingredients: ['ing-1', 'ing-2'],
    status: 'created',
    name: 'Тестовый заказ',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 123
  };

  test('начальное состояние order', () => {
    const state: BurgerState = initialState;
    expect(state.order.data).toBeNull();
    expect(state.order.loading).toBe(false);
    expect(state.order.error).toBeNull();
  });

  test('createOrder.fulfilled добавляет заказ и очищает конструктор', () => {
    const action = { type: 'burger/createOrder/fulfilled', payload: mockOrder };
    const state = burgerReducer(initialState, action);
    expect(state.order.data).toEqual(mockOrder);
    expect(state.constructor.bun).toBeNull();
    expect(state.constructor.ingredients).toEqual([]);
  });

  test('clearOrder экшен очищает заказ', () => {
    const startState: BurgerState = {
      ...initialState,
      order: { data: mockOrder, loading: false, error: 'Ошибка' }
    };
    const action = { type: 'burger/clearOrder' };
    const state = burgerReducer(startState, action);
    expect(state.order.data).toBeNull();
    expect(state.order.error).toBeNull();
  });
});
