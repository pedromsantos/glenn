import { AbcNote, AbcRest } from '../../abcNotation/abcNote';
import { Duration } from '../../Domain/Duration';
import { Note, Octave, Rest } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';

describe('abc Rest should', () => {
  type TestTuple = [Duration, string];

  test.each<TestTuple>([
    [Duration.Whole, 'z'],
    [Duration.Half, 'z2'],
    [Duration.Quarter, 'z4'],
    [Duration.Eighth, 'z8'],
  ])('represent a whole', (relativeDuration: Duration, expected: string) => {
    const rest = new Rest(Duration.Whole).To;
    expect(new AbcRest(rest, relativeDuration.To).toString()).toBe(expected);
  });

  test.each<TestTuple>([
    [Duration.Whole, 'z/2'],
    [Duration.Half, 'z'],
    [Duration.Quarter, 'z2'],
    [Duration.Eighth, 'z4'],
  ])('represent a half', (relativeDuration: Duration, expected: string) => {
    const rest = new Rest(Duration.Half).To;
    expect(new AbcRest(rest, relativeDuration.To).toString()).toBe(expected);
  });

  test.each<TestTuple>([
    [Duration.Whole, 'z/4'],
    [Duration.Half, 'z/2'],
    [Duration.Quarter, 'z'],
    [Duration.Eighth, 'z2'],
  ])('represent a quarter', (relativeDuration: Duration, expected: string) => {
    const rest = new Rest(Duration.Quarter);
    expect(new AbcRest(rest.To, relativeDuration.To).toString()).toBe(expected);
  });
});

describe('abc Note should', () => {
  describe('using octaves', () => {
    type TestTuple = [Octave, string];

    test.each<TestTuple>([
      [Octave.C2, 'C,,'],
      [Octave.C3, 'C,'],
      [Octave.C4, 'C'],
      [Octave.C5, 'c'],
      [Octave.C6, "C''"],
      [Octave.C7, "C'''"],
    ])('represent a note with octave', (octave: Octave, expected: string) => {
      const note = new Note(Pitch.C, Duration.Whole, octave);
      const abc_note = new AbcNote(note.To, Duration.Whole.To);

      expect(abc_note.toString()).toBe(expected);
    });
  });

  describe('using accidentals', () => {
    test('represent a sharp F4 note', () => {
      const note = new Note(Pitch.FSharp, Duration.Whole, Octave.C4);
      const abc_note = new AbcNote(note.To, Duration.Whole.To);

      expect(abc_note.toString()).toBe('^F');
    });

    test('represent a sharp C5 note', () => {
      const note = new Note(Pitch.CSharp, Duration.Whole, Octave.C5);
      const abc_note = new AbcNote(note.To, Duration.Whole.To);

      expect(abc_note.toString()).toBe('^c');
    });

    test('represent a flat E5 note', () => {
      const note = new Note(Pitch.EFlat, Duration.Whole, Octave.C5);
      const abc_note = new AbcNote(note.To, Duration.Whole.To);

      expect(abc_note.toString()).toBe('_e');
    });
  });

  describe('represent a note', () => {
    type TestTuple = [Octave, Duration, Duration, string];

    test.each<TestTuple>([
      [Octave.C3, Duration.Sixteenth, Duration.ThirtySecond, '_E,/2'],
      [Octave.C3, Duration.Sixteenth, Duration.Sixteenth, '_E,'],
      [Octave.C3, Duration.Sixteenth, Duration.Eighth, '_E,2'],
      [Octave.C4, Duration.Sixteenth, Duration.Quarter, '_E4'],
      [Octave.C5, Duration.Sixteenth, Duration.Half, '_e8'],
      [Octave.C3, Duration.Whole, Duration.Sixteenth, '_E,/16'],
      [Octave.C3, Duration.Whole, Duration.Eighth, '_E,/8'],
      [Octave.C3, Duration.Whole, Duration.Quarter, '_E,/4'],
      [Octave.C3, Duration.Whole, Duration.Half, '_E,/2'],
      [Octave.C3, Duration.Whole, Duration.Whole, '_E,'],
    ])(
      'relative to',
      (octave: Octave, referenceDuration: Duration, duration: Duration, expected: string) => {
        const note = new Note(Pitch.EFlat, duration, octave);
        const abc_note = new AbcNote(note.To, referenceDuration.To);

        expect(abc_note.toString()).toBe(expected);
      }
    );
  });
});
