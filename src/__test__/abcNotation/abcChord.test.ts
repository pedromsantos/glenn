import { abcChord } from '../../abcNotation/abcChord';
import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import Pitch from '../../Domain/Pitch';

describe('abc Chord should', () => {
  test('convert a C major triad to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
    const abc_chord = new abcChord(chord);

    expect(abc_chord.toString()).toBe('[CEG]');
  });

  test('convert a C major 7 to abc notation', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);
    const abc_chord = new abcChord(chord);

    expect(abc_chord.toString()).toBe('[CEGB]');
  });
});
