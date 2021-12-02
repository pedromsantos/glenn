import { Duration } from './Duration';
import Pitch from './Pitch';

export class Octave {
  constructor(private octaveName: string, private value: number, private midiBaseValue: number) {}

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

  getNumericValue(): number {
    return this.value;
  }

  getMidiBaseValue(): number {
    return this.midiBaseValue;
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

export class Note {
  constructor(private pitch: Pitch, private duration: Duration, private octave: Octave) {}

  midiNumber(): number {
    return this.octave.getMidiBaseValue() + this.pitch.getNumericValue();
  }
}

export class MelodicPhrase {
  private phrase: Note[] = [];
}
