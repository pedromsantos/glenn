import Pitch from '../../Domain/Pitch';
import { Note, Octave } from '../../Domain/Note';
import * as fc from 'fast-check';
import { Duration } from '../../Domain/Duration';

describe('Note', () => {
  test('midi values for notes start at 0 and go to 128', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.pitches),
        fc.constantFrom(...Octave.octaves),
        (pitch, octave) => {
          const note = new Note(pitch, Duration.Quarter, octave);

          expect(note.midiNumber()).toBe(octave.getMidiBaseValue() + pitch.getNumericValue());
        }
      ),
      { verbose: true }
    );
  });
});
