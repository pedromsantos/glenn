import { AbcChord, AbcGuitarChord } from '../../abcNotation/abcChord';
import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import { Duration } from '../../Domain/Duration';
import { Pitch } from '../../Domain/Pitch';

describe('abc Chord should', () => {
  test('convert a C major triad to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
    const abc_chord = new AbcChord(chord, Duration.Whole);

    expect(abc_chord.toString()).toBe('[CEG]');
  });

  test('convert a C major 7 to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);
    const abc_chord = new AbcChord(chord, Duration.Whole);

    expect(abc_chord.toString()).toBe('[CEGB]');
  });
});

describe('abc Guitar Chord should', () => {
  test('convert a C major triad to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
    const abc_chord = new AbcGuitarChord(chord);

    expect(abc_chord.toString()).toBe('"C"');
  });

  test('convert a C major 7 to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);
    const abc_chord = new AbcGuitarChord(chord);

    expect(abc_chord.toString()).toBe('"CMaj7"');
  });

  test('convert a C minor 7 to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Minor7);
    const abc_chord = new AbcGuitarChord(chord);

    expect(abc_chord.toString()).toBe('"Cm7"');
  });

  test('convert a C minor 6 to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Minor6);
    const abc_chord = new AbcGuitarChord(chord);

    expect(abc_chord.toString()).toBe('"Cm6"');
  });

  test('convert a C half diminished to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Minor7b5);
    const abc_chord = new AbcGuitarChord(chord);

    expect(abc_chord.toString()).toBe('"Cm7b5"');
  });

  test('convert a C diminished to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Diminished);
    const abc_chord = new AbcGuitarChord(chord);

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
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major, duration);

      const abc_chord = new AbcChord(chord, referenceDuration);

      expect(abc_chord.toString()).toBe(expected);
    });
  });
});
