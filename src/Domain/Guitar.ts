import { ClosedChord } from './Chord';
import Pitch, { MelodicLine, MelodicLineDirection } from './Pitch';

export class Fret {
  constructor(private readonly string: GuitarString, private readonly fret: number) {}

  get Number(): number {
    return this.fret;
  }

  isHigher(other: Fret, margin = 0) {
    return this.fret + margin > other.fret;
  }

  isLower(other: Fret, margin = 0) {
    return this.fret - margin < other.fret;
  }

  isSame(other: Fret) {
    return this.fret === other.fret && this.string.isSame(other.string);
  }

  isSameFret(other: Fret) {
    return this.fret === other.fret;
  }

  isOnString(guitarString: GuitarString): boolean {
    return this.string === guitarString;
  }

  raiseOctave(): Fret {
    return new Fret(this.string, this.fret + 12);
  }

  toTab(): TabColumn {
    const blank = this.fret < 10 ? '-' : '--';
    const paddedFret = `${this.fret}`;

    switch (this.string) {
      case GuitarString.Sixth:
        return new TabColumn([blank, blank, blank, blank, blank, paddedFret]);
      case GuitarString.Fifth:
        return new TabColumn([blank, blank, blank, blank, paddedFret, blank]);
      case GuitarString.Fourth:
        return new TabColumn([blank, blank, blank, paddedFret, blank, blank]);
      case GuitarString.Third:
        return new TabColumn([blank, blank, paddedFret, blank, blank, blank]);
      case GuitarString.Second:
        return new TabColumn([blank, paddedFret, blank, blank, blank, blank]);
      case GuitarString.First:
        return new TabColumn([paddedFret, blank, blank, blank, blank, blank]);
      default:
        return TabColumn.Rest;
    }
  }
}

export type GuitarStringPrimitives = {
  name: string;
  openPitch: Pitch;
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
      openPitch: this.openStringPitch,
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

export class Position {
  private static readonly all: Position[] = [];

  constructor(private name: string, private lowFret: Fret, private highFret: Fret) {
    Position.all.push(this);
  }

  get Name() {
    return this.name;
  }

  public static readonly Open: Position = new Position(
    'Open',
    new Fret(GuitarString.Sixth, 0),
    new Fret(GuitarString.First, 3)
  );

  public static readonly C: Position = new Position(
    'C',
    new Fret(GuitarString.Sixth, 1),
    new Fret(GuitarString.First, 3)
  );

  public static readonly A: Position = new Position(
    'A',
    new Fret(GuitarString.Sixth, 3),
    new Fret(GuitarString.First, 5)
  );

  public static readonly G: Position = new Position(
    'G',
    new Fret(GuitarString.Sixth, 5),
    new Fret(GuitarString.First, 8)
  );

  public static readonly E: Position = new Position(
    'E',
    new Fret(GuitarString.Sixth, 8),
    new Fret(GuitarString.First, 10)
  );

  public static readonly D: Position = new Position(
    'D',
    new Fret(GuitarString.Sixth, 10),
    new Fret(GuitarString.First, 13)
  );

  isFretInPosition(fret: Fret, lowerMargin = 0, higherMargin = 0): boolean {
    const fretRangeFilter: (f: Fret) => boolean = (f) =>
      (f.isHigher(this.lowFret, lowerMargin) || f.isSameFret(this.lowFret)) &&
      (f.isLower(this.highFret, higherMargin) || f.isSameFret(this.highFret));

    return fretRangeFilter(fret);
  }

  public static get guitarPositions() {
    return Position.all;
  }
}

export class GuitarChord {
  private readonly chord: Fret[];

  constructor(chord: ClosedChord, private readonly position: Position) {
    this.chord = this.create(chord);
  }

  toTab(): TabColumn {
    const tab: string[] = [];

    for (const guitarString of GuitarString.guitarStrings) {
      const fret = this.chord.find((f) => f.isOnString(guitarString));

      tab.push(this.fretToTab(fret));
    }
    return new TabColumn(tab.reverse());
  }

  private fretToTab(fret: Fret | undefined): string {
    const pad = this.pad();

    if (fret?.Number === undefined) {
      return pad + '-';
    }

    if (fret?.Number < 10) {
      return pad + fret.Number.toString();
    }

    return fret?.Number.toString();
  }

  private pad() {
    if (this.chord.some((f) => f.Number > 9)) {
      return '-';
    }

    return '';
  }

  private create(chord: ClosedChord): Fret[] {
    const frets: Fret[] = [];

    let bassString = GuitarString.Sixth;
    for (const pitch of chord.Pitches) {
      const fret = this.mapPitchToFret(pitch, bassString);
      if (fret !== undefined) {
        frets.push(fret);
      }
      bassString = bassString.Next;
    }

    return frets;
  }

  private mapPitchToFret(pitch: Pitch, bassString: GuitarString): Fret | undefined {
    let guitarString = bassString;
    while (guitarString !== GuitarString.First) {
      const fret = guitarString.fretFor(pitch);

      if (this.position.isFretInPosition(fret, 1, 1)) {
        return fret;
      }

      guitarString = guitarString.Next;
    }

    return undefined;
  }
}

export class GuitarMelodicLine implements Iterable<Fret> {
  private readonly line: Fret[];

  constructor(line: MelodicLine, private readonly position: Position) {
    this.line = this.create(line);
  }

  toTab(): TabMatrix {
    return new TabMatrix(...this.line.map((fret) => fret.toTab()));
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
      let fret = guitarString.fretFor(pitch);

      if (this.position.isFretInPosition(fret)) {
        return fret;
      }

      fret = fret.raiseOctave();
      if (this.position.isFretInPosition(fret)) {
        return fret;
      }
    }

    return undefined;
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

  *[Symbol.iterator]() {
    for (const fret of this.line) {
      yield fret;
    }
  }
}

export class TabColumn {
  private static readonly all: TabColumn[] = [];

  constructor(private readonly values: string[]) {
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
      .reduce((acc, col) => acc.map((line, i) => line + col[i]))
      .join('\n');
  }

  renderColumn(column: TabColumn): string {
    return this.render(new TabMatrix(column));
  }
}
