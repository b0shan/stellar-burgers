import { describe, test, expect } from '@jest/globals';
import burgerReducer, {
  addBun,
  addIngredient,
  fetchIngredients,
  initialState
} from '../../src/slices/burgerSlice';
import type { TIngredient } from '../../src/utils/types';

describe('Интеграционные тесты burgerSlice', () => {
  const mockBun: TIngredient = {
    _id: 'bun1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: '',
    image_mobile: '',
    image_large: '',
  };

  const mockIngredient: TIngredient = {
    _id: 'main1',
    name: 'Бифкетти',
    type: 'main',
    proteins: 20,
    fat: 15,
    carbohydrates: 5,
    calories: 300,
    price: 150,
    image: '',
    image_mobile: '',
    image_large: '',
  };

  test('параллельная работа constructor и ingredients слайсов', () => {
    let state = initialState;
    
    // Начинаем загрузку ингредиентов
    state = burgerReducer(state, fetchIngredients.pending('requestId'));
    expect(state.ingredients.loading).toBe(true);
    
    // Добавляем булку 
    state = burgerReducer(state, addBun(mockBun));
    expect(state.constructor.bun).toEqual(mockBun);
    expect(state.ingredients.loading).toBe(true); 
    
    // Завершаем загрузку
    const mockIngredients = [mockBun, mockIngredient];
    state = burgerReducer(state, fetchIngredients.fulfilled(mockIngredients, 'requestId'));
    
    // Проверяем оба слайса 
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.data).toEqual(mockIngredients);
    expect(state.constructor.bun).toEqual(mockBun); 
  });
});