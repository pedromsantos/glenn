import { AbcMeasure } from '../../abcNotation/abcMeasure';
import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import { Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { Note, Octave, Rest } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { Measure } from '../../Domain/Song';

describe('abc Measure should', () => {
  test('convert measure containing notes to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const measure = new Measure(timeSignature)
      .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.E, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.G, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.A, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.B, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.C, Duration.Eighth, Octave.C4));

    const abc = new AbcMeasure(measure, Duration.Eighth.To);

    expect(abc.toString()).toBe('C2E2GABC');
  });

  test('convert measure containing rests to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const measure = new Measure(timeSignature)
      .add(new Rest(Duration.Half))
      .add(new Rest(Duration.Quarter))
      .add(new Rest(Duration.Quarter));

    const abc = new AbcMeasure(measure, Duration.Quarter.To);

    expect(abc.toString()).toBe('z2zz');
  });

  test('convert measure containing notes and rests to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const measure = new Measure(timeSignature)
      .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      .add(new Rest(Duration.Quarter))
      .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      .add(new Rest(Duration.Quarter));

    const abc = new AbcMeasure(measure, Duration.Quarter.To);

    expect(abc.toString()).toBe('CzCz');
  });

  test('convert measure containing notes, rests and chords to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const measure = new Measure(timeSignature)
      .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      .add(new Rest(Duration.Quarter))
      .add(new Note(Pitch.G, Duration.Quarter, Octave.C4))
      .add(new ClosedChord(Pitch.C, ChordPattern.Major, Duration.Quarter));

    const abc = new AbcMeasure(measure, Duration.Quarter.To);

    expect(abc.toString()).toBe('CzG[CEG]');
  });
});
