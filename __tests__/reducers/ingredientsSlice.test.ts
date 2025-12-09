import { describe, test, expect } from '@jest/globals';
import burgerReducer, {
  fetchIngredients,
  initialState
} from '../../src/slices/burgerSlice';
import type { TIngredient } from '../../src/utils/types';

describe('ingredients reducer', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: 'ing1',
      name: 'Флюоресцентная булка',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: '',
      image_mobile: '',
      image_large: '',
    },
    {
      _id: 'ing2',
      name: 'Мясо бессмертных моллюсков',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 4242,
      price: 1337,
      image: '',
      image_mobile: '',
      image_large: '',
    }
  ];

  test('начальное состояние ingredients', () => {
    const state = burgerReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state.ingredients.data).toEqual([]);
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBeNull();
  });

  test('обработка экшена начала запроса (fetchIngredients.pending)', () => {
    const action = fetchIngredients.pending('requestId');
    const state = burgerReducer(initialState, action);
    
    expect(state.ingredients.loading).toBe(true);
    expect(state.ingredients.error).toBeNull();
  });

  test('обработка экшена успешного выполнения запроса (fetchIngredients.fulfilled)', () => {
   
    const pendingState = burgerReducer(initialState, fetchIngredients.pending('requestId'));
    expect(pendingState.ingredients.loading).toBe(true);
    
    const action = fetchIngredients.fulfilled(mockIngredients, 'requestId');
    const state = burgerReducer(pendingState, action);
    
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.data).toEqual(mockIngredients);
    expect(state.ingredients.error).toBeNull();
  });

  test('обработка экшена ошибки запроса (fetchIngredients.rejected)', () => {
   
    const pendingState = burgerReducer(initialState, fetchIngredients.pending('requestId'));
    
    // обрабатываем ошибку
    const error = new Error('Network Error');
    const action = fetchIngredients.rejected(error, 'requestId');
    const state = burgerReducer(pendingState, action);
    
    // Ошибка записывается, loading = false
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBe('Network Error');
    expect(state.ingredients.data).toEqual([]);
  });
});