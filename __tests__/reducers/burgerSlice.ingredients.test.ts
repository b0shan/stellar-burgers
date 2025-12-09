import { describe, test, expect } from '@jest/globals';
import burgerReducer, {
  fetchIngredients,
  initialState
} from '../../src/slices/burgerSlice';
import type { TIngredient } from '../../src/slices/burgerSlice';

describe('ingredients reducer - асинхронные экшены', () => {
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

  // экшен начала запроса
  test('fetchIngredients.pending устанавливает loading = true', () => {
    const action = fetchIngredients.pending('requestId');
    const state = burgerReducer(initialState, action);
    
    expect(state.ingredients.loading).toBe(true);
    expect(state.ingredients.error).toBeNull();
  });

  // экшен успешного выполнения
  test('fetchIngredients.fulfilled записывает данные и устанавливает loading = false', () => {
    // Симулируем состояние загрузки
    const loadingState = {
      ...initialState,
      ingredients: {
        ...initialState.ingredients,
        loading: true
      }
    };

    const action = fetchIngredients.fulfilled(mockIngredients, 'requestId');
    const state = burgerReducer(loadingState, action);
    
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.data).toEqual(mockIngredients);
    expect(state.ingredients.error).toBeNull();
  });

  // экшен ошибки запроса
  test('fetchIngredients.rejected записывает ошибку и устанавливает loading = false', () => {
    const loadingState = {
      ...initialState,
      ingredients: {
        ...initialState.ingredients,
        loading: true
      }
    };

    const error = new Error('Network Error');
    const action = fetchIngredients.rejected(error, 'requestId');
    const state = burgerReducer(loadingState, action);
    
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBe('Network Error');
    expect(state.ingredients.data).toEqual([]);
  });

  test('полный цикл асинхронного запроса ингредиентов', () => {
    // Начало запроса
    let state = burgerReducer(initialState, fetchIngredients.pending('requestId'));
    expect(state.ingredients.loading).toBe(true);
    expect(state.ingredients.error).toBeNull();
    
    // Успешное выполнение
    state = burgerReducer(state, fetchIngredients.fulfilled(mockIngredients, 'requestId'));
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.data).toEqual(mockIngredients);
    expect(state.ingredients.error).toBeNull();
  });
});