import { describe, test, expect } from '@jest/globals';
import store from '../../src/services/store';
import type { RootState } from '../../src/services/store';

describe('store инициализация', () => {
  test('store корректно инициализируется', () => {
    const state: RootState = store.getState();
    
    // Проверяем что store содержит нужные свойства
    expect(state).toHaveProperty('burger');
    
    // Проверяем структуру burger
    const { burger } = state;
    
    expect(burger.constructor.bun).toBe(null);
    expect(Array.isArray(burger.constructor.ingredients)).toBe(true);
    expect(burger.constructor.ingredients).toHaveLength(0);
    
    expect(Array.isArray(burger.ingredients.data)).toBe(true);
    expect(burger.ingredients.loading).toBe(false);
    expect(burger.ingredients.error).toBeNull();
    
    expect(burger.order.data).toBeNull();
    expect(burger.order.loading).toBe(false);
    expect(burger.order.error).toBeNull();
    
    expect(burger.user.data).toBeNull();
    expect(burger.user.loading).toBe(false);
    expect(burger.user.error).toBeNull();
  });
});