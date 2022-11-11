import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import { GuitarChord, Position } from '../../Domain/Guitar';
import Pitch from '../../Domain/Pitch';

describe('Guitar chord', function () {
  describe('chord', () => {
    test('C Major triad on open position', () => {
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expected = '0\n1\n0\n2\n3\n0';

      expect(stringifiedChord).toStrictEqual(expected);
    });

    test('G Major triad on open position', () => {
      const chord = new ClosedChord(Pitch.G, ChordPattern.Major);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '3\n0\n0\n0\n2\n3';

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('A Major triad on open position', () => {
      const chord = new ClosedChord(Pitch.A, ChordPattern.Major);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '0\n2\n2\n2\n0\n0';

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('A minor triad on open position', () => {
      const chord = new ClosedChord(Pitch.A, ChordPattern.Minor);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '0\n1\n2\n2\n0\n0';

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('E Major triad on open position', () => {
      const chord = new ClosedChord(Pitch.E, ChordPattern.Major);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '0\n0\n1\n2\n2\n0';

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('E minor triad on open position', () => {
      const chord = new ClosedChord(Pitch.E, ChordPattern.Minor);
      const guitarChord = GuitarChord.inPosition(chord, Position.Open);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '0\n0\n0\n2\n2\n0';

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });

    test('C Major triad on A position', () => {
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
      const guitarChord = GuitarChord.inPosition(chord, Position.A);
      const stringifiedChord = guitarChord.toString();

      const expectedTab = '-\n-\n-\n5\n7\n8';

      expect(stringifiedChord).toStrictEqual(expectedTab);
    });
  });
});
