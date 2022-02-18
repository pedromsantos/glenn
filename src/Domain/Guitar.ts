import Pitch, { MelodicLine, MelodicLineDirection } from './Pitch';

export class Fret {
  constructor(private string: GuitarString, private fret: number, private pitch: Pitch) {}

  isHigher(other: Fret) {
    return this.fret > other.fret;
  }

  isLower(other: Fret) {
    return this.fret < other.fret;
  }

  isSame(other: Fret) {
    return this.fret === other.fret && this.string.isSame(other.string);
  }

  isSameFret(other: Fret) {
    return this.fret === other.fret;
  }

  raiseOctave(): Fret {
    this.fret += 12;
    return this;
  }
}

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

  fretFor(pitch: Pitch): Fret {
    return new Fret(this, this.openStringPitch.absoluteDistance(pitch), pitch);
  }

  isSame(other: GuitarString): boolean {
    return this.index === other.index;
  }
}

export class Position {
  constructor(private name: string, private lowFret: Fret, private highFret: Fret) {}

  public static readonly Open: Position = new Position(
    'Open',
    new Fret(GuitarString.Sixth, 0, Pitch.E),
    new Fret(GuitarString.First, 3, Pitch.G)
  );

  public static readonly C: Position = new Position(
    'C',
    new Fret(GuitarString.Sixth, 1, Pitch.FSharp),
    new Fret(GuitarString.First, 4, Pitch.GSharp)
  );

  public static readonly A: Position = new Position(
    'A',
    new Fret(GuitarString.Sixth, 3, Pitch.G),
    new Fret(GuitarString.First, 6, Pitch.ASharp)
  );

  public static readonly G: Position = new Position(
    'G',
    new Fret(GuitarString.Sixth, 5, Pitch.A),
    new Fret(GuitarString.First, 8, Pitch.C)
  );

  public static readonly E: Position = new Position(
    'E',
    new Fret(GuitarString.Sixth, 8, Pitch.C),
    new Fret(GuitarString.First, 11, Pitch.DSharp)
  );

  public static readonly D: Position = new Position(
    'D',
    new Fret(GuitarString.Sixth, 10, Pitch.D),
    new Fret(GuitarString.First, 13, Pitch.F)
  );

  isFretInPosition(fret: Fret): boolean {
    const fretRangeFilter: (f: Fret) => boolean = (f) =>
      (f.isHigher(this.lowFret) || f.isSameFret(this.lowFret)) &&
      (f.isLower(this.highFret) || f.isSameFret(this.highFret));

    return fretRangeFilter(fret);
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

export class GuitarMelodicLine implements Iterable<Fret> {
  private line: Fret[];

  constructor(line: MelodicLine, private position: Position) {
    this.line = this.create(line);
  }

  private create(line: MelodicLine): Fret[] {
    const frets: Fret[] = [];

    for (const pitch of line) {
      if (line.Direction === MelodicLineDirection.Ascending) {
        const fret = this.mapPitchToFret(pitch, GuitarString.guitarStrings);
        if (fret !== undefined) {
          frets.push(fret);
        }
      }
      if (line.Direction === MelodicLineDirection.Descending) {
        const fret = this.mapPitchToFret(pitch, GuitarString.guitarStrings.reverse());
        if (fret !== undefined) {
          frets.push(fret);
        }
      }
    }

    return frets;
  }

  private mapPitchToFret(pitch: Pitch, guitarStrings: GuitarString[]): Fret | undefined {
    for (const guitarString of guitarStrings) {
      const fret = guitarString.fretFor(pitch);

      if (this.position.isFretInPosition(fret)) {
        return fret;
      }

      if (this.position.isFretInPosition(fret.raiseOctave())) {
        return fret;
      }
    }

    return undefined;
  }

  get(index: number): Fret {
    if (index >= this.line.length) {
      throw 'Invalid index';
    }

    return this.line[index];
  }

  *[Symbol.iterator]() {
    for (const fret of this.line) {
      yield fret;
    }
  }
}

export class TabColumn {
  constructor(private format: (value: string) => string[]) {}

  public static readonly Start: TabColumn = new TabColumn(() => Array(6).fill('||-'));
  public static readonly Empty: TabColumn = new TabColumn(() => Array(6).fill('--'));
  public static readonly Bar: TabColumn = new TabColumn(() => Array(6).fill('-|'));
  public static readonly End: TabColumn = new TabColumn(() => Array(6).fill('-||'));
  public static readonly Note: TabColumn = new TabColumn((value) => Array(6).fill(`-${value}-`));
  public static readonly StandardTunning: TabColumn = new TabColumn(() => [
    'e',
    'B',
    'G',
    'D',
    'A',
    'E',
  ]);

  render(value = ''): string[] {
    return this.format(value);
  }
}

export class Tab {
  render(tab: TabColumn[]) {
    const tabElements = tab.map((t) => t.render());

    return tabElements.reduce((a, b) => a.map((v, i) => v + b[i])).join('\n');
  }
}
