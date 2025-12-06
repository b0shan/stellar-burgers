import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,

  collectCoverageFrom: [
    'src/services/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
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

  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'mts',
    'cts',
    'tsx',
    'json',
    'node',
  ],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
  },

  resetMocks: true,
  restoreMocks: true,

  roots: ['<rootDir>/src', '<rootDir>/tests'],

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  slowTestThreshold: 5,

  testEnvironment: 'jsdom',

  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
    '<rootDir>/tests/**/*.test.tsx',
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.test.tsx',
  ],

  testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        isolatedModules: true,
      },
    ],
  },

  transformIgnorePatterns: ['/node_modules/(?!(uuid|@ya.praktikum|@zlden)/)'],

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },

  verbose: true,

  preset: 'ts-jest',
};

export default config;
