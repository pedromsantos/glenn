import * as fc from 'fast-check';

import { Key } from '../../Domain/Key';
import { Pitch } from '../../Domain/Pitch';
import { convertPitchesToDistances } from '../utils';

describe('Major keys', () => {
  test('C should have notes C, D, E, F, G, A, B', () => {
    expect(Array.from(Key.CMajor)).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.F,
      Pitch.G,
      Pitch.A,
      Pitch.B,
    ]);
  });

  test('F should have notes  F, G, A, Bb, C, D, E', () => {
    expect(Array.from(Key.FMajor)).toStrictEqual([
      Pitch.F,
      Pitch.G,
      Pitch.A,
      Pitch.BFlat,
      Pitch.C,
      Pitch.D,
      Pitch.E,
    ]);
  });

  test('G should have notes  G, A, B, C, D, E, F#', () => {
    expect(Array.from(Key.GMajor)).toStrictEqual([
      Pitch.G,
      Pitch.A,
      Pitch.B,
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.FSharp,
    ]);
  });
});

describe('properties', () => {
  test('Keys are 7 notes', () => {
    fc.assert(
      fc.property(fc.constantFrom(...Key.keys), (key: Key) => {
        const keyNotes = Array.from(key);

        expect(keyNotes).toHaveLength(7);
      }),
      { verbose: true }
    );
  });

  test('Major keys have formula W, W, H, W, W, W, H', () => {
    const majorKeyDistances = [2, 2, 1, 2, 2, 2, 1];

    fc.assert(
      fc.property(fc.constantFrom(...Key.majorKeys), (key: Key) => {
        const keyNotes = Array.from(key).concat(Array.from(key)[0] as Pitch);
        const distances = convertPitchesToDistances(keyNotes);

        expect(distances).toStrictEqual(majorKeyDistances);
      }),
      { verbose: true }
    );
  });

  test('Minor keys have formula W, H, W, W, H, W, W', () => {
    const minorKeyDistances = [2, 1, 2, 2, 1, 2, 2];

    fc.assert(
      fc.property(fc.constantFrom(...Key.minorKeys), (key: Key) => {
        const keyNotes = Array.from(key).concat(Array.from(key)[0] as Pitch);
        const distances = convertPitchesToDistances(keyNotes);

        expect(distances).toStrictEqual(minorKeyDistances);
      }),
      { verbose: true }
    );
  });
});
