import { describe, test, expect } from '@jest/globals';
import reducer, { clearFeed, BurgerState, TOrder } from '../../src/slices/burgerSlice';

describe('feedSlice', () => {
  const initialState: BurgerState['feed'] = { data: [], total: 0, totalToday: 0, loading: false, error: null };
  const mockFeed: TOrder[] = [
    { _id: '1', name: 'A', ingredients: ['a'], status: 'done', number: 1, createdAt: '', updatedAt: '' },
    { _id: '2', name: 'B', ingredients: ['b'], status: 'done', number: 2, createdAt: '', updatedAt: '' },
  ];

  test('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' }).feed).toEqual(initialState);
  });

  test('clearFeed очищает ленту заказов', () => {
    const stateWithFeed = { feed: { ...initialState, data: mockFeed, total: 2, totalToday: 2 } } as any;
    const state = reducer(stateWithFeed, clearFeed());
    expect(state.feed.data).toHaveLength(0);
    expect(state.feed.total).toBe(0);
    expect(state.feed.totalToday).toBe(0);
    expect(state.feed.error).toBeNull();
  });
});
