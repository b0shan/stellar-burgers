import { describe, test, expect } from '@jest/globals';
import reducer, { clearFeed, BurgerState, TOrder } from '../../src/slices/burgerSlice';

describe('feedSlice', () => {
  const initialState: BurgerState['feed'] = { 
    data: [], 
    total: 0, 
    totalToday: 0, 
    loading: false, 
    error: null 
  };
  
  const mockFeed: TOrder[] = [
    { 
      _id: '1', 
      name: 'A', 
      ingredients: ['a'], 
      status: 'done', 
      number: 1, 
      createdAt: '', 
      updatedAt: '' 
    },
    { 
      _id: '2', 
      name: 'B', 
      ingredients: ['b'], 
      status: 'done', 
      number: 2, 
      createdAt: '', 
      updatedAt: '' 
    },
  ];

  test('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' }).feed).toEqual(initialState);
  });

  test('clearFeed очищает ленту заказов, но сохраняет total и totalToday', () => {
    // Создаем состояние с данными
    const stateWithFeed: BurgerState = {
      ingredients: {
        data: [],
        loading: false,
        error: null
      },
      constructor: {
        bun: null,
        ingredients: []
      },
      user: {
        data: null,
        loading: false,
        error: null
      },
      order: {
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
        ...initialState, 
        data: mockFeed, 
        total: 2, 
        totalToday: 2 
      }
    };
    
    // Применяем экшен clearFeed
    const state = reducer(stateWithFeed, clearFeed());
    
    // Проверяем что данные очистились
    expect(state.feed.data).toHaveLength(0);
    expect(state.feed.data).toEqual([]);
    
    expect(state.feed.total).toBe(2); // остается 2
    expect(state.feed.totalToday).toBe(2); // остается 2
    
    // Проверяем что error очистился
    expect(state.feed.error).toBeNull();
    
    // Проверяем что loading не изменился
    expect(state.feed.loading).toBe(false);
  });
});