import * as Duration from '../../Domain/Duration';

describe('Duration', () => {
  describe('converted to beats in 4/4', () => {
    const timeSignature = new Duration.TimeSignature(
      4,
      Duration.Duration.Quarter
    );
    test('Whole note is four beats', () => {
      expect(Duration.Duration.Whole.toBeats(timeSignature)).toBe(4.0);
    });

    test('Quarter note is a beat', () => {
      expect(Duration.Duration.Quarter.toBeats(timeSignature)).toBe(1.0);
    });

    test('Eighth note in is a half a beat', () => {
      expect(Duration.Duration.Eighth.toBeats(timeSignature)).toBe(1.0 / 2.0);
    });
  });

  describe('converted to beats in 3/4', () => {
    const timeSignature = new Duration.TimeSignature(
      3,
      Duration.Duration.Quarter
    );
    test('Quarter note is a beat', () => {
      expect(Duration.Duration.Quarter.toBeats(timeSignature)).toBe(1.0);
    });

    test('Eighth note is half a beat', () => {
      expect(Duration.Duration.Eighth.toBeats(timeSignature)).toBe(1.0 / 2.0);
    });
  });

  describe('Number of notes to fill measure in 4/4', () => {
    const timeSignature = new Duration.TimeSignature(
      4,
      Duration.Duration.Quarter
    );

    test('One Whole note', () => {
      expect(Duration.Duration.Whole.toFill(timeSignature)).toBe(1);
    });

    test('Two Half notes', () => {
      expect(Duration.Duration.Half.toFill(timeSignature)).toBe(2);
    });

    test('Four Quarter notes', () => {
      expect(Duration.Duration.Quarter.toFill(timeSignature)).toBe(4);
    });

    test('Eighth Eighth notes', () => {
      expect(Duration.Duration.Eighth.toFill(timeSignature)).toBe(8);
    });
  });
});
