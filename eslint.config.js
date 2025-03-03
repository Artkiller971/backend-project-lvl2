import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.node },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      semi: 'error',
      'consistent-return': 'error',
      'default-case': 'error',
      'no-else-return': 'error',
      'prefer-const': 'error',
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always',
        functions: 'never',
        importAttributes: 'always',
        dynamicImports: 'always',
      }],
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/js/no-trailing-spaces': ['error'],
      '@stylistic/js/eol-last': ['error', 'always'],
      '@stylistic/js/no-multi-spaces': ['error'],
      '@stylistic/js/quote-props': ['error', 'as-needed'],
      '@stylistic/js/space-infix-ops': ['error'],
      '@stylistic/js/space-in-parens': ['error'],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/js/comma-spacing': ['error'],
    },
  },

];
