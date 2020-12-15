module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  watchman: false,
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^~~/(.*)$': '<rootDir>/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/*.vue',
  ],
}
