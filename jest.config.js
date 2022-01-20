/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  collectCoverage: false,
  testEnvironment: 'node',
  coverageReporters: [['text', { skipFull: true }]],
};
