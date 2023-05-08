import { abcTune } from '../../abcNotation/abcTune';
import { Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { Key } from '../../Domain/Key';
import { Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { Song } from '../../Domain/Song';

describe('abc Tune should', () => {
  const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
  const song = new Song(timeSignature, Key.CMajor);

  song
    .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
    .add(new Note(Pitch.E, Duration.Quarter, Octave.C4))
    .add(new Note(Pitch.G, Duration.Eighth, Octave.C4))
    .add(new Note(Pitch.A, Duration.Eighth, Octave.C4))
    .add(new Note(Pitch.B, Duration.Eighth, Octave.C4))
    .add(new Note(Pitch.C, Duration.Eighth, Octave.C5));

  test('create abc notation with eighth note default duration', () => {
    const tune = new abcTune(song, Duration.Eighth);

    expect(tune.toString()).toBe('X:1\nK:C\nM:4/4\nL:1/8\n|C2E2GABc|');
  });

  test('create abc notation tune with sixteenth note default duration', () => {
    const tune = new abcTune(song, Duration.Sixteenth);

    expect(tune.toString()).toBe('X:1\nK:C\nM:4/4\nL:1/16\n|C4E4G2A2B2c2|');
  });

  test('create abc notation tune with quarter note default duration', () => {
    const tune = new abcTune(song, Duration.Quarter);

    expect(tune.toString()).toBe('X:1\nK:C\nM:4/4\nL:1/4\n|CEG/2A/2B/2c/2|');
  });
});
