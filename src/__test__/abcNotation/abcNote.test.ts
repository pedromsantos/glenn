import { abcNote } from '../../abcNotation/abcNote';
import { Duration } from '../../Domain/Duration';
import { Note, Octave } from '../../Domain/Note';
import Pitch from '../../Domain/Pitch';

describe('abc Note should', () => {
  test('represent a C4 note', () => {
    const note = new Note(Pitch.C, Duration.Whole, Octave.C4);
    const abc_note = new abcNote(note);

    expect(abc_note.toString()).toBe('C');
  });

  test('represent a C5 note', () => {
    const note = new Note(Pitch.C, Duration.Whole, Octave.C5);
    const abc_note = new abcNote(note);

    expect(abc_note.toString()).toBe('c');
  });

  test('represent a C6 note', () => {
    const note = new Note(Pitch.C, Duration.Whole, Octave.C6);
    const abc_note = new abcNote(note);

    expect(abc_note.toString()).toBe("C''");
  });

  test('represent a C7 note', () => {
    const note = new Note(Pitch.C, Duration.Whole, Octave.C7);
    const abc_note = new abcNote(note);

    expect(abc_note.toString()).toBe("C'''");
  });

  test('represent a C3 note', () => {
    const note = new Note(Pitch.C, Duration.Whole, Octave.C3);
    const abc_note = new abcNote(note);

    expect(abc_note.toString()).toBe('C,');
  });

  test('represent a C2 note', () => {
    const note = new Note(Pitch.C, Duration.Whole, Octave.C2);
    const abc_note = new abcNote(note);

    expect(abc_note.toString()).toBe('C,,');
  });

  test('represent a sharp note', () => {
    const note = new Note(Pitch.FSharp, Duration.Whole, Octave.C4);
    const abc_note = new abcNote(note);

    expect(abc_note.toString()).toBe('^F');
  });

  test('represent a flat note', () => {
    const note = new Note(Pitch.EFlat, Duration.Whole, Octave.C4);
    const abc_note = new abcNote(note);

    expect(abc_note.toString()).toBe('_E');
  });
});
