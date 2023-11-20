import { ChordPrimitives } from './Chord';
import { NotePrimitives, RestPrimitives } from './Note';

export enum PlayableType {
  Chord,
  Note,
  Rest,
}

export type PlayablePrimitives = {
  rest?: RestPrimitives;
  note?: NotePrimitives;
  chord?: ChordPrimitives;
  playableType: PlayableType;
};
