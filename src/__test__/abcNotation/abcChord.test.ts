import { AbcChord, AbcGuitarChord } from '../../abcNotation/abcChord';
import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import { Duration } from '../../Domain/Duration';
import { Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';

describe('abc Chord should', () => {
  test('convert a C major triad to abc notation', () => {
    const chord = new ClosedChord(Pitch.G, ChordPattern.Major, Duration.Quarter, Octave.C4);
    const abc_chord = new AbcChord(chord.To, Duration.Whole.To);

    expect(abc_chord.toString()).toBe('[G/4B/4D/4]');
  });

  test('convert a C major 7 to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7, Duration.Quarter, Octave.C4);
    const abc_chord = new AbcChord(chord.To, Duration.Whole.To);

    expect(abc_chord.toString()).toBe('[C/4E/4G/4B/4]');
  });
});

describe('abc Guitar Chord should', () => {
  test('convert a C major triad to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major, Duration.Quarter, Octave.C4);
    const abc_chord = new AbcGuitarChord(chord.To);

    expect(abc_chord.toString()).toBe('"C"');
  });

  test('convert a C major 7 to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7, Duration.Quarter, Octave.C4);
    const abc_chord = new AbcGuitarChord(chord.To);

    expect(abc_chord.toString()).toBe('"CMaj7"');
  });

  test('convert a C minor 7 to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Minor7, Duration.Quarter, Octave.C4);
    const abc_chord = new AbcGuitarChord(chord.To);

    expect(abc_chord.toString()).toBe('"Cm7"');
  });

  test('convert a C minor 6 to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Minor6, Duration.Quarter, Octave.C4);
    const abc_chord = new AbcGuitarChord(chord.To);

    expect(abc_chord.toString()).toBe('"Cm6"');
  });

  test('convert a C half diminished to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Minor7b5, Duration.Quarter, Octave.C4);
    const abc_chord = new AbcGuitarChord(chord.To);

    expect(abc_chord.toString()).toBe('"Cm7b5"');
  });

  test('convert a C diminished to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Diminished, Duration.Quarter, Octave.C4);
    const abc_chord = new AbcGuitarChord(chord.To);

    expect(abc_chord.toString()).toBe('"Cdim"');
  });

  describe('represent a chord duration', () => {
    type TestTuple = [Duration, Duration, string];

    test.each<TestTuple>([
      [Duration.Whole, Duration.Half, '[C/2E/2G/2]'],
      [Duration.Whole, Duration.Quarter, '[C/4E/4G/4]'],
      [Duration.Quarter, Duration.Whole, '[C4E4G4]'],
      [Duration.Quarter, Duration.Quarter, '[CEG]'],
      [Duration.Quarter, Duration.Eighth, '[C/2E/2G/2]'],
      [Duration.Quarter, Duration.Sixteenth, '[C/4E/4G/4]'],
    ])('relative to', (referenceDuration: Duration, duration: Duration, expected: string) => {
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major, duration, Octave.C4);

      const abc_chord = new AbcChord(chord.To, referenceDuration.To);

      expect(abc_chord.toString()).toBe(expected);
    });
  });
});
