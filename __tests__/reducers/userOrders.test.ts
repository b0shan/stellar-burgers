import { describe, test, expect } from '@jest/globals';
import reducer, { clearUserOrders, BurgerState, TOrder } from '../../src/slices/burgerSlice';

describe('userOrdersSlice', () => {
  const initialState: BurgerState['userOrders'] = { data: [], loading: false, error: null };
  const mockOrders: TOrder[] = [
    { _id: '1', name: 'A', ingredients: ['a'], status: 'done', number: 1, createdAt: '', updatedAt: '' },
    { _id: '2', name: 'B', ingredients: ['b'], status: 'done', number: 2, createdAt: '', updatedAt: '' },
  ];

  test('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' }).userOrders).toEqual(initialState);
  });

  test('clearUserOrders очищает заказы пользователя', () => {
    const stateWithOrders = { userOrders: { ...initialState, data: mockOrders } } as any;
    const state = reducer(stateWithOrders, clearUserOrders());
    expect(state.userOrders.data).toHaveLength(0);
    expect(state.userOrders.error).toBeNull();
  });
});
