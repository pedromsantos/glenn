import { ChordPrimitives } from './Chord';
import { NotePrimitives, RestPrimitives } from './Note';

export type PlayablesPrimitives = {
  rest?: RestPrimitives;
  note?: NotePrimitives;
  chord?: ChordPrimitives;
};

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type PlayablePrimitives = RequireOnlyOne<PlayablesPrimitives>;

// PlayablePrimitive USAGE:
// const primitive: PlayablePrimitive = {
//   //rest: { duration: { name: '', value: 1, fraction: '' } },
//   note: {
//     duration: { value: 0.25, name: 'Quarter', fraction: '1/4' },
//     pitch: { name: 'C', value: 0, naturalName: 'C', accidental: 0 },
//     octave: { midi: 12, name: 'Contra', value: -8 },
//   },
// };

// // eslint-disable-next-line no-console
// console.log(primitive);
