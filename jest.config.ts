import { pathsToModuleNameMapper } from 'ts-jest/utils'
import { compilerOptions } from './tsconfig.json'

export default {
  // globalSetup: '<rootDir>/jest.setup.ts',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  preset: 'ts-jest',
  verbose: true,
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  moduleDirectories: ['<rootDir>', 'store', 'node_modules'],
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  // collectCoverage: true,
  // collectCoverageFrom: ['<rootDir>/**/*.(vue|js)'],
  forceExit: !!process.env.CI, // almost every CI platform sets this by default
}
