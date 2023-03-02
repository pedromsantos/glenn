import { abcBody, abcTune } from '../../abcNotation/abcTune';
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

    const body = new abcBody(Duration.Eighth)
      .addMeasure(measure)
      .addMeasure(measure, Duration.Sixteenth)
      .addMeasure(measure, Duration.Quarter);

    expect(body.toString()).toBe('|C2E2GABC|C4E4G2A2B2C2|CEG/2A/2B/2C/2|');
  });
});

describe('abc Tune should', () => {
  test('create abc tune notation', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const measure = new Measure(timeSignature)
      .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.E, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.G, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.A, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.B, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.C, Duration.Eighth, Octave.C4));

    const tune = new abcTune(Duration.Eighth)
      .addMeasure(measure)
      .addMeasure(measure, Duration.Sixteenth)
      .addMeasure(measure, Duration.Quarter);

    expect(tune.toString()).toBe('|C2E2GABC|C4E4G2A2B2C2|CEG/2A/2B/2C/2|');
  });
});
