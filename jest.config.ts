import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!**/*.test.{ts,tsx}',
    '!**/*.spec.{ts,tsx}',
  ],

  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  coverageReporters: ['json', 'text', 'lcov', 'clover', 'html'],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // ВАЖНО: Добавьте ВСЕ алиасы из tsconfig.json
  moduleNameMapper: {
    // Статические файлы
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/__mocks__/fileMock.js',
    
    // Алиасы из tsconfig.json
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
    '^@pages$': '<rootDir>/src/pages',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@components$': '<rootDir>/src/components',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages',
    '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
    '^@slices$': '<rootDir>/src/services/slices',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@selectors$': '<rootDir>/src/services/selectors',
    '^@selectors/(.*)$': '<rootDir>/src/services/selectors/$1',
    
    // Общие алиасы
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },

  resetMocks: true,
  restoreMocks: true,

  roots: ['<rootDir>/src', '<rootDir>/__tests__'],

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  slowTestThreshold: 5,

  testEnvironment: 'jsdom',

  testMatch: [
    '<rootDir>/__tests__/**/*.test.{ts,tsx}',
    '<rootDir>/__tests__/**/*.spec.{ts,tsx}',
    '<rootDir>/src/**/__tests__/**/*.test.{ts,tsx}',
    '<rootDir>/src/**/__tests__/**/*.spec.{ts,tsx}',
    '<rootDir>/src/**/*.test.{ts,tsx}',
    '<rootDir>/src/**/*.spec.{ts,tsx}',
  ],

  testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],

  // Исправьте transform согласно warning
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        // Уберите isolatedModules отсюда, добавьте в tsconfig.json
      },
    ],
  },

  transformIgnorePatterns: ['/node_modules/(?!(uuid|@ya.praktikum|@zlden)/)'],

  // Уберите globals полностью
  // globals: {
  //   'ts-jest': {
  //     tsconfig: '<rootDir>/tsconfig.json',
  //   },
  // },

  verbose: true,

  preset: 'ts-jest',
};

export default config;