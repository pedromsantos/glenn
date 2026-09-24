import * as fc from 'fast-check';

import { Duration } from '../../Domain/Duration';
import { Voice } from '../../Domain/Instrument';
import { Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';

describe('Voice', () => {
  describe('Bass range (E2 to E4)', () => {
    test('Min is in range', () => {
      expect(Voice.Bass.isInRange(Voice.Bass.Min)).toBeTruthy();
    });

    test('Max is in range', () => {
      expect(Voice.Bass.isInRange(Voice.Bass.Max)).toBeTruthy();
    });

    test('a note between Min and Max is in range', () => {
      expect(Voice.Bass.isInRange(new Note(Pitch.C, Duration.Whole, Octave.C3))).toBeTruthy();
    });

    test('a note below Min is not in range', () => {
      expect(Voice.Bass.isInRange(new Note(Pitch.C, Duration.Whole, Octave.C1))).toBeFalsy();
    });

    test('a note above Max is not in range', () => {
      expect(Voice.Bass.isInRange(new Note(Pitch.C, Duration.Whole, Octave.C6))).toBeFalsy();
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
