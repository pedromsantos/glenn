/* eslint-disable jest/no-conditional-expect */

import * as fc from 'fast-check';

import { Interval } from '../../Domain/Interval';

describe('Interval', () => {
  test('should filter unique intervals', () => {
    expect(Interval.unique).toStrictEqual([
      Interval.Unison,
      Interval.MinorSecond,
      Interval.MajorSecond,
      Interval.MinorThird,
      Interval.MajorThird,
      Interval.PerfectFourth,
      Interval.PerfectFifth,
      Interval.MinorSixth,
      Interval.MajorSixth,
      Interval.MinorSeventh,
      Interval.MajorSeventh,
      Interval.PerfectOctave,
    ]);
  });

  test('inversion of augmented fourth is diminished fifth', () => {
    expect(Interval.AugmentedFourth.invert()).toStrictEqual(Interval.DiminishedFifth);
  });

  test('inversion of diminished fifth is augmented fourth', () => {
    expect(Interval.DiminishedFifth.invert()).toStrictEqual(Interval.AugmentedFourth);
  });

  test('inversion of augmented fifth is augmented fourth', () => {
    expect(Interval.AugmentedFifth.invert()).toStrictEqual(Interval.AugmentedFourth);
  });

  test('inversion of major ninth is major seventh', () => {
    expect(Interval.MinorNinth.invert()).toStrictEqual(Interval.MajorSeventh);
  });

  describe('properties', () => {
    test('Inverting a unique interval twice results in starting interval', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Interval.unique), (interval: Interval) => {
          expect(interval.invert().invert()).toStrictEqual(interval);
        })
      );
    });

    test('Inverting a unique interval twice results in starting interval using primitive intervals', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Interval.unique), (interval: Interval) => {
          expect(interval.invert().invert().To).toStrictEqual(interval.To);
        })
      );
    });

    test('Major 13 interval bigger than other intervals', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Interval.intervals), (interval: Interval) => {
          const largerInterval = Interval.MajorThirteenth;

          if (interval === Interval.MajorThirteenth) {
            expect(largerInterval.isLargarThan(interval)).toBeFalsy();
            return;
          }

          expect(largerInterval.isLargarThan(interval)).toBeTruthy();
        })
      );
    });

    test('Inverting an interval twice results in starting interval', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Interval.intervals), (interval: Interval) => {
          switch (interval) {
            case Interval.AugmentedUnison:
            case Interval.DiminishedUnison:
            case Interval.AugmentedFourth:
            case Interval.Tritone:
            case Interval.DiminishedFifth:
            case Interval.AugmentedFifth:
              break;
            case Interval.MinorNinth:
              expect(interval.invert().invert()).toBe(Interval.MinorSecond);
              break;
            case Interval.MajorNinth:
              expect(interval.invert().invert()).toBe(Interval.MajorSecond);
              break;
            case Interval.DiminishedNinth:
              expect(interval.invert().invert()).toBe(Interval.DiminishedUnison);
              break;
            case Interval.AugmentedNinth:
              expect(interval.invert().invert()).toBe(Interval.AugmentedUnison);
              break;
            case Interval.PerfectEleventh:
              expect(interval.invert().invert()).toBe(Interval.PerfectFourth);
              break;
            case Interval.AugmentedEleventh:
              expect(interval.invert().invert()).toBe(Interval.AugmentedFourth);
              break;
            case Interval.MinorThirteenth:
              expect(interval.invert().invert()).toBe(Interval.MinorSixth);
              break;
            case Interval.MajorThirteenth:
              expect(interval.invert().invert()).toBe(Interval.MajorSixth);
              break;
            default:
              expect(interval.invert().invert()).toBe(interval);
          }
        })
      );
    });

    test('Raising an interval by an octave', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Interval.intervals), (interval: Interval) => {
          switch (interval) {
            case Interval.DiminishedUnison:
            case Interval.AugmentedUnison:
            case Interval.MinorThird:
            case Interval.MajorThird:
            case Interval.PerfectFifth:
            case Interval.Tritone:
            case Interval.DiminishedFifth:
            case Interval.AugmentedFifth:
            case Interval.DiminishedSeventh:
            case Interval.MinorSeventh:
            case Interval.MajorSeventh:
            case Interval.PerfectOctave:
            case Interval.MinorNinth:
            case Interval.MajorNinth:
            case Interval.DiminishedNinth:
            case Interval.AugmentedNinth:
            case Interval.PerfectEleventh:
            case Interval.AugmentedEleventh:
            case Interval.MinorThirteenth:
            case Interval.MajorThirteenth:
              expect(interval.raiseOctave()).toBe(interval);
              break;
            default:
              expect(interval.raiseOctave()).not.toBe(interval);
          }
        })
      );
    });
  });
});
