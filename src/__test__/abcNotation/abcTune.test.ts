import { abcTune } from '../../abcNotation/abcTune';
import { Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { Key } from '../../Domain/Key';
import { Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { Song } from '../../Domain/Song';

describe('abc Tune should', () => {
  test('create abc notation tune', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const song = new Song(timeSignature, Key.CMajor);

    song
      .addNote(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      .addNote(new Note(Pitch.E, Duration.Quarter, Octave.C4))
      .addNote(new Note(Pitch.G, Duration.Eighth, Octave.C4))
      .addNote(new Note(Pitch.A, Duration.Eighth, Octave.C4))
      .addNote(new Note(Pitch.B, Duration.Eighth, Octave.C4))
      .addNote(new Note(Pitch.C, Duration.Eighth, Octave.C5));

    const tune = new abcTune(song, Duration.Eighth);

    expect(tune.toString()).toBe('X:1\nK:C\nM:4/4\nL:1/8\n|C2E2GABc|');
  });
});
