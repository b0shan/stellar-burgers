import store from '../../src/services/store';

describe('проверка инициализации store', () => {
  test('Проверка правильной инициализации store', () => {
    const initialState = store.getState();
    
    // Проверяем что store содержит burger
    expect(initialState).haveOwnProperty('burger');
    
    // Проверяем структуру burger
    const burger = initialState.burger;
    
    // Проверяем наличие всех частей
    expect(burger).haveOwnProperty('ingredients');
    expect(burger).haveOwnProperty('constructor');
    expect(burger).haveOwnProperty('order');
    expect(burger).haveOwnProperty('user');
  });
});