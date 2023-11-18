import { DurationPrimitives } from './Duration';
import { PitchPrimitives } from './Pitch';

export type OctavePrimitives = {
  name: string;
  value: number;
  midi: number;
};

export type NotePrimitives = {
  pitch: PitchPrimitives;
  duration: DurationPrimitives;
  octave: OctavePrimitives;
};

export type RestPrimitives = {
  duration: DurationPrimitives;
};

export type MelodicPhrasePrimitives = {
  notes: NotePrimitives[];
};
