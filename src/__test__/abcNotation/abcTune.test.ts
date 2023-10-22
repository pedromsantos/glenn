import { AbcTune } from '../../abcNotation/abcTune';
import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import { Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { Key } from '../../Domain/Key';
import { Note, Octave, Rest } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { Song } from '../../Domain/Song';

describe('abc Tune should', () => {
  const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
  const song = new Song(timeSignature, Key.CMajor);

  song
    .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
    .add(new Note(Pitch.E, Duration.Quarter, Octave.C4))
    .add(new Note(Pitch.G, Duration.Eighth, Octave.C4))
    .add(new Rest(Duration.Eighth))
    .add(new Note(Pitch.B, Duration.Eighth, Octave.C4))
    .add(new Note(Pitch.C, Duration.Eighth, Octave.C5))
    .add(new ClosedChord(Pitch.C, ChordPattern.Major, Duration.Whole));

  test('create abc notation with eighth note default duration', () => {
    const tune = new AbcTune(song, Duration.Eighth);

    expect(tune.toString()).toBe('X:1\nK:C\nM:4/4\nL:1/8\n|C2E2GzBc|[C8E8G8]|');
  });

  test('create abc notation tune with sixteenth note default duration', () => {
    const tune = new AbcTune(song, Duration.Sixteenth);

    expect(tune.toString()).toBe('X:1\nK:C\nM:4/4\nL:1/16\n|C4E4G2z2B2c2|[C16E16G16]|');
  });

  test('create abc notation tune with quarter note default duration', () => {
    const tune = new AbcTune(song, Duration.Quarter);

    expect(tune.toString()).toBe('X:1\nK:C\nM:4/4\nL:1/4\n|CEG/2z/2B/2c/2|[C4E4G4]|');
  });
});
