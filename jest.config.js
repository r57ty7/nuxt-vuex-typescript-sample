module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],
}
