import * as fc from 'fast-check';

import { Duration } from '../../Domain/Duration';
import { MelodicPhrase, Note, Octave } from '../../Domain/Note';
import Pitch from '../../Domain/Pitch';

describe('Note', () => {
  test('convert to primitive', () => {
    const note = new Note(Pitch.C, Duration.Quarter, Octave.Contra);

    const notePrimitive = note.To;

    expect(notePrimitive).toStrictEqual({
      duration: { duration: 0.25, name: 'Quarter' },
      pitch: { name: 'C', value: 0 },
    });
  });

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

describe('Melodic phrase', () => {
  test('convert to primitive', () => {
    const phrase = new MelodicPhrase([new Note(Pitch.C, Duration.Quarter, Octave.Contra)]);
    const phrasePrimitive = phrase.To;

    expect(phrasePrimitive).toStrictEqual({
      notes: [
        {
          duration: { duration: 0.25, name: 'Quarter' },
          pitch: { name: 'C', value: 0 },
        },
      ],
    });
  });
});
