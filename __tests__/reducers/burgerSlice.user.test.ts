import { describe, test, expect } from '@jest/globals';

import burgerReducer, { initialState } from '../../src/slices/burgerSlice';
import type { TUser } from '../../src/utils/types';

type BurgerState = typeof initialState;

describe('burgerSlice - user слайс', () => {
  const mockUser: TUser = { email: 'test@example.com', name: 'Test User' };

  test('начальное состояние user', () => {
    const state: BurgerState = initialState;
    expect(state.user.data).toBeNull();
    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBeNull();
  });

  test('setUser экшен устанавливает пользователя', () => {
    const action = { type: 'burger/setUser', payload: mockUser };
    const state = burgerReducer(initialState, action);
    expect(state.user.data).toEqual(mockUser);
  });

  test('clearUser экшен очищает пользователя', () => {
    const startState: BurgerState = {
      ...initialState,
      user: { data: mockUser, loading: false, error: 'Ошибка' }
    };
    const action = { type: 'burger/clearUser' };
    const state = burgerReducer(startState, action);
    expect(state.user.data).toBeNull();
    expect(state.user.error).toBeNull();
  });
});
