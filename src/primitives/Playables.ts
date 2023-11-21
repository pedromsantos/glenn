import { ChordPrimitives } from './Chord';
import { NotePrimitives, RestPrimitives } from './Note';

export type PlayablePrimitives = {
  rest?: RestPrimitives;
  note?: NotePrimitives;
  chord?: ChordPrimitives;
};
