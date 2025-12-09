import { describe, test, expect } from '@jest/globals';
import burgerReducer, { initialState } from '../../src/slices/burgerSlice';
import type { TIngredient, TConstructorIngredient } from '../../src/utils/types';

type BurgerState = typeof initialState;

describe('burgerSlice - constructor слайс', () => {
  const mockBun: TIngredient = {
    _id: 'bun-1',
    name: 'Булка',
    type: 'bun',
    price: 200,
    image: 'bun.jpg',
    calories: 100,
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    image_large: '',
    image_mobile: ''
  };

  const mockFilling1: TIngredient = {
    _id: 'filling-1',
    name: 'Начинка 1',
    type: 'main',
    price: 150,
    image: 'filling1.jpg',
    calories: 50,
    proteins: 5,
    fat: 2,
    carbohydrates: 10,
    image_large: '',
    image_mobile: ''
  };

  const mockFilling2: TIngredient = {
    _id: 'filling-2',
    name: 'Начинка 2',
    type: 'main',
    price: 100,
    image: 'filling2.jpg',
    calories: 40,
    proteins: 4,
    fat: 1,
    carbohydrates: 5,
    image_large: '',
    image_mobile: ''
  };

  test('начальное состояние constructor', () => {
    const state: BurgerState = initialState;
    expect(state.constructor.bun).toBeNull();
    expect(state.constructor.ingredients).toEqual([]);
  });

  test('addBun добавляет булку', () => {
    const action = { type: 'burger/addBun', payload: mockBun };
    const state = burgerReducer(initialState, action);
    expect(state.constructor.bun).toEqual(mockBun);
  });

  test('addIngredient добавляет начинку с уникальным id', () => {
    const action = { type: 'burger/addIngredient', payload: { ...mockFilling1, id: 'uuid-1' } };
    const state = burgerReducer(initialState, action);
    expect(state.constructor.ingredients).toHaveLength(1);
    expect(state.constructor.ingredients[0].id).toBe('uuid-1');
  });

  test('removeIngredient удаляет нужную начинку', () => {
    const startState: BurgerState = {
      ...initialState,
      constructor: {
        bun: null,
        ingredients: [
          { ...mockFilling1, id: 'uuid-1' },
          { ...mockFilling2, id: 'uuid-2' }
        ]
      }
    };
    const action = { type: 'burger/removeIngredient', payload: 'uuid-1' };
    const state = burgerReducer(startState, action);
    expect(state.constructor.ingredients).toHaveLength(1);
    expect(state.constructor.ingredients[0].id).toBe('uuid-2');
  });

  test('moveIngredient меняет порядок ингредиентов', () => {
    const startState: BurgerState = {
      ...initialState,
      constructor: {
        bun: null,
        ingredients: [
          { ...mockFilling1, id: 'uuid-1' },
          { ...mockFilling2, id: 'uuid-2' }
        ]
      }
    };
    const action = { type: 'burger/moveIngredient', payload: { fromIndex: 0, toIndex: 1 } };
    const state = burgerReducer(startState, action);
    expect(state.constructor.ingredients[0].id).toBe('uuid-2');
    expect(state.constructor.ingredients[1].id).toBe('uuid-1');
  });

  test('clearConstructor очищает все ингредиенты и булку', () => {
    const startState: BurgerState = {
      ...initialState,
      constructor: {
        bun: mockBun,
        ingredients: [{ ...mockFilling1, id: 'uuid-1' }]
      }
    };
    const action = { type: 'burger/clearConstructor' };
    const state = burgerReducer(startState, action);
    expect(state.constructor.bun).toBeNull();
    expect(state.constructor.ingredients).toEqual([]);
  });
});
