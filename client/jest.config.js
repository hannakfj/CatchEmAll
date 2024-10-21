module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use jsdom to simulate the browser environment
  moduleNameMapper: {
    '^@chakra-ui/react$': '<rootDir>/node_modules/@chakra-ui/react',
    '^@chakra-ui/utils$': '<rootDir>/node_modules/@chakra-ui/utils',
    // Mock static file imports like images
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  transformIgnorePatterns: ['node_modules/(?!(.pnpm|@chakra-ui)/)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
