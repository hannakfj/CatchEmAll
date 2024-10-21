module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Ensure ts-jest is used to transpile TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],  // Adjust to match .ts and .tsx test files
};
