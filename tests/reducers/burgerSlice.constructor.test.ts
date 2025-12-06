import { describe, test, expect, jest } from '@jest/globals';
import burgerReducer, {
  initialState,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../../src/slices/burgerSlice';

import type { TIngredient } from '../../src/utils/types';

//  Мокаем генератор id через Date.now
jest.spyOn(Date, 'now').mockReturnValue(123456);

describe('burger reducer - constructor часть', () => {
  const mockBun: TIngredient = {
    _id: 'bun-1',
    name: 'Краторная булка',
    type: 'bun',
    price: 1255,
    image: 'image.jpg',
    calories: 420,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    image_large: '',
    image_mobile: '',
  };

  const mockFilling1: TIngredient = {
    _id: 'filling-1',
    name: 'Биокотлета',
    type: 'main',
    price: 300,
    image: 'image2.jpg',
    calories: 200,
    proteins: 20,
    fat: 10,
    carbohydrates: 30,
    image_large: '',
    image_mobile: '',
  };

  const mockFilling2: TIngredient = {
    _id: 'filling-2',
    name: 'Сыр',
    type: 'main',
    price: 150,
    image: 'image3.jpg',
    calories: 100,
    proteins: 15,
    fat: 8,
    carbohydrates: 5,
    image_large: '',
    image_mobile: '',
  };

  // Добавляем булку
  test('обработка addBun', () => {
    const state = burgerReducer(initialState, addBun(mockBun));
    expect(state.constructor.bun).toEqual(mockBun);
  });

  // добавляем ингридиент 
  test('обработка addIngredient', () => {
    const state = burgerReducer(initialState, addIngredient(mockFilling1));

    expect(state.constructor.ingredients).toHaveLength(1);
    expect(state.constructor.ingredients[0]).toMatchObject({
      ...mockFilling1,
      id: expect.any(String),
    });
  });

  // Убираем инигридиент
  test('обработка removeIngredient', () => {
    const startState = burgerReducer(
      burgerReducer(initialState, addIngredient(mockFilling1)),
      addIngredient(mockFilling2)
    );

    const idToRemove = startState.constructor.ingredients[0].id;

    const state = burgerReducer(startState, removeIngredient(idToRemove));

    expect(state.constructor.ingredients).toHaveLength(1);
    expect(state.constructor.ingredients[0]._id).toBe('filling-2');
  });

  // Перемещаем ингридиент
  test('обработка moveIngredient', () => {
    const startState = burgerReducer(
      burgerReducer(initialState, addIngredient(mockFilling1)),
      addIngredient(mockFilling2)
    );

    const state = burgerReducer(
      startState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.constructor.ingredients[0]._id).toBe('filling-2');
    expect(state.constructor.ingredients[1]._id).toBe('filling-1');
  });
});
