/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  globals: {
    React: 'readonly',
    JSX: 'readonly',
    process: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['import', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'react/jsx-curly-brace-presence': 2,
    '@typescript-eslint/no-unused-vars': [1],
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [
          {
            pattern: '@/utils/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/libs/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/const/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/types/**',
            group: 'internal',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
}
