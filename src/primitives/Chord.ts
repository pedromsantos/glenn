import { DurationPrimitives } from './Duration';
import { OctavePrimitives } from './Note';
import { PitchPrimitives } from './Pitch';

export type ChordPitchPrimitives = {
  pitch: PitchPrimitives;
  function: string;
};

export type ChordPrimitives = {
  name: string;
  abbreviation: string;
  root: PitchPrimitives;
  pitches: ChordPitchPrimitives[];
  pattern: string;
  bass: PitchPrimitives;
  lead: PitchPrimitives;
  duration: DurationPrimitives;
  octave: OctavePrimitives;
};
// slice 04 live test: this should be a genuinely new finding
export function untested_new_function(x: number): number { return x * 2; }
