import { describe, test, expect } from '@jest/globals';

import reducer, {
  fetchIngredients,
  initialState
} from '../../src/slices/burgerSlice';

describe('ingredients async reducer', () => {
  test('fetchIngredients.pending → loading = true', () => {
    const state = reducer(initialState, fetchIngredients.pending('test'));

    expect(state.ingredients.loading).toBe(true);
    expect(state.ingredients.error).toBeNull();
  });

  test('fetchIngredients.fulfilled → data записывается', () => {
    const mockIngredients = [{ _id: '1', name: 'test' }];

    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients as any, 'test')
    );

    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.data).toEqual(mockIngredients);
  });

  test('fetchIngredients.rejected → error записывается', () => {
    const state = reducer(
      initialState,
      fetchIngredients.rejected(new Error('ошибка'), 'test')
    );

    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBe('ошибка');
  });
});
