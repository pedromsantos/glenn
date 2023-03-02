import { abcTune } from '../../abcNotation/abcTune';
import { Duration, SimpleTimeSignature } from '../../Domain/Duration';
import Key from '../../Domain/Key';
import { Note, Octave } from '../../Domain/Note';
import Pitch from '../../Domain/Pitch';
import { Measure } from '../../Domain/Song';

describe('abc Tune should', () => {
  test('create abc notation tune', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const measure = new Measure(timeSignature)
      .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.E, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.G, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.A, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.B, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.C, Duration.Eighth, Octave.C5));

    const tune = new abcTune(Key.CMajor, timeSignature, Duration.Eighth)
      .addMeasure(measure)
      .addMeasure(measure, Duration.Sixteenth)
      .addMeasure(measure, Duration.Quarter);

    expect(tune.toString()).toBe('K:C/nM:4/4/nL:1/8/n|C2E2GABc|C4E4G2A2B2c2|CEG/2A/2B/2c/2|');
  });
});
