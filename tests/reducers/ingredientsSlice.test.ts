import { describe, test, expect } from '@jest/globals';
import reducer, { fetchIngredients, BurgerState, TIngredient } from '../../src/slices/burgerSlice';

describe('ingredientsSlice', () => {
  const initialState: BurgerState = {
    ingredients: { data: [], loading: false, error: null },
    constructor: { bun: null, ingredients: [] },
    user: { data: null, loading: false, error: null },
    order: { data: null, loading: false, error: null },
    userOrders: { data: [], loading: false, error: null },
    feed: { data: [], total: 0, totalToday: 0, loading: false, error: null },
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      price: 100,
      image: '',
      image_large: '',
      image_mobile: '',
      calories: 200,
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
    },
    {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      price: 150,
      image: '',
      image_large: '',
      image_mobile: '',
      calories: 300,
      proteins: 20,
      fat: 15,
      carbohydrates: 5,
    },
  ];

  test('fetchIngredients.pending устанавливает loading = true', () => {
    const state = reducer(initialState, { type: fetchIngredients.pending.type });
    expect(state.ingredients.loading).toBe(true);
    expect(state.ingredients.error).toBeNull();
  });

  test('fetchIngredients.fulfilled устанавливает data и loading = false', () => {
    const state = reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    });
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.data).toEqual(mockIngredients);
    expect(state.ingredients.error).toBeNull();
  });

  test('fetchIngredients.rejected устанавливает error и loading = false', () => {
    const state = reducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка' },
    });
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBe('Ошибка');
  });
});
