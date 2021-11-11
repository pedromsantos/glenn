import { Duration, TimeSignature } from '../../Domain/Duration';

describe('Duration', () => {
  describe('converted to beats in 4/4', () => {
    const timeSignature = new TimeSignature(4, Duration.Quarter);
    test('Whole note is four beats', () => {
      expect(Duration.Whole.toBeats(timeSignature)).toBe(4.0);
    });

    test('Quarter note is a beat', () => {
      expect(Duration.Quarter.toBeats(timeSignature)).toBe(1.0);
    });

    test('Eighth note in is a half a beat', () => {
      expect(Duration.Eighth.toBeats(timeSignature)).toBe(1.0 / 2.0);
    });
  });

  describe('converted to beats in 3/4', () => {
    const timeSignature = new TimeSignature(3, Duration.Quarter);
    test('Quarter note is a beat', () => {
      expect(Duration.Quarter.toBeats(timeSignature)).toBe(1.0);
    });

    test('Eighth note is half a beat', () => {
      expect(Duration.Eighth.toBeats(timeSignature)).toBe(1.0 / 2.0);
    });
  });

  describe('Number of notes to fill measure in 4/4', () => {
    const timeSignature = new TimeSignature(4, Duration.Quarter);

    test('One Whole note', () => {
      expect(Duration.Whole.toFillMeasure(timeSignature)).toBe(1);
    });

    test('Two Half notes', () => {
      expect(Duration.Half.toFillMeasure(timeSignature)).toBe(2);
    });

    test('Four Quarter notes', () => {
      expect(Duration.Quarter.toFillMeasure(timeSignature)).toBe(4);
    });

    test('Eighth Eighth notes', () => {
      expect(Duration.Eighth.toFillMeasure(timeSignature)).toBe(8);
    });
  });

  describe('Number of notes remaining to fill a measure in 4/4', () => {
    const timeSignature = new TimeSignature(4, Duration.Quarter);

    describe('when measure contains a whole note its full', () => {
      test('cannot fit a whole note', () => {
        expect(
          Duration.Whole.remainingToFillMeasure(timeSignature, [Duration.Whole])
        ).toBe(0);
      });

      test('cannot fit a half note', () => {
        expect(
          Duration.Whole.remainingToFillMeasure(timeSignature, [Duration.Whole])
        ).toBe(0);
      });

      test('cannot fit a quarter note', () => {
        expect(
          Duration.Quarter.remainingToFillMeasure(timeSignature, [
            Duration.Whole,
          ])
        ).toBe(0);
      });

      test('cannot fit a eighth note', () => {
        expect(
          Duration.Eighth.remainingToFillMeasure(timeSignature, [
            Duration.Whole,
          ])
        ).toBe(0);
      });
    });

    test('when measure contains quarter note a whole note does not fit', () => {
      expect(
        Duration.Whole.remainingToFillMeasure(timeSignature, [Duration.Quarter])
      ).toBe(0);
    });

    test('when measure contains a half note it has space for two quarter notes', () => {
      expect(
        Duration.Quarter.remainingToFillMeasure(timeSignature, [Duration.Half])
      ).toBe(2);
    });

    test('when measure contains a half note it has space for four eighth notes', () => {
      expect(
        Duration.Eighth.remainingToFillMeasure(timeSignature, [Duration.Half])
      ).toBe(4);
    });

    test('when measure contains a quarter note it has space for three quarter notes', () => {
      expect(
        Duration.Quarter.remainingToFillMeasure(timeSignature, [
          Duration.Quarter,
        ])
      ).toBe(3);
    });
  });
});
