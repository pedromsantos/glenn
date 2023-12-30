import { TimeSignaturePrimitives } from './Duration';
import { KeyPrimitives } from './Key';
import { PlayablePrimitive } from './Playables';

export type MeasurePrimitives = {
  playables: PlayablePrimitive[];
  timeSignature: TimeSignaturePrimitives;
};

export type SongPrimitives = {
  key: KeyPrimitives;
  timeSignature: TimeSignaturePrimitives;
  measures: MeasurePrimitives[];
};
