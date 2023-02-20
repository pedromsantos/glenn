import { abcNote } from '../../abcNotation/abcNote';
import { Duration } from '../../Domain/Duration';
import { Note, Octave } from '../../Domain/Note';
import Pitch from '../../Domain/Pitch';

describe('abc Note should', () => {
  describe('using octaves', () => {
    test('represent a C4 note', () => {
      const note = new Note(Pitch.C, Duration.Whole, Octave.C4);
      const abc_note = new abcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('C');
    });

    test('represent a C5 note', () => {
      const note = new Note(Pitch.C, Duration.Whole, Octave.C5);
      const abc_note = new abcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('c');
    });

    test('represent a C6 note', () => {
      const note = new Note(Pitch.C, Duration.Whole, Octave.C6);
      const abc_note = new abcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe("C''");
    });

    test('represent a C7 note', () => {
      const note = new Note(Pitch.C, Duration.Whole, Octave.C7);
      const abc_note = new abcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe("C'''");
    });

    test('represent a C3 note', () => {
      const note = new Note(Pitch.C, Duration.Whole, Octave.C3);
      const abc_note = new abcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('C,');
    });

    test('represent a C2 note', () => {
      const note = new Note(Pitch.C, Duration.Whole, Octave.C2);
      const abc_note = new abcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('C,,');
    });
  });

  describe('using accidentals', () => {
    test('represent a sharp note', () => {
      const note = new Note(Pitch.FSharp, Duration.Whole, Octave.C4);
      const abc_note = new abcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('^F');
    });

    test('represent a sharp C5 note', () => {
      const note = new Note(Pitch.FSharp, Duration.Whole, Octave.C5);
      const abc_note = new abcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('^f');
    });

    test('represent a flat C5 note', () => {
      const note = new Note(Pitch.EFlat, Duration.Whole, Octave.C5);
      const abc_note = new abcNote(note, Duration.Whole);

      expect(abc_note.toString()).toBe('_e');
    });
  });

  describe('using durations', () => {
    describe('relative to an eight note', () => {
      test('represent a ThirtySecond note', () => {
        const note = new Note(Pitch.EFlat, Duration.ThirtySecond, Octave.C3);
        const abc_note = new abcNote(note, Duration.Sixteenth);

        expect(abc_note.toString()).toBe('_E,/2');
      });

      test('represent a Sixteenth note', () => {
        const note = new Note(Pitch.EFlat, Duration.Sixteenth, Octave.C3);
        const abc_note = new abcNote(note, Duration.Sixteenth);

        expect(abc_note.toString()).toBe('_E,');
      });

      test('represent a eight note', () => {
        const note = new Note(Pitch.EFlat, Duration.Eighth, Octave.C3);
        const abc_note = new abcNote(note, Duration.Sixteenth);

        expect(abc_note.toString()).toBe('_E,2');
      });

      test('represent a quarter note', () => {
        const note = new Note(Pitch.EFlat, Duration.Quarter, Octave.C4);
        const abc_note = new abcNote(note, Duration.Sixteenth);

        expect(abc_note.toString()).toBe('_E4');
      });

      test('represent a half note', () => {
        const note = new Note(Pitch.EFlat, Duration.Half, Octave.C5);
        const abc_note = new abcNote(note, Duration.Sixteenth);

        expect(abc_note.toString()).toBe('_e8');
      });
    });
    describe('relative to an whole note', () => {
      test('represent a Sixteenth note', () => {
        const note = new Note(Pitch.EFlat, Duration.Sixteenth, Octave.C3);
        const abc_note = new abcNote(note, Duration.Whole);

        expect(abc_note.toString()).toBe('_E,/16');
      });

      test('represent a Eighth note', () => {
        const note = new Note(Pitch.EFlat, Duration.Eighth, Octave.C3);
        const abc_note = new abcNote(note, Duration.Whole);

        expect(abc_note.toString()).toBe('_E,/8');
      });

      test('represent a Quarter note', () => {
        const note = new Note(Pitch.EFlat, Duration.Quarter, Octave.C3);
        const abc_note = new abcNote(note, Duration.Whole);

        expect(abc_note.toString()).toBe('_E,/4');
      });

      test('represent a Half note', () => {
        const note = new Note(Pitch.EFlat, Duration.Half, Octave.C3);
        const abc_note = new abcNote(note, Duration.Whole);

        expect(abc_note.toString()).toBe('_E,/2');
      });

      test('represent a Whole note', () => {
        const note = new Note(Pitch.EFlat, Duration.Whole, Octave.C3);
        const abc_note = new abcNote(note, Duration.Whole);

        expect(abc_note.toString()).toBe('_E,');
      });

      test('represent a Double note', () => {
        const note = new Note(Pitch.EFlat, Duration.Double, Octave.C3);
        const abc_note = new abcNote(note, Duration.Whole);

        expect(abc_note.toString()).toBe('_E,2');
      });
    });
  });
});
