import { describe, test, expect } from '@jest/globals';
import reducer, { setUser, clearUser, BurgerState, TUser } from '../../src/slices/burgerSlice';

describe('userSlice', () => {
  const initialState: BurgerState['user'] = { data: null, loading: false, error: null };
  const mockUser: TUser = { name: 'John Doe', email: 'john@example.com' };

  test('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' }).user).toEqual(initialState);
  });

  test('setUser устанавливает пользователя', () => {
    const state = reducer({ user: initialState } as any, setUser(mockUser));
    expect(state.user.data).toEqual(mockUser);
  });

  test('clearUser очищает пользователя', () => {
    const stateWithUser = { user: { ...initialState, data: mockUser } } as any;
    const state = reducer(stateWithUser, clearUser());
    expect(state.user.data).toBeNull();
    expect(state.user.error).toBeNull();
  });
});

