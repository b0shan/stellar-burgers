import { describe, test, expect } from '@jest/globals';
import burgerReducer, { initialState } from '../../src/slices/burgerSlice';
import type { BurgerState } from '../../src/slices/burgerSlice';

describe('burgerSlice как rootReducer', () => {
  test('должен возвращать начальное состояние при undefined и неизвестном экшене', () => {
    // Тестируем поведение редьюсера 
    const action = { type: 'UNKNOWN_ACTION' };
    
    // Вызываем редьюсер с undefined 
    const state = burgerReducer(undefined, action);
    
    // Проверяем что вернулось начальное состояние
    expect(state).toEqual(initialState);
  });

  test('должен возвращать текущее состояние для неизвестного экшена', () => {
    const customState: BurgerState = {
      ...initialState,
      constructor: {
        bun: {
          _id: 'bun-1',
          name: 'Булка',
          type: 'bun',
          price: 100,
          image: '',
          image_mobile: '',
          image_large: '',
          calories: 200,
          proteins: 10,
          fat: 5,
          carbohydrates: 20
        },
        ingredients: [
          {
            _id: 'ing-1',
            name: 'Котлета',
            type: 'main',
            price: 150,
            image: '',
            image_mobile: '',
            image_large: '',
            calories: 300,
            proteins: 20,
            fat: 15,
            carbohydrates: 5,
            id: 'uuid-1'
          }
        ]
      }
    };

    const action = { type: 'SOME_UNKNOWN_ACTION' };
    const state = burgerReducer(customState, action);
    
    expect(state).toEqual(customState);
    expect(state.constructor.bun).not.toBeNull();
    expect(state.constructor.ingredients).toHaveLength(1);
  });
});