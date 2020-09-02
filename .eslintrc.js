module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'lines-between-class-members': 'off',
    'no-restricted-syntax': 'off',
    camelcase: 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/no-unused-vars': 'on',
  },
};
