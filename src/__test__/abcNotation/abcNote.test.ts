import { AbcNote, AbcRest } from '../../abcNotation/abcNote';
import { Duration } from '../../Domain/Duration';
import { Note, Octave, Rest } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';

describe('abc Rest should', () => {
  describe('represent a whole rest', () => {
    const rest = new Rest(Duration.Whole);
    test('using default duration whole', () => {
      expect(new AbcRest(rest, Duration.Whole).toString()).toBe('z');
    });

    test('using default duration half', () => {
      expect(new AbcRest(rest, Duration.Half).toString()).toBe('z2');
    });

    test('using default duration quarter', () => {
      expect(new AbcRest(rest, Duration.Quarter).toString()).toBe('z4');
    });

    test('using default duration eighth', () => {
      expect(new AbcRest(rest, Duration.Eighth).toString()).toBe('z8');
    });
  });

  describe('represent a half rest', () => {
    const rest = new Rest(Duration.Half);
    test('with default duration whole', () => {
      expect(new AbcRest(rest, Duration.Whole).toString()).toBe('z/2');
    });

    test('with default duration half', () => {
      expect(new AbcRest(rest, Duration.Half).toString()).toBe('z');
    });

    test('with default duration quarter', () => {
      expect(new AbcRest(rest, Duration.Quarter).toString()).toBe('z2');
    });

    test('with default duration eighth', () => {
      const abc_rest = new AbcRest(rest, Duration.Eighth);

      expect(abc_rest.toString()).toBe('z4');
    });
  });

  describe('represent a quarter rest', () => {
    const rest = new Rest(Duration.Quarter);
    test('defining default duration as whole', () => {
      expect(new AbcRest(rest, Duration.Whole).toString()).toBe('z/4');
    });

    test('defining default duration as half', () => {
      expect(new AbcRest(rest, Duration.Half).toString()).toBe('z/2');
    });

    test('defining default duration as quarter', () => {
      expect(new AbcRest(rest, Duration.Quarter).toString()).toBe('z');
    });

    test('defining default duration as eighth', () => {
      expect(new AbcRest(rest, Duration.Eighth).toString()).toBe('z2');
    });
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
      const abc_note = new AbcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe(expected);
    });
  });

  describe('using accidentals', () => {
    test('represent a sharp F4 note', () => {
      const note = new Note(Pitch.FSharp, Duration.Whole, Octave.C4);
      const abc_note = new AbcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('^F');
    });

    test('represent a sharp C5 note', () => {
      const note = new Note(Pitch.CSharp, Duration.Whole, Octave.C5);
      const abc_note = new AbcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('^c');
    });

    test('represent a flat E5 note', () => {
      const note = new Note(Pitch.EFlat, Duration.Whole, Octave.C5);
      const abc_note = new AbcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('_e');
    });
  });

  describe('using durations', () => {
    describe('relative to a sixteenth note', () => {
      type TestTuple = [Octave, Duration, string];

      test.each<TestTuple>([
        [Octave.C3, Duration.ThirtySecond, '_E,/2'],
        [Octave.C3, Duration.Sixteenth, '_E,'],
        [Octave.C3, Duration.Eighth, '_E,2'],
        [Octave.C4, Duration.Quarter, '_E4'],
        [Octave.C5, Duration.Half, '_e8'],
      ])('represent a note', (octave: Octave, duration: Duration, expected: string) => {
        const note = new Note(Pitch.EFlat, duration, octave);
        const abc_note = new AbcNote(note, Duration.Sixteenth);

        expect(abc_note.toString()).toBe(expected);
      });
    });

    describe('relative to a whole note', () => {
      type TestTuple = [Octave, Duration, string];

      test.each<TestTuple>([
        [Octave.C3, Duration.Sixteenth, '_E,/16'],
        [Octave.C3, Duration.Eighth, '_E,/8'],
        [Octave.C3, Duration.Quarter, '_E,/4'],
        [Octave.C3, Duration.Half, '_E,/2'],
        [Octave.C3, Duration.Whole, '_E,'],
      ])('represent a note', (octave: Octave, duration: Duration, expected: string) => {
        const note = new Note(Pitch.EFlat, duration, octave);
        const abc_note = new AbcNote(note, Duration.Whole);

        expect(abc_note.toString()).toBe(expected);
      });
    });
  });
});
