module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['./coverage/*', './jest.config.js', './lib/*', './src/*'],
    testMatch: ['**/tests/**/*.spec.(ts|js)'],
};
