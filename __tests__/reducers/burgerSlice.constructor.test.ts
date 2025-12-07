<<<<<<< HEAD:__tests__/reducers/burgerSlice.constructor.test.ts
<<<<<<< HEAD
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
=======
=======
>>>>>>> bb72752 (done):tests/reducers/burgerSlice.constructor.test.ts
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
<<<<<<< HEAD:__tests__/reducers/burgerSlice.constructor.test.ts
>>>>>>> bb72752 (done)
=======
>>>>>>> bb72752 (done):tests/reducers/burgerSlice.constructor.test.ts
  };

  const mockFilling1: TIngredient = {
    _id: 'filling-1',
<<<<<<< HEAD:__tests__/reducers/burgerSlice.constructor.test.ts
<<<<<<< HEAD
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
=======
=======
>>>>>>> bb72752 (done):tests/reducers/burgerSlice.constructor.test.ts
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
<<<<<<< HEAD:__tests__/reducers/burgerSlice.constructor.test.ts
>>>>>>> bb72752 (done)
=======
>>>>>>> bb72752 (done):tests/reducers/burgerSlice.constructor.test.ts
  };

  const mockFilling2: TIngredient = {
    _id: 'filling-2',
<<<<<<< HEAD:__tests__/reducers/burgerSlice.constructor.test.ts
<<<<<<< HEAD
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
=======
=======
>>>>>>> bb72752 (done):tests/reducers/burgerSlice.constructor.test.ts
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
<<<<<<< HEAD:__tests__/reducers/burgerSlice.constructor.test.ts
>>>>>>> bb72752 (done)
=======
>>>>>>> bb72752 (done):tests/reducers/burgerSlice.constructor.test.ts
  });
});
