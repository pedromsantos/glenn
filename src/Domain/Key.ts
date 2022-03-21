import Pitch from './Pitch';

export default class Key {
  private constructor(private root: Pitch, private accidentals: number) {}

  public static readonly CMajor: Key = new Key(Pitch.C, 0);
  public static readonly DFlatMajor: Key = new Key(Pitch.DFlat, -5);
  public static readonly DMajor: Key = new Key(Pitch.D, 2);
  public static readonly EFlatMajor: Key = new Key(Pitch.EFlat, -3);
  public static readonly EMajor: Key = new Key(Pitch.E, 4);
  public static readonly FMajor: Key = new Key(Pitch.F, -1);
  public static readonly FSharpMajor: Key = new Key(Pitch.FSharp, 6);
  public static readonly GFlatMajor: Key = new Key(Pitch.GFlat, -6);
  public static readonly GMajor: Key = new Key(Pitch.G, 1);
  public static readonly AFlatMajor: Key = new Key(Pitch.AFlat, -4);
  public static readonly AMajor: Key = new Key(Pitch.A, 3);
  public static readonly BFlatMajor: Key = new Key(Pitch.BFlat, -2);
  public static readonly BMajor: Key = new Key(Pitch.B, 5);

  public static readonly CMinor: Key = new Key(Pitch.C, -3);
  public static readonly CSharpMinor: Key = new Key(Pitch.CSharp, 4);
  public static readonly DMinor: Key = new Key(Pitch.D, -1);
  public static readonly EFlatMinor: Key = new Key(Pitch.EFlat, -6);
  public static readonly EMinor: Key = new Key(Pitch.E, 1);
  public static readonly FMinor: Key = new Key(Pitch.F, -4);
  public static readonly FSharpMinor: Key = new Key(Pitch.FSharp, 3);
  public static readonly GMinor: Key = new Key(Pitch.G, -2);
  public static readonly GSharpMinor: Key = new Key(Pitch.GSharp, 5);
  public static readonly AMinor: Key = new Key(Pitch.A, 0);
  public static readonly BFlatMinor: Key = new Key(Pitch.BFlat, -5);
  public static readonly BMinor: Key = new Key(Pitch.B, 2);

  private flatKey(fifths: Pitch[]): Pitch[] {
    const flats = fifths.slice(this.accidentals).map((p) => p.flat());
    const naturals = fifths.slice(0, this.accidentals);

    return flats.concat(naturals);
  }

  private sharpKey(fifths: Pitch[]): Pitch[] {
    const toSharp = fifths.slice(0, this.accidentals).map((p) => p.sharp());
    const naturals = fifths.slice(this.accidentals);

    return toSharp.concat(naturals);
  }

  private scaleNotes() {
    const fifths: Pitch[] = [Pitch.F, Pitch.C, Pitch.G, Pitch.D, Pitch.A, Pitch.E, Pitch.B];

    if (this.accidentals >= 0) return this.sharpKey(fifths);

    return this.flatKey(fifths);
  }

  public notes(): Pitch[] {
    const sortedScaleNotes = this.scaleNotes().sort((p1, p2) =>
      p1.NumericValue <= p2.NumericValue ? -1 : 1
    );
    const rootIndex = sortedScaleNotes.indexOf(this.root);
    return sortedScaleNotes.slice(rootIndex).concat(sortedScaleNotes.slice(0, rootIndex));
  }

  public static readonly majorKeys = [
    Key.AMajor,
    Key.AFlatMajor,
    Key.BMajor,
    Key.BFlatMajor,
    Key.CMajor,
    Key.DMajor,
    Key.DFlatMajor,
    Key.EMajor,
    Key.EFlatMajor,
    Key.FMajor,
    Key.FSharpMajor,
    Key.GMajor,
    Key.GFlatMajor,
  ];

  public static readonly minorKeys = [
    Key.AMinor,
    Key.BMinor,
    Key.BFlatMinor,
    Key.CMinor,
    Key.CSharpMinor,
    Key.DMinor,
    Key.EMinor,
    Key.FMinor,
    Key.FSharpMinor,
    Key.GMinor,
    Key.GSharpMinor,
    Key.EFlatMinor,
  ];

  public static readonly keys = Key.majorKeys.concat(Key.minorKeys);
}
