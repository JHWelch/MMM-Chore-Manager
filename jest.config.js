module.exports = {
  moduleFileExtensions: ['js'],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*)\\.spec.js$',
  testPathIgnorePatterns: ['setupJest.js'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.js']
};
