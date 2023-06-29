module.exports = {
  moduleFileExtensions: ['js'],
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*)\\.spec.js$',
  testPathIgnorePatterns: ['setupJest.js'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.js']
};
