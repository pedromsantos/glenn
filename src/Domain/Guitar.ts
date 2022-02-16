import { FreeBreakfastSharp } from '@material-ui/icons';
import Pitch, { MelodicLine } from './Pitch';

export class GuitarString {
  constructor(private name: string, private openStringPitch: Pitch, private index: number) {}

  public static readonly Sixth: GuitarString = new GuitarString('Sixth', Pitch.E, 6);
  public static readonly Fifth: GuitarString = new GuitarString('Fifth', Pitch.A, 5);
  public static readonly Fourth: GuitarString = new GuitarString('Fourth', Pitch.D, 4);
  public static readonly Third: GuitarString = new GuitarString('Third', Pitch.G, 3);
  public static readonly Second: GuitarString = new GuitarString('Second', Pitch.B, 2);
  public static readonly First: GuitarString = new GuitarString('First', Pitch.E, 1);

  public static readonly guitarStrings = [
    GuitarString.Sixth,
    GuitarString.Fifth,
    GuitarString.Fourth,
    GuitarString.Third,
    GuitarString.Second,
    GuitarString.First,
  ];

  map(pitch: Pitch): Fret {
    return new Fret(this, this.openStringPitch.absoluteDistance(pitch));
  }
}

export class Position {
  constructor(private name: string, private lowFret: () => Fret, private highFret: () => Fret) {}

  public static readonly Open: Position = new Position(
    'Open',
    () => new Fret(GuitarString.Sixth, 0),
    () => new Fret(GuitarString.First, 3)
  );

  public static readonly C: Position = new Position(
    'C',
    () => new Fret(GuitarString.Sixth, 1),
    () => new Fret(GuitarString.First, 4)
  );

  public static readonly A: Position = new Position(
    'A',
    () => new Fret(GuitarString.Sixth, 3),
    () => new Fret(GuitarString.First, 6)
  );

  public static readonly G: Position = new Position(
    'G',
    () => new Fret(GuitarString.Sixth, 5),
    () => new Fret(GuitarString.First, 8)
  );

  public static readonly E: Position = new Position(
    'E',
    () => new Fret(GuitarString.Sixth, 8),
    () => new Fret(GuitarString.First, 11)
  );

  public static readonly D: Position = new Position(
    'D',
    () => new Fret(GuitarString.Sixth, 10),
    () => new Fret(GuitarString.First, 13)
  );

  filter(frets: Fret[]) {
    const fretRangeFilter: (f: Fret) => boolean = (f) =>
      (f.isHigher(this.lowFret()) || f.isSame(this.lowFret())) &&
      (f.isLower(this.highFret()) || f.isSame(this.highFret()));

    let fretsInPosition = frets.filter((f) => fretRangeFilter(f));

    if (fretsInPosition.length === 0) {
      fretsInPosition = frets.map((f) => f.raiseOctave()).filter((f) => fretRangeFilter(f));
    }

    return fretsInPosition;
  }

  public static readonly guitarPositions = [
    Position.Open,
    Position.C,
    Position.A,
    Position.G,
    Position.E,
    Position.D,
  ];
}

export class Fret {
  constructor(private string: GuitarString, private fret: number) {}

  public get isOpen() {
    return this.fret === 0;
  }

  isHigher(other: Fret) {
    return this.fret > other.fret;
  }

  isLower(other: Fret) {
    return this.fret < other.fret;
  }

  isSame(other: Fret) {
    return this.fret === other.fret;
  }

  raiseOctave() {
    return new Fret(this.string, this.fret + 12);
  }
}

export class GuitarMelodicLine implements Iterable<Fret> {
  private line: Fret[];

  constructor(line: MelodicLine, private position: Position) {
    this.line = this.create(line);
  }

  private create(line: MelodicLine): Fret[] {
    let frets = [];

    for (const guitarString of GuitarString.guitarStrings) {
      for (const pitch of line) {
        frets.push(guitarString.map(pitch));
      }
    }

    return this.position.filter(frets);
  }

  fret(index: number) {
    if (index >= this.line.length) {
      return undefined;
    }

    return this.line[index];
  }

  *[Symbol.iterator]() {
    for (const fret of this.line) {
      yield fret;
    }
  }
}
