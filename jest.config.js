module.exports = {
  roots: ['<rootDir>/src/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*protocols.ts',
    '!<rootDir>/src/**/*protocols/index.ts',
    '!<rootDir>/src/**/*utils/email-validator.ts'
  ],
  testPathIgnorePatterns : [
    "<rootDir>/node_modules/"
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  // coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
