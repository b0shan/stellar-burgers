import { describe, test, expect } from '@jest/globals';

import burgerReducer, { initialState } from '../../src/slices/burgerSlice';
import type { TIngredient } from '../../src/utils/types';

type BurgerState = typeof initialState;

describe('burgerSlice - ingredients слайс', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: 'ing-1',
      name: 'Ингредиент 1',
      type: 'main',
      price: 100,
      image: 'img1.jpg',
      calories: 100,
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      image_large: '',
      image_mobile: ''
    },
    {
      _id: 'ing-2',
      name: 'Ингредиент 2',
      type: 'sauce',
      price: 50,
      image: 'img2.jpg',
      calories: 50,
      proteins: 5,
      fat: 2,
      carbohydrates: 10,
      image_large: '',
      image_mobile: ''
    }
  ];

  test('начальное состояние ingredients', () => {
    const state: BurgerState = initialState;
    expect(state.ingredients.data).toEqual([]);
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBeNull();
  });

  test('fetchIngredients.pending устанавливает loading = true', () => {
    const action = { type: 'burger/fetchIngredients/pending' };
    const state = burgerReducer(initialState, action);
    expect(state.ingredients.loading).toBe(true);
    expect(state.ingredients.error).toBeNull();
  });

  test('fetchIngredients.fulfilled добавляет ингредиенты и ставит loading = false', () => {
    const action = { type: 'burger/fetchIngredients/fulfilled', payload: mockIngredients };
    const state = burgerReducer(initialState, action);
    expect(state.ingredients.data).toEqual(mockIngredients);
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBeNull();
  });

  test('fetchIngredients.rejected ставит error и loading = false', () => {
    const action = { type: 'burger/fetchIngredients/rejected', error: { message: 'Ошибка' } };
    const state = burgerReducer(initialState, action);
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBe('Ошибка');
  });
});
