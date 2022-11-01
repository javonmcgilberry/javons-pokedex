module.exports = {
  plugins: ['@typescript-eslint'],
  globals: { React: true },
  extends: [
    'next/core-web-vitals',
    'plugin:jest-dom/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-var-requires': 1,
  },
  ignorePatterns: [
    'coverage/**/*',
    '.eslintrc.js',
    'generated/**/*.ts',
    'lint-staged.config.js',
    'next.config.js',
    'jest.config.js',
    'cypress.config.ts',
    'cypress/**/*',
  ],
}
