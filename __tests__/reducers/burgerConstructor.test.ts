import { describe, test, expect } from '@jest/globals';
import burgerReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from '../../src/slices/burgerSlice';
import type { TIngredient, TConstructorIngredient } from '../../src/utils/types';

// Мок для uuid 
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

describe('burgerConstructor reducer', () => {
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

  // проверка инициализации rootReducer
  test('инициализация с undefined состоянием возвращает initialState', () => {
    const state = burgerReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  // обработка экшена добавления ингредиента
  test('обработка addIngredient добавляет ингредиент с уникальным id', () => {
    const state = burgerReducer(initialState, addIngredient(mockIngredient));
    
    expect(state.constructor.ingredients).toHaveLength(1);
    expect(state.constructor.ingredients[0]).toMatchObject({
      _id: mockIngredient._id,
      name: mockIngredient.name,
      type: mockIngredient.type,
      price: mockIngredient.price
    });
    expect(state.constructor.ingredients[0].id).toBeDefined();
  });

  // обработка экшена удаления ингредиента
  test('обработка removeIngredient удаляет ингредиент по id', () => {
    const stateWithIngredients = {
      ...initialState,
      constructor: {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: 'id-1' },
          { ...mockIngredient, _id: 'main2', name: 'Сыр', id: 'id-2' }
        ]
      }
    };

    const state = burgerReducer(stateWithIngredients, removeIngredient('id-1'));
    
    expect(state.constructor.ingredients).toHaveLength(1);
    expect(state.constructor.ingredients[0].id).toBe('id-2');
  });

  // обработка экшена изменения порядка ингредиентов
  test('обработка moveIngredient меняет порядок ингредиентов', () => {
    const stateWithIngredients = {
      ...initialState,
      constructor: {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: 'id-1' },
          { ...mockIngredient, _id: 'main2', name: 'Сыр', id: 'id-2' },
          { ...mockIngredient, _id: 'main3', name: 'Соус', id: 'id-3' }
        ]
      }
    };

    const state = burgerReducer(
      stateWithIngredients, 
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );
    
    expect(state.constructor.ingredients[0].id).toBe('id-2');
    expect(state.constructor.ingredients[1].id).toBe('id-3');
    expect(state.constructor.ingredients[2].id).toBe('id-1');
  });

  test('addBun добавляет булку', () => {
    const state = burgerReducer(initialState, addBun(mockBun));
    expect(state.constructor.bun).toEqual(mockBun);
  });

  test('clearConstructor очищает конструктор', () => {
    const stateWithData = {
      ...initialState,
      constructor: {
        bun: mockBun,
        ingredients: [{ ...mockIngredient, id: 'id-1' }]
      }
    };

    const state = burgerReducer(stateWithData, clearConstructor());
    expect(state.constructor.bun).toBeNull();
    expect(state.constructor.ingredients).toEqual([]);
  });
});