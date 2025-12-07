import { describe, test, expect } from '@jest/globals';

import burgerReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from '../../src/slices/burgerSlice';
import type { BurgerState } from '../../src/slices/burgerSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

describe('burgerSlice reducer', () => {
  let initialState: BurgerState;

  const mockBun: TIngredient = {
    _id: 'bun-1',
    name: 'Булка',
    type: 'bun',
    price: 100,
    image: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    image_large: '',
    image_mobile: '',
  };

  const mockFilling1: TIngredient = {
    _id: 'filling-1',
    name: 'Котлета',
    type: 'main',
    price: 200,
    image: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    image_large: '',
    image_mobile: '',
  };

  const mockFilling2: TIngredient = {
    _id: 'filling-2',
    name: 'Сыр',
    type: 'main',
    price: 50,
    image: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    image_large: '',
    image_mobile: '',
  };

  beforeEach(() => {
    initialState = {
      ingredients: { data: [], loading: false, error: null },
      constructor: { bun: null, ingredients: [] },
      user: { data: null, loading: false, error: null },
      order: { data: null, loading: false, error: null },
      userOrders: { data: [], loading: false, error: null },
      feed: { data: [], total: 0, totalToday: 0, loading: false, error: null },
    };
  });

  test('инициализация state', () => {
    expect(initialState.constructor.bun).toBeNull();
    expect(initialState.constructor.ingredients).toEqual([]);
    expect(initialState.ingredients.loading).toBe(false);
    expect(initialState.ingredients.data).toEqual([]);
    expect(initialState.ingredients.error).toBeNull();
  });

  test('addBun добавляет булку', () => {
    const nextState = burgerReducer(initialState, addBun(mockBun));
    expect(nextState.constructor.bun).toEqual(mockBun);
  });

  test('addIngredient добавляет начинку', () => {
    const ingredient: TConstructorIngredient = { ...mockFilling1, id: 'id-1' };
    const nextState = burgerReducer(initialState, {
      type: 'burger/addIngredient',
      payload: ingredient,
    });
    expect(nextState.constructor.ingredients).toHaveLength(1);
    expect(nextState.constructor.ingredients[0]).toEqual(ingredient);
  });

  test('removeIngredient удаляет начинку', () => {
    const startState = {
      ...initialState,
      constructor: {
        bun: null,
        ingredients: [
          { ...mockFilling1, id: 'id-1' },
          { ...mockFilling2, id: 'id-2' },
        ],
      },
    };
    const nextState = burgerReducer(startState, {
      type: 'burger/removeIngredient',
      payload: 'id-1',
    });
    expect(nextState.constructor.ingredients).toHaveLength(1);
    expect(nextState.constructor.ingredients[0].id).toBe('id-2');
  });

  test('moveIngredient меняет порядок ингредиентов', () => {
    const startState = {
      ...initialState,
      constructor: {
        bun: null,
        ingredients: [
          { ...mockFilling1, id: 'id-1' },
          { ...mockFilling2, id: 'id-2' },
        ],
      },
    };
    const nextState = burgerReducer(startState, {
      type: 'burger/moveIngredient',
      payload: { fromIndex: 0, toIndex: 1 },
    });
    expect(nextState.constructor.ingredients[0].id).toBe('id-2');
    expect(nextState.constructor.ingredients[1].id).toBe('id-1');
  });

  test('clearConstructor очищает конструктор', () => {
    const startState = {
      ...initialState,
      constructor: {
        bun: mockBun,
        ingredients: [{ ...mockFilling1, id: 'id-1' }],
      },
    };
    const nextState = burgerReducer(startState, clearConstructor());
    expect(nextState.constructor.bun).toBeNull();
    expect(nextState.constructor.ingredients).toEqual([]);
  });

  // Тесты для ingredients слайса
  test('ingredients loading при запросе', () => {
    const action = { type: 'burger/fetchIngredients/pending' };
    const nextState = burgerReducer(initialState, action);
    expect(nextState.ingredients.loading).toBe(true);
    expect(nextState.ingredients.error).toBeNull();
  });

  test('ingredients sucess записывает данные и оставливает loading', () => {
    const action = {
      type: 'burger/fetchIngredients/fulfilled',
      payload: [mockBun, mockFilling1],
    };
    const nextState = burgerReducer(initialState, action);
    expect(nextState.ingredients.data).toEqual([mockBun, mockFilling1]);
    expect(nextState.ingredients.loading).toBe(false);
  });

  test('ingredients failed записывает ошбку и останавливает loading', () => {
    const action = {
      type: 'burger/fetchIngredients/rejected',
      error: { message: 'Ошибка' },
    };
    const nextState = burgerReducer(initialState, action);
    expect(nextState.ingredients.loading).toBe(false);
    expect(nextState.ingredients.error).toBe('Ошибка');
  });
});
