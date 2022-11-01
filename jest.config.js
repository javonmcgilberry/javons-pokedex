const nextJest = require('next/jest')

// Sync object
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['cypress'],
  resetMocks: false,
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    // cypress better covering of logic
    '!components/PokemonListView/PokemonListView.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    '!api-utils/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      statements: 90,
      lines: 90,
    },
  },
  moduleNameMapper: {
    '@pokedex/(.*)': '<rootDir>/$1',
  },
  testMatch: ['**.test.ts', '**.test.tsx'],
}

const ignoredErrors = [
  /act(...) is not supported in production builds of React, and might not behave as expected./,
]
const consoleError = global.console.error
global.console.error = (...args) => {
  if (ignoredErrors.some((el) => el.test(args[0]))) {
    return consoleError(...args)
  }
}

module.exports = createJestConfig(customJestConfig)
