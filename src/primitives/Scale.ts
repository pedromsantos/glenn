import { IntervalPrimitives } from './Interval';
import { PitchPrimitives } from './Pitch';

export type ScalePatternPrimitives = {
  name: string;
  pattern: IntervalPrimitives[];
};

export type ScalePrimitives = {
  pattern: ScalePatternPrimitives;
  root: PitchPrimitives;
  pitches: PitchPrimitives[];
};
