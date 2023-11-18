import { PitchPrimitives } from './Pitch';

export type ScalePrimitives = {
  pattern: string;
  root: PitchPrimitives;
  pitches: PitchPrimitives[];
};
