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
});
