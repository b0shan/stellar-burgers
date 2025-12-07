import { describe, test, expect } from '@jest/globals';
import reducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from '../../src/slices/burgerSlice';
import type { BurgerState, TIngredient, TConstructorIngredient } from '../../src/slices/burgerSlice';

describe('burgerConstructor reducer', () => {
  const initialState: BurgerState = {
    ingredients: { data: [], loading: false, error: null },
    constructor: { bun: null, ingredients: [] },
    user: { data: null, loading: false, error: null },
    order: { data: null, loading: false, error: null },
    userOrders: { data: [], loading: false, error: null },
    feed: { data: [], total: 0, totalToday: 0, loading: false, error: null },
  };

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
    name: 'Котлета',
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

  test('addBun устанавливает булку', () => {
    const state = reducer(initialState, addBun(mockBun));
    expect(state.constructor.bun).toEqual(mockBun);
  });

  test('addIngredient добавляет ингредиент', () => {
    const state = reducer(initialState, addIngredient(mockIngredient));
    expect(state.constructor.ingredients).toHaveLength(1);
    expect(state.constructor.ingredients[0]).toMatchObject({
      _id: mockIngredient._id,
      name: mockIngredient.name,
      type: mockIngredient.type,
    });
    expect(state.constructor.ingredients[0].id).toBeDefined(); // уникальный id
  });

  test('removeIngredient удаляет ингредиент по id', () => {
    const addedState = reducer(initialState, addIngredient(mockIngredient));
    const ingredientId = addedState.constructor.ingredients[0].id;
    const state = reducer(addedState, removeIngredient(ingredientId));
    expect(state.constructor.ingredients).toHaveLength(0);
  });

  test('moveIngredient меняет порядок ингредиентов', () => {
    const ing1: TConstructorIngredient = { ...mockIngredient, id: '1' };
    const ing2: TConstructorIngredient = { ...mockIngredient, id: '2' };
    const stateWithIngredients: BurgerState = {
      ...initialState,
      constructor: { bun: null, ingredients: [ing1, ing2] },
    };

    const state = reducer(stateWithIngredients, moveIngredient({ fromIndex: 0, toIndex: 1 }));
    expect(state.constructor.ingredients[0].id).toBe('2');
    expect(state.constructor.ingredients[1].id).toBe('1');
  });

  test('clearConstructor очищает булку и ингредиенты', () => {
    const stateWithConstructor: BurgerState = {
      ...initialState,
      constructor: { bun: mockBun, ingredients: [{ ...mockIngredient, id: '1' }] },
    };
    const state = reducer(stateWithConstructor, clearConstructor());
    expect(state.constructor.bun).toBeNull();
    expect(state.constructor.ingredients).toHaveLength(0);
  });
});
