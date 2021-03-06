import * as fc from 'fast-check';

import { Duration } from '../../Domain/Duration';
import { Note, Octave } from '../../Domain/Note';
import Pitch from '../../Domain/Pitch';

describe('Note', () => {
  test('midi values for notes start at 0 and go to 128', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.pitches),
        fc.constantFrom(...Octave.octaves),
        (pitch: Pitch, octave: Octave) => {
          const note = new Note(pitch, Duration.Quarter, octave);

          expect(note.MidiNumber).toBe(octave.MidiBaseValue + pitch.NumericValue);
        }
      ),
      { verbose: true }
    );
  });
});
