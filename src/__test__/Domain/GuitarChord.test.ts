import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import { Duration } from '../../Domain/Duration';
import { GuitarChord, Position } from '../../Domain/Guitar';
import { Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';

describe('Guitar chord', function () {
  describe('chord', () => {
    test('C Major triad on open position', () => {
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major, Duration.Quarter, Octave.C4);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const frets = Array.from(guitarChord);

      const expected = [0, 1, 0, 2, 3, 0].reverse();

      expect(frets.map((f) => f.Number)).toStrictEqual(expected);
    });

    test('G Major triad on open position', () => {
      const chord = new ClosedChord(Pitch.G, ChordPattern.Major, Duration.Quarter, Octave.C4);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '3\n0\n0\n0\n2\n3'.split('').reverse().join('');

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('A Major triad on open position', () => {
      const chord = new ClosedChord(Pitch.A, ChordPattern.Major, Duration.Quarter, Octave.C4);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '0\n2\n2\n2\n0\n0'.split('').reverse().join('');

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('A minor triad on open position', () => {
      const chord = new ClosedChord(Pitch.A, ChordPattern.Minor, Duration.Quarter, Octave.C4);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '0\n1\n2\n2\n0\n0'.split('').reverse().join('');

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('E Major triad on open position', () => {
      const chord = new ClosedChord(Pitch.E, ChordPattern.Major, Duration.Quarter, Octave.C4);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '0\n0\n1\n2\n2\n0'.split('').reverse().join('');

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('E minor triad on open position', () => {
      const chord = new ClosedChord(Pitch.E, ChordPattern.Minor, Duration.Quarter, Octave.C4);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '0\n0\n0\n2\n2\n0'.split('').reverse().join('');

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('C Major triad on A position', () => {
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major, Duration.Quarter, Octave.C4);
      const guitarChord = GuitarChord.inPosition(chord, Position.A);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '-\n-\n-\n5\n7\n8'.split('').reverse().join('');

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });
  });
});
