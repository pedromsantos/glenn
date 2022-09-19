import { Chord } from './Chord';
import Pitch, { MelodicLine, MelodicLineDirection, PitchPrimitives } from './Pitch';

const cannotMapFret = 'Cannot map fret';

export class Fret {
  constructor(private readonly string: GuitarString, private readonly fret: number) {}

  get Number(): number {
    return this.fret;
  }

  get String(): GuitarString {
    return this.string;
  }

  private isHigher(other: Fret, margin = 0) {
    return this.fret + margin > other.fret;
  }

  private isLower(other: Fret, margin = 0) {
    return this.fret - margin < other.fret;
  }

  isSame(other: Fret) {
    return this.fret === other.fret && this.string.isSame(other.string);
  }

  private isSameFretNumber(other: Fret) {
    return this.fret === other.fret;
  }

  isOnString(guitarString: GuitarString): boolean {
    return this.string === guitarString;
  }

  raiseOctave(): Fret {
    return new Fret(this.string, this.fret + 12);
  }

  isWithin(lowFret: Fret, highFret: Fret, lowerMargin = 0, higherMargin = 0) {
    return (
      (this.isHigher(lowFret, lowerMargin) || this.isSameFretNumber(lowFret)) &&
      (this.isLower(highFret, higherMargin) || this.isSameFretNumber(highFret))
    );
  }
}

export type GuitarStringPrimitives = {
  name: string;
  openPitch: PitchPrimitives;
  index: number;
};

export class GuitarString {
  private static readonly all: GuitarString[] = [];

  constructor(
    private readonly name: string,
    private readonly openStringPitch: Pitch,
    private readonly index: number,
    private readonly next: () => GuitarString
  ) {
    GuitarString.all.push(this);
  }

  get To(): GuitarStringPrimitives {
    return {
      name: this.name,
      openPitch: this.openStringPitch.To,
      index: this.index,
    };
  }

  public static readonly Sixth: GuitarString = new GuitarString(
    'Sixth',
    Pitch.E,
    6,
    () => GuitarString.Fifth
  );
  public static readonly Fifth: GuitarString = new GuitarString(
    'Fifth',
    Pitch.A,
    5,
    () => GuitarString.Fourth
  );
  public static readonly Fourth: GuitarString = new GuitarString(
    'Fourth',
    Pitch.D,
    4,
    () => GuitarString.Third
  );
  public static readonly Third: GuitarString = new GuitarString(
    'Third',
    Pitch.G,
    3,
    () => GuitarString.Second
  );
  public static readonly Second: GuitarString = new GuitarString(
    'Second',
    Pitch.B,
    2,
    () => GuitarString.First
  );
  public static readonly First: GuitarString = new GuitarString(
    'First',
    Pitch.E,
    1,
    () => GuitarString.First
  );

  static get guitarStrings(): GuitarString[] {
    return GuitarString.all;
  }

  fretFor(pitch: Pitch): Fret {
    return new Fret(this, this.openStringPitch.absoluteDistance(pitch));
  }

  isSame(other: GuitarString): boolean {
    return this.index === other.index;
  }

  get Next(): GuitarString {
    return this.next();
  }
}

export type PositionPrimitives = {
  name: string;
  lowestFret: number;
  highestFret: number;
};

export class Position {
  private static readonly all: Position[] = [];

  constructor(private name: string, private lowFret: Fret, private highFret: Fret) {
    Position.all.push(this);
  }

  get To(): PositionPrimitives {
    return {
      name: this.name,
      lowestFret: this.lowFret.Number,
      highestFret: this.highFret.Number,
    };
  }

  public static readonly Open: Position = new Position(
    'Open',
    new Fret(GuitarString.Sixth, 0),
    new Fret(GuitarString.First, 4)
  );

  public static readonly C: Position = new Position(
    'C',
    new Fret(GuitarString.Sixth, 2),
    new Fret(GuitarString.First, 5)
  );

  public static readonly A: Position = new Position(
    'A',
    new Fret(GuitarString.Sixth, 4),
    new Fret(GuitarString.First, 8)
  );

  public static readonly G: Position = new Position(
    'G',
    new Fret(GuitarString.Sixth, 6),
    new Fret(GuitarString.First, 10)
  );

  public static readonly E: Position = new Position(
    'E',
    new Fret(GuitarString.Sixth, 9),
    new Fret(GuitarString.First, 12)
  );

  public static readonly D: Position = new Position(
    'D',
    new Fret(GuitarString.Sixth, 11),
    new Fret(GuitarString.First, 15)
  );

  isWithin(fret: Fret, lowerMargin = 0, higherMargin = 0): boolean {
    return fret.isWithin(this.lowFret, this.highFret, lowerMargin, higherMargin);
  }

  public static get guitarPositions() {
    return Position.all;
  }
}

export class GuitarChord {
  private readonly chord: Fret[];

  constructor(chord: Chord, private readonly position: Position) {
    try {
      this.chord = this.create(chord);
    } catch {
      throw `Cannot map chord ${chord.Name} in position ${position.To.name}`;
    }
  }

  fretFor(guitarString: GuitarString): string {
    const fret = this.chord.find((f) => f.isOnString(guitarString));

    if (fret === undefined) {
      throw cannotMapFret;
    }

    return this.fretToTab(fret);
  }

  hasDoubleDigitFrets(): boolean {
    return this.chord.some((f) => f.Number > 9);
  }

  private fretToTab(fret: Fret): string {
    return fret ? fret.Number.toString() : '-';
  }

  private create(chord: Chord): Fret[] {
    const frets: Fret[] = [];

    let bassString = GuitarString.Sixth;
    for (const pitch of chord.Pitches) {
      const fret = this.mapPitchToFret(pitch, bassString);
      frets.push(fret);
      bassString = bassString.Next;
    }

    return frets;
  }

  private mapPitchToFret(pitch: Pitch, bassString: GuitarString): Fret {
    let guitarString = bassString;
    while (guitarString !== GuitarString.First) {
      const fret = guitarString.fretFor(pitch);

      if (this.position.isWithin(fret, 1, 1)) {
        return fret;
      }

      guitarString = guitarString.Next;
    }

    throw cannotMapFret;
  }
}

export class GuitarMelodicLine {
  private readonly line: Fret[];

  constructor(line: MelodicLine, private readonly position: Position) {
    this.line = this.create(line);
  }

  toTab(): TabMatrix {
    return new TabMatrix(...this.line.map((fret) => TabColumn.fromFret(fret)));
  }

  private create(line: MelodicLine): Fret[] {
    const frets: Fret[] = [];

    for (const pitch of line) {
      if (line.Direction === MelodicLineDirection.Ascending) {
        const fret = this.mapPitchToFret(pitch, GuitarString.guitarStrings);
        frets.push(fret);
      }
      if (line.Direction === MelodicLineDirection.Descending) {
        const fret = this.mapPitchToFret(pitch, GuitarString.guitarStrings.reverse());
        frets.push(fret);
      }
    }

    return frets;
  }

  private mapPitchToFret(pitch: Pitch, guitarStrings: GuitarString[]): Fret {
    for (const guitarString of guitarStrings) {
      let fret = guitarString.fretFor(pitch);

      if (this.position.isWithin(fret)) {
        return fret;
      }

      fret = fret.raiseOctave();
      if (this.position.isWithin(fret)) {
        return fret;
      }
    }

    throw cannotMapFret;
  }

  get(index: number): Fret {
    if (index >= this.line.length) {
      throw new Error('Invalid index');
    }

    if (!this.line[index]) {
      throw new Error('Invalid index');
    }

    return this.line[index] as Fret;
  }
}

export class TabColumn {
  private static readonly all: TabColumn[] = [];

  private constructor(private readonly values: string[]) {
    TabColumn.all.push(this);
  }

  public static readonly Start: TabColumn = new TabColumn(Array(6).fill('|-'));
  public static readonly Bar: TabColumn = new TabColumn(Array(6).fill('-|-'));
  public static readonly End: TabColumn = new TabColumn(Array(6).fill('-|'));
  public static readonly Rest: TabColumn = new TabColumn(Array(6).fill(`-`));
  public static readonly Separator: TabColumn = new TabColumn(Array(6).fill(`-`));
  public static readonly StandardTunning: TabColumn = new TabColumn(['e', 'B', 'G', 'D', 'A', 'E']);

  render(): string[] {
    return this.values;
  }

  static get tabColumns(): TabColumn[] {
    return TabColumn.all;
  }

  static blank = (fret: Fret = new Fret(GuitarString.First, 0)) => (fret.Number < 10 ? '-' : '--');

  static fromFret(fret: Fret): TabColumn {
    const blankFret = TabColumn.blank(fret);
    const paddedFret = `${fret.Number}`;

    switch (fret.String) {
      case GuitarString.Sixth:
        return new TabColumn([blankFret, blankFret, blankFret, blankFret, blankFret, paddedFret]);
      case GuitarString.Fifth:
        return new TabColumn([blankFret, blankFret, blankFret, blankFret, paddedFret, blankFret]);
      case GuitarString.Fourth:
        return new TabColumn([blankFret, blankFret, blankFret, paddedFret, blankFret, blankFret]);
      case GuitarString.Third:
        return new TabColumn([blankFret, blankFret, paddedFret, blankFret, blankFret, blankFret]);
      case GuitarString.Second:
        return new TabColumn([blankFret, paddedFret, blankFret, blankFret, blankFret, blankFret]);
      case GuitarString.First:
        return new TabColumn([paddedFret, blankFret, blankFret, blankFret, blankFret, blankFret]);
      default:
        return TabColumn.Rest;
    }
  }

  static fromChord(chord: GuitarChord): TabColumn {
    const tab: string[] = [];
    const pad = chord.hasDoubleDigitFrets() ? '-' : '';

    for (const guitarString of GuitarString.guitarStrings) {
      try {
        const fret = chord.fretFor(guitarString);
        const paddedFret = Number(fret) < 10 || fret === '-' ? `${pad}${fret}` : fret;

        tab.push(paddedFret);
      } catch {
        tab.push('-');
      }
    }

    return new TabColumn([...tab].reverse());
  }
}

export class TabMatrix {
  private tabMatrix: string[][];

  constructor(...columns: TabColumn[]) {
    this.tabMatrix = this.mapColumns(columns);
  }

  sufixWith(...columns: TabColumn[]) {
    this.tabMatrix = this.tabMatrix.concat(this.mapColumns(columns));
    return this;
  }

  prefixWith(...columns: TabColumn[]) {
    this.tabMatrix = this.mapColumns(columns).concat(this.tabMatrix);
    return this;
  }

  separateWith(separator: string): TabMatrix {
    this.tabMatrix = this.tabMatrix.map((column, i) =>
      i == this.tabMatrix.length - 1 ? column : column.map((value) => `${value}${separator}`)
    );
    return this;
  }

  render(): string[][] {
    return this.tabMatrix;
  }

  private mapColumns(columns: TabColumn[]): string[][] {
    return columns.map((column) => column.render());
  }
}

export class Tab {
  render(tab: TabMatrix): string {
    return tab
      .separateWith('-')
      .prefixWith(TabColumn.Start)
      .prefixWith(TabColumn.StandardTunning)
      .sufixWith(TabColumn.End)
      .render()
      .reduce((acc, column) => acc.map((row, i) => row + column[i]))
      .join('\n');
  }

  renderColumn(column: TabColumn): string {
    return this.render(new TabMatrix(column));
  }
}
