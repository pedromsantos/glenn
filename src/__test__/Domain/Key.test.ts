import Pitch from '../../Domain/Pitch';
import Key from '../../Domain/Key';
import * as fc from 'fast-check';

describe('Major keys', () => {
  test('C should have notes C, D, E, F, G, A, B', () => {
    expect(Key.CMajor.notes()).toStrictEqual([
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
    expect(Key.FMajor.notes()).toStrictEqual([
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
    expect(Key.GMajor.notes()).toStrictEqual([
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
  test('Major keys have formula W, W, H, W, W, W, H', () => {
    const majorKeyDistances = [2, 2, 1, 2, 2, 2, 1];

    fc.assert(
      fc.property(fc.constantFrom(...Key.majorKeys), (key) => {
        const keyNotes = key.notes().concat(key.notes()[0]);

        const scaleNotePairs = keyNotes
          .reduce((result, _value, index, array) => {
            result.push(array.slice(index, index + 2));
            return result;
          }, [])
          .slice(0, -1);

        const distances = scaleNotePairs.map((p) => p[0].absoluteDistance(p[1]));

        expect(distances).toStrictEqual(majorKeyDistances);
      }),
      { verbose: true }
    );
  });

  test('Minor keys have formula W, H, W, W, H, W, W', () => {
    const minorKeyDistances = [2, 1, 2, 2, 1, 2, 2];

    fc.assert(
      fc.property(fc.constantFrom(...Key.minorKeys), (key) => {
        const keyNotes = key.notes().concat(key.notes()[0]);

        const scaleNotePairs = keyNotes
          .reduce((result, _value, index, array) => {
            result.push(array.slice(index, index + 2));
            return result;
          }, [])
          .slice(0, -1);

        const distances = scaleNotePairs.map((p) => p[0].absoluteDistance(p[1]));

        expect(distances).toStrictEqual(minorKeyDistances);
      }),
      { verbose: true }
    );
  });
});
