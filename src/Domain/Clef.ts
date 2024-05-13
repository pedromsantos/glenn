import { ClefPrimitives } from '../primitives/Clef';
import { Octave } from './Note';
import { Pitch } from './Pitch';

export const cleffBrainDump = 'clefBrainDump';

export const enum ClefLine {
  First = 1,
  Second,
  Third,
  Fourth,
  Fifth,
}

export enum ClefType {
  G = 'G',
  F = 'F',
  C = 'C',
}

export class Clef {
  private constructor(
    private readonly pitch: Pitch,
    private readonly octave: Octave,
    private readonly line: ClefLine,
    private readonly type: ClefType
  ) {}

  get To(): ClefPrimitives {
    return {
      pitch: this.pitch.To,
      octave: this.octave.To,
      line: this.line,
      type: this.type,
    };
  }

  public static readonly Treble: Clef = new Clef(Pitch.G, Octave.C4, ClefLine.Second, ClefType.G);
  public static readonly FrenchViolin: Clef = new Clef(
    Pitch.G,
    Octave.C4,
    ClefLine.First,
    ClefType.G
  );
  public static readonly BaritoneF: Clef = new Clef(Pitch.F, Octave.C3, ClefLine.Third, ClefType.F);
  public static readonly BaritoneC: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.Fifth, ClefType.C);
  public static readonly Bass: Clef = new Clef(Pitch.F, Octave.C3, ClefLine.Fourth, ClefType.F);
  public static readonly SubBass: Clef = new Clef(Pitch.F, Octave.C3, ClefLine.Fifth, ClefType.F);
  public static readonly Alto: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.Third, ClefType.C);
  public static readonly Tenor: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.Fourth, ClefType.C);
  public static readonly Mezzo: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.Second, ClefType.C);
  public static readonly Soprano: Clef = new Clef(Pitch.C, Octave.C4, ClefLine.First, ClefType.C);
}
