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
        }),
        { verbose: true }
      );
    });

    test('Inverting a unique interval twice results in starting interval using primitive intervals', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Interval.unique), (interval: Interval) => {
          expect(interval.invert().invert().To).toStrictEqual(interval.To);
        }),
        { verbose: true }
      );
    });

    test('Inverting an interval twice results in starting interval', () => {
      fc.assert(
        fc.property(fc.constantFrom(...Interval.intervals), (interval: Interval) => {
          switch (interval) {
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
            case Interval.AugmentedNinth:
              expect(interval.invert().invert()).toBe(Interval.AugmentedSecond);
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
        }),
        { verbose: true }
      );
    });
  });
});
