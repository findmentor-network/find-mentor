module.exports = {
  jest: {
    moduleFileExtensions: [
      "js",
      "json",
      "vue"
    ],
    transform: {
      ".*\\.(vue)$": "vue-jest",
      ".*\\.(js)$": "babel-jest"
    },
    setupFiles: ['<rootDir>/test/unit/setup'],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
    verbose: true,  
  }
}
