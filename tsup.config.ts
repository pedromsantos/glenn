import type { Options } from 'tsup';

const config: Options = {
  entry: ['src/index.ts'],
  dts: {
    // ignoreDeprecations suppresses TS6 error from tsup injecting baseUrl:"."
    compilerOptions: { ignoreDeprecations: '6.0' },
  },
  clean: true,
  target: 'es2020',
  format: ['iife', 'cjs', 'esm'],
  tsconfig: 'tsconfig.src.json',
};

export default config;
