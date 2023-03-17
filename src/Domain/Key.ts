import { Pitch } from './Pitch';

enum KeyType {
  Major,
  Minor,
}

export class Key implements Iterable<Pitch> {
  private static readonly all: Key[] = [];

  private constructor(
    private readonly root: Pitch,
    private readonly accidentals: number,
    private readonly type: KeyType
  ) {
    Key.all.push(this);
  }

  public static readonly CMajor: Key = new Key(Pitch.C, 0, KeyType.Major);
  public static readonly DFlatMajor: Key = new Key(Pitch.DFlat, -5, KeyType.Major);
  public static readonly DMajor: Key = new Key(Pitch.D, 2, KeyType.Major);
  public static readonly EFlatMajor: Key = new Key(Pitch.EFlat, -3, KeyType.Major);
  public static readonly EMajor: Key = new Key(Pitch.E, 4, KeyType.Major);
  public static readonly FMajor: Key = new Key(Pitch.F, -1, KeyType.Major);
  public static readonly FSharpMajor: Key = new Key(Pitch.FSharp, 6, KeyType.Major);
  public static readonly GFlatMajor: Key = new Key(Pitch.GFlat, -6, KeyType.Major);
  public static readonly GMajor: Key = new Key(Pitch.G, 1, KeyType.Major);
  public static readonly AFlatMajor: Key = new Key(Pitch.AFlat, -4, KeyType.Major);
  public static readonly AMajor: Key = new Key(Pitch.A, 3, KeyType.Major);
  public static readonly BFlatMajor: Key = new Key(Pitch.BFlat, -2, KeyType.Major);
  public static readonly BMajor: Key = new Key(Pitch.B, 5, KeyType.Major);

  public static readonly CMinor: Key = new Key(Pitch.C, -3, KeyType.Minor);
  public static readonly CSharpMinor: Key = new Key(Pitch.CSharp, 4, KeyType.Minor);
  public static readonly DMinor: Key = new Key(Pitch.D, -1, KeyType.Minor);
  public static readonly EFlatMinor: Key = new Key(Pitch.EFlat, -6, KeyType.Minor);
  public static readonly EMinor: Key = new Key(Pitch.E, 1, KeyType.Minor);
  public static readonly FMinor: Key = new Key(Pitch.F, -4, KeyType.Minor);
  public static readonly FSharpMinor: Key = new Key(Pitch.FSharp, 3, KeyType.Minor);
  public static readonly GMinor: Key = new Key(Pitch.G, -2, KeyType.Minor);
  public static readonly GSharpMinor: Key = new Key(Pitch.GSharp, 5, KeyType.Minor);
  public static readonly AMinor: Key = new Key(Pitch.A, 0, KeyType.Minor);
  public static readonly BFlatMinor: Key = new Key(Pitch.BFlat, -5, KeyType.Minor);
  public static readonly BMinor: Key = new Key(Pitch.B, 2, KeyType.Minor);

  public get Abbreviation() {
    return this.type === KeyType.Major ? this.root.Name : this.root.Name + 'm';
  }

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

    return this.accidentals >= 0 ? this.sharpKey(fifths) : this.flatKey(fifths);
  }

  public static get majorKeys() {
    return Key.all.filter((k) => k.type === KeyType.Major);
  }

  public static get minorKeys() {
    return Key.all.filter((k) => k.type === KeyType.Minor);
  }

  public static get keys(): Key[] {
    return Key.all;
  }

  *[Symbol.iterator](): Iterator<Pitch> {
    const sortedScaleNotes = this.scaleNotes().sort((p1, p2) =>
      p1.NumericValue <= p2.NumericValue ? -1 : 1
    );
    const rootIndex = sortedScaleNotes.indexOf(this.root);
    const notes = sortedScaleNotes.slice(rootIndex).concat(sortedScaleNotes.slice(0, rootIndex));

    for (const pitch of notes) {
      yield pitch;
    }
  }
}
