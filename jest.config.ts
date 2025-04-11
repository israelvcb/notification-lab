import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

interface TSConfig {
  compilerOptions: {
    paths?: {
      [key: string]: string[];
    };
  };
}

const tsConfig = compilerOptions as TSConfig['compilerOptions'];

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['src', 'test'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.paths ?? {}, {
    prefix: '<rootDir>',
  }),
};

export default jestConfig;
