import type { Options } from 'tsup';

const config: Options = {
  entry: ['src/index.ts'],
  dts: true,
  clean: true,
  target: 'es2020',
  format: ['iife', 'cjs', 'esm'],
};

export default config;
