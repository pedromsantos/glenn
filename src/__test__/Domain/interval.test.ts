/* eslint-disable jest/no-conditional-expect */

import * as fc from 'fast-check';

import { Interval } from '../../Domain/Interval';

describe('Interval', () => {
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
