import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import hexagonalArchitecture from 'eslint-plugin-hexagonal-architecture';
import vitest from '@vitest/eslint-plugin';
import globals from 'globals';

export default [
  // First, ignore files that should not be linted
  {
    ignores: [
      'build/',
      'dist/',
      'lib/',
      'tools/',
      'node_modules/',
      '.snapshots/',
      '*.min.js',
      '*.config.js',
      '*.config.ts',
      'coverage/',
      'target/',
      'yarn.lock',
      'package-lock.json',
      '.stryker-tmp/',
      '.yarn/',
      '**/.stryker-tmp/**',
      '**/.yarn/**',
    ],
  },

  // Base configuration for all TypeScript files
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
        // TypeScript globals
        Iterable: 'readonly',
        Iterator: 'readonly',
        IteratorResult: 'readonly',
        AsyncIterable: 'readonly',
        AsyncIterator: 'readonly',
        AsyncIteratorResult: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      'hexagonal-architecture': hexagonalArchitecture,
      '@vitest': vitest,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs['eslint-recommended'].rules,
      ...typescript.configs['recommended'].rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      'no-console': 'warn',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },

  // Configuration for test files
  {
    files: ['src/**/*.test.ts', 'src/**/*.tests.ts', 'src/**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
        // Vitest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },

  // Configuration for hexagonal architecture enforcement
  {
    files: ['contexts/{backend,frontend}/*/src/**/*.ts'],
    rules: {
      'hexagonal-architecture/enforce': ['error'],
    },
  },
];
