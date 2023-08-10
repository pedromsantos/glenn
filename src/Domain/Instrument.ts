import { Duration } from './Duration';
import { Note, Octave } from './Note';
import { Pitch } from './Pitch';

export class Voice {
  private static readonly all: Voice[] = [];

  private constructor(
    private readonly minRange: Note,
    private readonly maxRange: Note
  ) {
    Voice.all.push(this);
  }

  get Min() {
    return this.minRange;
  }

  get Max() {
    return this.maxRange;
  }

  public static readonly Bass: Voice = new Voice(
    new Note(Pitch.E, Duration.Quarter, Octave.C2),
    new Note(Pitch.E, Duration.Quarter, Octave.C4)
  );

  public static readonly Baritone: Voice = new Voice(
    new Note(Pitch.A, Duration.Quarter, Octave.C2),
    new Note(Pitch.A, Duration.Quarter, Octave.C4)
  );

  public static readonly Tenor: Voice = new Voice(
    new Note(Pitch.C, Duration.Quarter, Octave.C3),
    new Note(Pitch.C, Duration.Quarter, Octave.C5)
  );

  public static readonly CounterTenor: Voice = new Voice(
    new Note(Pitch.E, Duration.Quarter, Octave.C3),
    new Note(Pitch.E, Duration.Quarter, Octave.C5)
  );

  public static readonly ContrAlto: Voice = new Voice(
    new Note(Pitch.F, Duration.Quarter, Octave.C3),
    new Note(Pitch.F, Duration.Quarter, Octave.C5)
  );

  public static readonly MezzoSoprano: Voice = new Voice(
    new Note(Pitch.A, Duration.Quarter, Octave.C3),
    new Note(Pitch.A, Duration.Quarter, Octave.C5)
  );

  public static readonly Soprano: Voice = new Voice(
    new Note(Pitch.C, Duration.Quarter, Octave.C4),
    new Note(Pitch.C, Duration.Quarter, Octave.C6)
  );
}
