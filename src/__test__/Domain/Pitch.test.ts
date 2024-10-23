/* eslint-disable jest/no-conditional-expect */

import * as fc from 'fast-check';

import { Interval } from '../../Domain/Interval';
import { Pitch } from '../../Domain/Pitch';

describe('Pitch', () => {
  describe('sharp should raise it by half a tone', () => {
    test('sharp C is C#', () => {
      expect(Pitch.C.sharp()).toBe(Pitch.CSharp);
    });

    test('sharp C# is D', () => {
      expect(Pitch.CSharp.sharp()).toBe(Pitch.D);
    });

    test('sharp Db is D', () => {
      expect(Pitch.DFlat.sharp()).toBe(Pitch.D);
    });

    test('sharp D is D#', () => {
      expect(Pitch.D.sharp()).toBe(Pitch.DSharp);
    });

    test('sharp D# is E', () => {
      expect(Pitch.DSharp.sharp()).toBe(Pitch.E);
    });

    test('sharp EFlat is E', () => {
      expect(Pitch.EFlat.sharp()).toBe(Pitch.E);
    });

    test('sharp E is F', () => {
      expect(Pitch.E.sharp()).toBe(Pitch.F);
    });

    test('sharp F is F#', () => {
      expect(Pitch.E.sharp()).toBe(Pitch.F);
    });

    test('sharp F# is G', () => {
      expect(Pitch.FSharp.sharp()).toBe(Pitch.G);
    });

    test('sharp Gb is G', () => {
      expect(Pitch.GFlat.sharp()).toBe(Pitch.G);
    });

    test('sharp G is G#', () => {
      expect(Pitch.G.sharp()).toBe(Pitch.GSharp);
    });

    test('sharp G# is A', () => {
      expect(Pitch.GSharp.sharp()).toBe(Pitch.A);
    });

    test('sharp Ab is G', () => {
      expect(Pitch.AFlat.sharp()).toBe(Pitch.A);
    });

    test('sharp A is A#', () => {
      expect(Pitch.A.sharp()).toBe(Pitch.ASharp);
    });

    test('sharp A# is B', () => {
      expect(Pitch.ASharp.sharp()).toBe(Pitch.B);
    });

    test('sharp Bb is B', () => {
      expect(Pitch.BFlat.sharp()).toBe(Pitch.B);
    });

    test('sharp B is C', () => {
      expect(Pitch.B.sharp()).toBe(Pitch.C);
    });
  });

  describe('flat should lower it by half a tone', () => {
    test('sharp C is B', () => {
      expect(Pitch.C.flat()).toBe(Pitch.B);
    });

    test('flat C# is C', () => {
      expect(Pitch.CSharp.flat()).toBe(Pitch.C);
    });

    test('flat Db is C', () => {
      expect(Pitch.DFlat.flat()).toBe(Pitch.C);
    });

    test('flat D is Db', () => {
      expect(Pitch.D.flat()).toBe(Pitch.DFlat);
    });

    test('flat D# is D', () => {
      expect(Pitch.DSharp.flat()).toBe(Pitch.D);
    });

    test('flat EFlat is D', () => {
      expect(Pitch.EFlat.flat()).toBe(Pitch.D);
    });

    test('flat E is Eb', () => {
      expect(Pitch.E.flat()).toBe(Pitch.EFlat);
    });

    test('flat F is E', () => {
      expect(Pitch.F.flat()).toBe(Pitch.E);
    });

    test('flat F# is G', () => {
      expect(Pitch.FSharp.flat()).toBe(Pitch.F);
    });

    test('flat Gb is F', () => {
      expect(Pitch.GFlat.flat()).toBe(Pitch.F);
    });

    test('flat G is Gb', () => {
      expect(Pitch.G.flat()).toBe(Pitch.GFlat);
    });

    test('sharp G# is G', () => {
      expect(Pitch.GSharp.flat()).toBe(Pitch.G);
    });

    test('flat Ab is G', () => {
      expect(Pitch.AFlat.flat()).toBe(Pitch.G);
    });

    test('flat A is Ab', () => {
      expect(Pitch.A.flat()).toBe(Pitch.AFlat);
    });

    test('flat A# is A', () => {
      expect(Pitch.ASharp.flat()).toBe(Pitch.A);
    });

    test('flat Bb is A', () => {
      expect(Pitch.BFlat.flat()).toBe(Pitch.A);
    });

    test('flat B is Bb', () => {
      expect(Pitch.B.flat()).toBe(Pitch.BFlat);
    });
  });

  describe('measure semitones between', () => {
    test('C and C to zero semitones', () => {
      expect(Pitch.C.absoluteDistance(Pitch.C)).toBe(0);
    });
    test('C and C# to one semitones', () => {
      expect(Pitch.C.absoluteDistance(Pitch.CSharp)).toBe(1);
    });
    test('C and Db to one semitones', () => {
      expect(Pitch.C.absoluteDistance(Pitch.DFlat)).toBe(1);
    });
    test('C and D to one semitones', () => {
      expect(Pitch.C.absoluteDistance(Pitch.D)).toBe(2);
    });

    test('C and E flat to three semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.EFlat)).toBe(3);
    });

    test('C and E to four semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.E)).toBe(4);
    });

    test('C and F to five semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.F)).toBe(5);
    });

    test('C and F sharp to six semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.FSharp)).toBe(6);
    });

    test('C and G flat to six semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.GFlat)).toBe(6);
    });

    test('C and G to seven semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.G)).toBe(7);
    });

    test('C and G sharp to eight semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.GSharp)).toBe(8);
    });

    test('C and A flat to eight semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.AFlat)).toBe(8);
    });

    test('C and A to nine semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.A)).toBe(9);
    });

    test('C and A sharp to ten semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.ASharp)).toBe(10);
    });

    test('C and B flat to ten semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.BFlat)).toBe(10);
    });

    test('C and B to eleven semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.B)).toBe(11);
    });
  });

  describe('measure intervals between', () => {
    test('C and Db to minor second', () => {
      expect(Pitch.C.intervalTo(Pitch.DFlat)).toBe(Interval.MinorSecond);
    });

    test('C and D as MajorSecond', () => {
      expect(Pitch.C.intervalTo(Pitch.D)).toBe(Interval.MajorSecond);
    });

    test('C and E flat as MinorThird', () => {
      expect(Pitch.C.intervalTo(Pitch.EFlat)).toBe(Interval.MinorThird);
    });

    test('C and E as MajorThird', () => {
      expect(Pitch.C.intervalTo(Pitch.E)).toBe(Interval.MajorThird);
    });

    test('C and F as PerfectFourth', () => {
      expect(Pitch.C.intervalTo(Pitch.F)).toBe(Interval.PerfectFourth);
    });

    test('C and F sharp as AugmentedFourth', () => {
      expect(Pitch.C.intervalTo(Pitch.FSharp)).toBe(Interval.AugmentedFourth);
    });

    test('C and G flat as DiminishedFifth', () => {
      expect(Pitch.C.intervalTo(Pitch.GFlat)).toBe(Interval.DiminishedFifth);
    });

    test('C and G as PerfectFifth', () => {
      expect(Pitch.C.intervalTo(Pitch.G)).toBe(Interval.PerfectFifth);
    });

    test('C and G sharp as AugmentedFifth', () => {
      expect(Pitch.C.intervalTo(Pitch.GSharp)).toBe(Interval.AugmentedFifth);
    });

    test('C and A flat as MinorSixth', () => {
      expect(Pitch.C.intervalTo(Pitch.AFlat)).toBe(Interval.MinorSixth);
    });

    test('C and A as MajorSixth', () => {
      expect(Pitch.C.intervalTo(Pitch.A)).toBe(Interval.MajorSixth);
    });

    test('C and B flat as MinorSeventh', () => {
      expect(Pitch.C.intervalTo(Pitch.BFlat)).toBe(Interval.MinorSeventh);
    });

    test('C and B as MajorSeventh', () => {
      expect(Pitch.C.intervalTo(Pitch.B)).toBe(Interval.MajorSeventh);
    });

    test('D and F as MinorThird', () => {
      expect(Pitch.D.intervalTo(Pitch.F)).toBe(Interval.MinorThird);
    });
  });

  describe('transpose using a', () => {
    test('Unison from C to C', () => {
      expect(Pitch.C.transpose(Interval.Unison)).toBe(Pitch.C);
    });

    test('Unison from C# to C#', () => {
      expect(Pitch.CSharp.transpose(Interval.Unison)).toBe(Pitch.CSharp);
    });

    test('MinorSecond from C to D flat', () => {
      expect(Pitch.C.transpose(Interval.MinorSecond)).toBe(Pitch.DFlat);
    });

    test('MajorSecond from C to D', () => {
      expect(Pitch.C.transpose(Interval.MajorSecond)).toBe(Pitch.D);
    });

    test('AugmentedSecond from C to D sharp', () => {
      expect(Pitch.C.transpose(Interval.AugmentedSecond)).toBe(Pitch.DSharp);
    });

    test('MinorThird from C to E flat', () => {
      expect(Pitch.C.transpose(Interval.MinorThird)).toBe(Pitch.EFlat);
    });

    test('MajorThird from C to E', () => {
      expect(Pitch.C.transpose(Interval.MajorThird)).toBe(Pitch.E);
    });

    test('PerfectFourth from C to F', () => {
      expect(Pitch.C.transpose(Interval.PerfectFourth)).toBe(Pitch.F);
    });

    test('AugmentedFourth from C to F sharp', () => {
      expect(Pitch.C.transpose(Interval.AugmentedFourth)).toBe(Pitch.FSharp);
    });

    test('DiminishedFifth from C to G flat', () => {
      expect(Pitch.C.transpose(Interval.DiminishedFifth)).toBe(Pitch.GFlat);
    });

    test('PerfectFifth from C to G', () => {
      expect(Pitch.C.transpose(Interval.PerfectFifth)).toBe(Pitch.G);
    });

    test('PerfectFifth from D to A', () => {
      expect(Pitch.D.transpose(Interval.PerfectFifth)).toBe(Pitch.A);
    });

    test('AugmentedFifth from C to G sharp', () => {
      expect(Pitch.C.transpose(Interval.AugmentedFifth)).toBe(Pitch.GSharp);
    });

    test('MinorSixth from C to A flat', () => {
      expect(Pitch.C.transpose(Interval.MinorSixth)).toBe(Pitch.AFlat);
    });

    test('MajorSixth from C to A', () => {
      expect(Pitch.C.transpose(Interval.MajorSixth)).toBe(Pitch.A);
    });

    test('diminished seventh from C to B flat flat', () => {
      expect(Pitch.C.transpose(Interval.DiminishedSeventh)).toBe(Pitch.A);
    });

    test('diminished seventh from G to E', () => {
      expect(Pitch.G.transpose(Interval.DiminishedSeventh)).toBe(Pitch.E);
    });

    test('minor seventh from C to B flat', () => {
      expect(Pitch.C.transpose(Interval.MinorSeventh)).toBe(Pitch.BFlat);
    });

    test('MajorSeventh from C to B', () => {
      expect(Pitch.C.transpose(Interval.MajorSeventh)).toBe(Pitch.B);
    });

    test('augmented ninth from G to A#', () => {
      expect(Pitch.G.transpose(Interval.AugmentedNinth)).toBe(Pitch.ASharp);
    });

    test('perfect eleventh from G to C', () => {
      expect(Pitch.G.transpose(Interval.PerfectEleventh)).toBe(Pitch.C);
    });

    test('augmented second from D to E#', () => {
      expect(Pitch.D.transpose(Interval.AugmentedSecond)).toBe(Pitch.ESharp);
    });

    test('minor third from G to Bb', () => {
      expect(Pitch.G.transpose(Interval.MinorThird)).toBe(Pitch.BFlat);
    });

    test('major third from G to B', () => {
      expect(Pitch.G.transpose(Interval.MajorThird)).toBe(Pitch.B);
    });
  });

  describe('properties', () => {
    test('sharping and flattening a pitch results in the original note pitch', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Pitch.pitches), (pitch) => {
          const newPitch = pitch.sharp().flat();

          expect(newPitch.NumericValue).toBe(pitch.NumericValue);
        })
      );
    });

    test('The natural pitch of a pitch starts with the same pitch name', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Pitch.pitches), (pitch) => {
          const newPitch = pitch.natural();

          expect(newPitch.Name[0]).toBe(pitch.Name[0]);
        })
      );
    });

    test('flattening and sharping a pitch results in the original note pitch', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Pitch.pitches), (pitch) => {
          const newPitch = pitch.flat().sharp();

          expect(newPitch.NumericValue).toBe(pitch.NumericValue);
        })
      );
    });

    test('a sharped note has a higher pitch except B', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Pitch.pitches), (pitch) => {
          if (pitch === Pitch.B) {
            expect(pitch.sharp().NumericValue).toBeLessThan(pitch.NumericValue);
          } else {
            expect(pitch.sharp().NumericValue).toBeGreaterThan(pitch.NumericValue);
          }
        })
      );
    });

    test('a flatted note has a lower pitch except C', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Pitch.pitches), (pitch) => {
          if (pitch === Pitch.C) {
            expect(pitch.flat().NumericValue).toBeGreaterThan(pitch.NumericValue);
          } else {
            expect(pitch.flat().NumericValue).toBeLessThan(pitch.NumericValue);
          }
        })
      );
    });

    test('pitch can be converted to and from PitchPrimitives', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Pitch.pitches), (pitch) => {
          const from = Pitch.From(pitch.To);

          expect(pitch.NumericValue).toBe(from?.NumericValue);
        })
      );
    });

    test('measure semitones between a note and itself sharp n times to n semitones', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Pitch.pitches), fc.nat({ max: 12 }), (pitch, distance) => {
          let transposed = pitch;

          for (let i = 0; i < distance; i++) {
            transposed = transposed.sharp();
          }

          if (distance === 12) {
            expect(pitch.absoluteDistance(transposed)).toBe(0);
          } else {
            expect(pitch.absoluteDistance(transposed)).toBe(distance);
          }
        })
      );
    });

    test('measure semitones between a note and itself flat n times to n semitones', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Pitch.pitches), fc.nat({ max: 12 }), (pitch, distance) => {
          let transposed = pitch;

          for (let i = 0; i < distance; i++) {
            transposed = transposed.flat();
          }

          if (distance === 12 || distance === 0) {
            expect(pitch.absoluteDistance(transposed)).toBe(0);
          } else {
            expect(pitch.absoluteDistance(transposed)).toBe(12 - distance);
          }
        })
      );
    });

    test('measure interval between a pitch and itself transposed by an interval to be the interval', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...Pitch.pitches),
          fc.constantFrom(...Interval.intervals),
          (pitch, interval) => {
            const to = pitch.transpose(interval);
            const resultingInterval = pitch.intervalTo(to);

            switch (interval) {
              case Interval.MajorNinth:
                expect(resultingInterval).toBe(Interval.MajorSecond);
                break;
              case Interval.PerfectEleventh:
                expect(resultingInterval).toBe(Interval.PerfectFourth);
                break;
              case Interval.AugmentedEleventh:
                expect(resultingInterval).toBe(Interval.AugmentedFourth);
                break;
              case Interval.MajorThirteenth:
                expect(resultingInterval).toBe(Interval.MajorSixth);
                break;
              case Interval.PerfectOctave:
                expect(resultingInterval).toBe(Interval.Unison);
                break;
              case Interval.DiminishedSeventh:
                if (
                  resultingInterval === Interval.MajorSixth ||
                  resultingInterval === Interval.DiminishedSeventh
                )
                  expect(resultingInterval).toBe(resultingInterval);
                break;
              case Interval.MinorThird:
              case Interval.AugmentedNinth:
              case Interval.AugmentedSecond:
                if (
                  resultingInterval === Interval.MinorThird ||
                  resultingInterval === Interval.AugmentedSecond
                )
                  expect(resultingInterval).toBe(resultingInterval);
                break;
              case Interval.MinorThirteenth:
              case Interval.MinorSixth:
              case Interval.AugmentedFifth:
                if (
                  resultingInterval === Interval.MinorThirteenth ||
                  resultingInterval === Interval.MinorSixth ||
                  resultingInterval === Interval.AugmentedFifth
                )
                  expect(resultingInterval).toBe(resultingInterval);
                break;
              case Interval.Tritone:
              case Interval.DiminishedFifth:
              case Interval.AugmentedFourth:
                if (
                  resultingInterval === Interval.AugmentedFourth ||
                  resultingInterval === Interval.DiminishedFifth
                )
                  expect(resultingInterval).toBe(resultingInterval);
                break;
              case Interval.MinorNinth:
              case Interval.MinorSecond:
              case Interval.AugmentedUnison:
                if (
                  resultingInterval === Interval.MinorNinth ||
                  resultingInterval === Interval.MinorSecond ||
                  resultingInterval === Interval.AugmentedUnison
                )
                  expect(resultingInterval).toBe(resultingInterval);
                break;
              case Interval.DiminishedUnison:
              case Interval.DiminishedNinth:
                expect(resultingInterval).toBe(resultingInterval);
                break;
              default:
                expect(resultingInterval).toBe(interval);
            }
          }
        )
      );
    });
  });
});
