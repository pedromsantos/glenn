import { Octave } from './Note';
import Pitch from './Pitch';

export const cleffBrainDump = 'clefBrainDump';

export enum ClefLine {
  First = 1,
  Second,
  Third,
  Fourth,
  Fifth,
}

export enum ClefType {
  G,
  F,
  C,
}

export class Clef {
  private constructor(
    private readonly pitch: Pitch,
    private readonly octave: Octave,
    private readonly line: ClefLine,
    private readonly type: ClefType
  ) {}

  get Pitch() {
    return this.pitch;
  }

  get Octava() {
    return this.octave;
  }

  get Type() {
    return ClefType[this.type];
  }

  get Line() {
    return this.line.valueOf();
  }

  public static Treble: Clef = new Clef(Pitch.G, Octave.C4, ClefLine.Second, ClefType.G);
  public static FrenchViolin: Clef = new Clef(Pitch.G, Octave.C4, ClefLine.First, ClefType.G);
  public static BaritoneF: Clef = new Clef(Pitch.F, Octave.C3, ClefLine.Third, ClefType.F);
  public static BaritoneC: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.Fifth, ClefType.C);
  public static Bass: Clef = new Clef(Pitch.F, Octave.C3, ClefLine.Fourth, ClefType.F);
  public static SubBass: Clef = new Clef(Pitch.F, Octave.C3, ClefLine.Fifth, ClefType.F);
  public static Alto: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.Third, ClefType.C);
  public static Tenor: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.Fourth, ClefType.C);
  public static Mezzo: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.Second, ClefType.C);
  public static Soprano: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.First, ClefType.C);
}
