import * as fc from 'fast-check';

import { Duration } from '../../Domain/Duration';
import { Voice } from '../../Domain/Instrument';
import { Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';

describe('Voice', () => {
  describe('Bass range (E2 to E4)', () => {
    test.each([
      { scenario: 'Min', note: Voice.Bass.Min, inRange: true },
      { scenario: 'Max', note: Voice.Bass.Max, inRange: true },
      {
        scenario: 'a note between Min and Max',
        note: new Note(Pitch.C, Duration.Whole, Octave.C3),
        inRange: true,
      },
      {
        scenario: 'a note below Min',
        note: new Note(Pitch.C, Duration.Whole, Octave.C1),
        inRange: false,
      },
      {
        scenario: 'a note above Max',
        note: new Note(Pitch.C, Duration.Whole, Octave.C6),
        inRange: false,
      },
    ])('$scenario is in range: $inRange', ({ note, inRange }) => {
      expect(Voice.Bass.isInRange(note)).toBe(inRange);
    });
  });

  test('every voice contains its own Min and Max', () => {
    const voices = [
      Voice.Bass,
      Voice.Baritone,
      Voice.Tenor,
      Voice.CounterTenor,
      Voice.ContrAlto,
      Voice.MezzoSoprano,
      Voice.Soprano,
    ];

    fc.assert(
      fc.property(fc.constantFrom(...voices), (voice: Voice) => {
        expect(voice.isInRange(voice.Min)).toBeTruthy();
        expect(voice.isInRange(voice.Max)).toBeTruthy();
      }),
      { verbose: true }
    );
  });

  test('a note way above every voice range is never in range', () => {
    const voices = [
      Voice.Bass,
      Voice.Baritone,
      Voice.Tenor,
      Voice.CounterTenor,
      Voice.ContrAlto,
      Voice.MezzoSoprano,
      Voice.Soprano,
    ];
    const veryHighNote = new Note(Pitch.C, Duration.Whole, Octave.C8);

    fc.assert(
      fc.property(fc.constantFrom(...voices), (voice: Voice) => {
        expect(voice.isInRange(veryHighNote)).toBeFalsy();
      }),
      { verbose: true }
    );
  });
});
