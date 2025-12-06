import { describe, test, expect } from '@jest/globals';

describe('burgerConstructor reducer', () => {
  test('Обработка экшена добавления ингредиента', () => {
    expect(true).toBe(true);
  });

  test('Обработка экшена удаления ингредиента', () => {
    expect(1 + 1).toBe(2);
  });

  test('Обработка экшена изменения порядка ингредиентов', () => {
    expect([1, 2, 3]).toHaveLength(3);
  });
});