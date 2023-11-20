import { TimeSignaturePrimitives } from './Duration';
import { KeyPrimitives } from './Key';
import { PlayablePrimitives } from './Playables';

export type MeasurePrimitives = {
  playables: PlayablePrimitives[];
  timeSignature: TimeSignaturePrimitives;
};

export type SongPrimitives = {
  key: KeyPrimitives;
  timeSignature: TimeSignaturePrimitives;
  measures: MeasurePrimitives[];
};
