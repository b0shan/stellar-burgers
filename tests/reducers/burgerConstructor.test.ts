import { describe, test, expect } from '@jest/globals';

import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  addBun,
  initialState
} from '../../src/slices/burgerSlice';

import type { TIngredient } from '../../src/utils/types';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-id'),
}));

const bun: TIngredient = {
  _id: 'bun1',
  name: 'Булка',
  type: 'bun',
  price: 100,
  image: '',
  calories: 100,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  image_large: '',
  image_mobile: ''
};

const filling: TIngredient = {
  _id: 'main1',
  name: 'Начинка',
  type: 'main',
  price: 50,
  image: '',
  calories: 50,
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  image_large: '',
  image_mobile: ''
};

describe('burger constructor reducer', () => {
  test('добавление ингредиента', () => {
    const state = reducer(initialState, addIngredient(filling));
    expect(state.constructor.ingredients.length).toBe(1);
  });

  test('удаление ингредиента', () => {
    const startState = reducer(initialState, addIngredient(filling));

    const id = startState.constructor.ingredients[0].id;

    const state = reducer(startState, removeIngredient(id));

    expect(state.constructor.ingredients.length).toBe(0);
  });

  test('перемещение ингредиентов', () => {
    let state = reducer(initialState, addIngredient(filling));
    state = reducer(state, addIngredient({ ...filling, _id: 'main2' }));

    const movedState = reducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(movedState.constructor.ingredients[0].id)
      .toBe(state.constructor.ingredients[1].id);
  });

  test('добавление булки', () => {
    const state = reducer(initialState, addBun(bun));
    expect(state.constructor.bun).toEqual(bun);
  });
});
