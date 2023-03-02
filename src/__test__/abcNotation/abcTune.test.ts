import { abcMeasure } from '../../abcNotation/abcMeasure';
import { abcBody } from '../../abcNotation/abcTune';
import { Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { Note, Octave } from '../../Domain/Note';
import Pitch from '../../Domain/Pitch';
import { Measure } from '../../Domain/Song';

describe('abc Body should', () => {
  test('convert body to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const measure = new Measure(timeSignature)
      .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.E, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.G, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.A, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.B, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.C, Duration.Eighth, Octave.C4));

    const measure1 = new abcMeasure(measure, Duration.Eighth);
    const measure2 = new abcMeasure(measure, Duration.Sixteenth);
    const measure3 = new abcMeasure(measure, Duration.Quarter);

    const tune = new abcBody([measure1, measure2, measure3]);

    expect(tune.toString()).toBe('|C2E2GABC|C4E4G2A2B2C2|CEG/2A/2B/2C/2|');
  });
});
