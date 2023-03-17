import { abcMeasure } from '../../abcNotation/abcMeasure';
import { Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { Measure } from '../../Domain/Song';

describe('abc Measure should', () => {
  test('convert measure to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const measure = new Measure(timeSignature)
      .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.E, Duration.Quarter, Octave.C4))
      .add(new Note(Pitch.G, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.A, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.B, Duration.Eighth, Octave.C4))
      .add(new Note(Pitch.C, Duration.Eighth, Octave.C4));

    const abc = new abcMeasure(measure, Duration.Eighth);

    expect(abc.toString()).toBe('C2E2GABC');
  });
});
