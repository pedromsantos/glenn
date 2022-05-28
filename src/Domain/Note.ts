import { Duration, DurationState } from './Duration';
import Pitch, { PitchState } from './Pitch';

export type OctaveState = {
  name: string;
  value: number;
  midi: number;
};

// Stryker disable StringLiteral
export class Octave {
  private constructor(
    private readonly octaveName: string,
    private readonly value: number,
    private readonly midiBaseValue: number
  ) {}

  public static readonly SubContra: Octave = new Octave('Sub contra', -16, 0);
  public static readonly Contra: Octave = new Octave('Contra', -8, 12);
  public static readonly Great: Octave = new Octave('Great', -4, 24);
  public static readonly Small: Octave = new Octave('Small', -2, 36);
  public static readonly OneLine: Octave = new Octave('One line', 1, 48);
  public static readonly TwoLine: Octave = new Octave('Two line', 2, 60);
  public static readonly Threeline: Octave = new Octave('Three line', 4, 72);
  public static readonly FourLine: Octave = new Octave('Four line', 8, 84);
  public static readonly FiveLine: Octave = new Octave('Five line', 16, 96);
  public static readonly SixLine: Octave = new Octave('Six line', 32, 108);
  public static readonly SevenLine: Octave = new Octave('Seven line', 64, 120);

  get NumericValue(): number {
    return this.value;
  }

  get MidiBaseValue(): number {
    return this.midiBaseValue;
  }

  get To(): OctaveState {
    return {
      name: this.octaveName,
      value: this.value,
      midi: this.midiBaseValue,
    };
  }

  public static readonly octaves = [
    Octave.SubContra,
    Octave.Contra,
    Octave.Great,
    Octave.Small,
    Octave.OneLine,
    Octave.TwoLine,
    Octave.Threeline,
    Octave.FourLine,
    Octave.FiveLine,
    Octave.SixLine,
    Octave.SevenLine,
  ];
}

export type NoteState = {
  pitch: PitchState;
  duration: DurationState;
};

export class Note {
  constructor(
    private readonly pitch: Pitch,
    private readonly duration: Duration,
    private readonly octave: Octave
  ) {}

  get MidiNumber(): number {
    return this.octave.MidiBaseValue + this.pitch.NumericValue;
  }

  get To(): NoteState {
    return {
      pitch: this.pitch.To,
      duration: this.duration.To,
    };
  }
}

export type MelodicPhraseState = {
  notes: NoteState[];
};

export class MelodicPhrase {
  private readonly phrase: Note[] = [];

  get To(): MelodicPhraseState {
    return {
      notes: this.phrase.map((note) => note.To),
    };
  }
}
