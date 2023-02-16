import { Chord } from './Chord';
import Pitch, { MelodicLine, MelodicLineDirection } from './Pitch';

export class Fret {
  constructor(protected readonly string: GuitarString, private readonly fret: number) {}

  get Number(): number {
    return this.fret;
  }

  get String(): GuitarString {
    return this.string;
  }

  get To(): FretPrimitives {
    return {
      string: this.String.To,
      fret: this.Number,
    };
  }

  equals(other: Fret): boolean {
    return this.fret === other.fret && this.string.equals(other.string);
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

  toTab(guitarStrings: GuitarString[] = GuitarString.standardTunning): TabColumn {
    const frets: Fret[] = guitarStrings.map((gs) =>
      this.String.equals(gs) ? this : new BlankFret(gs)
    );

    return TabColumn.fromFrets([...frets].reverse());
  }

  toString() {
    return this.Number.toString();
  }

  private isHigher(other: Fret, margin: number) {
    return this.fret + margin > other.fret;
  }

  private isLower(other: Fret, margin: number) {
    return this.fret - margin < other.fret;
  }

  private isSameFretNumber(other: Fret) {
    return this.fret === other.fret;
  }
}

export class BlankFret extends Fret {
  constructor(string: GuitarString = GuitarString.Sixth, fret = -1) {
    super(string, fret);
  }

  override toTab(): TabColumn {
    return TabColumn.fromFrets([
      new BlankFret(GuitarString.First),
      new BlankFret(GuitarString.Second),
      new BlankFret(GuitarString.Third),
      new BlankFret(GuitarString.Fourth),
      new BlankFret(GuitarString.Fifth),
      new BlankFret(GuitarString.Sixth),
    ]);
  }

  override toString() {
    return '-';
  }

  override raiseOctave(): Fret {
    return new BlankFret(this.string, -1);
  }

  override isWithin(_lowFret: Fret, _highFret: Fret, _lowerMargin = 0, _higherMargin = 0) {
    return false;
  }
}

export type GuitarStringPrimitives = {
  name: string;
  index: number;
};

export type FretPrimitives = {
  string: GuitarStringPrimitives;
  fret: number;
};

export class GuitarStrings implements Iterable<GuitarString> {
  constructor(private readonly guitarStrings: GuitarString[] = GuitarString.standardTunning) {}

  *[Symbol.iterator](): Iterator<GuitarString> {
    for (const guitarString of this.guitarStrings) {
      yield guitarString;
    }
  }
}

export class GuitarString {
  private static readonly all: GuitarString[] = [];

  private constructor(
    private readonly name: string,
    private readonly openStringPitch: Pitch,
    private readonly index: number,
    private readonly nextAscending: () => GuitarString,
    private readonly nextDescending: () => GuitarString
  ) {
    GuitarString.all.push(this);
  }

  get To(): GuitarStringPrimitives {
    return {
      name: this.name,
      index: this.index,
    };
  }

  public static readonly Sixth: GuitarString = new GuitarString(
    'Sixth',
    Pitch.E,
    6,
    () => GuitarString.Fifth,
    () => GuitarString.Sixth
  );
  public static readonly Fifth: GuitarString = new GuitarString(
    'Fifth',
    Pitch.A,
    5,
    () => GuitarString.Fourth,
    () => GuitarString.Sixth
  );
  public static readonly Fourth: GuitarString = new GuitarString(
    'Fourth',
    Pitch.D,
    4,
    () => GuitarString.Third,
    () => GuitarString.Fifth
  );
  public static readonly Third: GuitarString = new GuitarString(
    'Third',
    Pitch.G,
    3,
    () => GuitarString.Second,
    () => GuitarString.Fourth
  );
  public static readonly Second: GuitarString = new GuitarString(
    'Second',
    Pitch.B,
    2,
    () => GuitarString.First,
    () => GuitarString.Third
  );
  public static readonly First: GuitarString = new GuitarString(
    'First',
    Pitch.E,
    1,
    () => GuitarString.First,
    () => GuitarString.Second
  );

  static get standardTunning(): GuitarString[] {
    return GuitarString.all;
  }

  fretFor(pitch: Pitch): Fret {
    return new Fret(this, this.openStringPitch.absoluteDistance(pitch));
  }

  equals(other: GuitarString): boolean {
    return this.index === other.index;
  }

  isLowerThan(other: GuitarString): boolean {
    return this.index > other.index;
  }

  get Index() {
    return this.index;
  }

  get NextAscending(): GuitarString {
    return this.nextAscending();
  }

  get NextDescending(): GuitarString {
    return this.nextDescending();
  }
}

export type PositionPrimitives = {
  name: string;
  lowestFret: FretPrimitives;
  highestFret: FretPrimitives;
};

export class Position {
  private static readonly all: Position[] = [];

  private constructor(private name: string, private lowFret: Fret, private highFret: Fret) {
    Position.all.push(this);
  }

  get To(): PositionPrimitives {
    return {
      name: this.name,
      lowestFret: this.lowFret.To,
      highestFret: this.highFret.To,
    };
  }

  public static readonly Open: Position = new Position(
    'Open',
    new Fret(GuitarString.Sixth, 0),
    new Fret(GuitarString.First, 4)
  );

  public static readonly C: Position = new Position(
    'C',
    new Fret(GuitarString.Sixth, 1),
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

  public static readonly C8: Position = new Position(
    'C8',
    new Fret(GuitarString.Sixth, 14),
    new Fret(GuitarString.First, 17)
  );

  public static readonly A8: Position = new Position(
    'A8',
    new Fret(GuitarString.Sixth, 16),
    new Fret(GuitarString.First, 20)
  );

  public static readonly G8: Position = new Position(
    'G8',
    new Fret(GuitarString.Sixth, 18),
    new Fret(GuitarString.First, 22)
  );

  public static readonly E8: Position = new Position(
    'E8',
    new Fret(GuitarString.Sixth, 21),
    new Fret(GuitarString.First, 24)
  );

  contains(fret: Fret, lowerMargin = 0, higherMargin = 0): boolean {
    return fret.isWithin(this.lowFret, this.highFret, lowerMargin, higherMargin);
  }

  public static get guitarPositions() {
    return Position.all;
  }
}

export class GuitarChord implements Iterable<Fret> {
  private chordFrets: Fret[] = Array<Fret>(6).fill(new BlankFret());
  private position: Position = Position.Open;

  toTab(): TabColumn {
    return TabColumn.fromFrets([...this.chordFrets].reverse());
  }

  toString(): string {
    return this.chordFrets.map((f) => f.toString()).join('\n');
  }

  *[Symbol.iterator](): Iterator<Fret> {
    for (const pitch of this.chordFrets) {
      yield pitch;
    }
  }

  public static inPosition(
    chord: Chord,
    position: Position,
    guitarStrings: GuitarStrings = new GuitarStrings()
  ): GuitarChord {
    const guitarChord = new GuitarChord();
    guitarChord.position = position;

    if (position === Position.Open) {
      guitarChord.chordFrets = guitarChord.mapOpenPositionChord(chord, guitarStrings);
      return guitarChord;
    }

    guitarChord.chordFrets = guitarChord.mapNonOpenePositionChord(chord, guitarStrings);
    return guitarChord;
  }

  public static fromBassString(chord: Chord, bass: GuitarString): GuitarChord {
    const guitarChord = new GuitarChord();

    guitarChord.mapFromBassString(chord, bass);
    guitarChord.adjustOctaves();
    guitarChord.chordFrets.reverse();
    return guitarChord;
  }

  private mapFromBassString(chord: Chord, guitarString: GuitarString) {
    for (const pitch of chord) {
      let fret = guitarString.fretFor(pitch);

      if (this.isTooFar(fret)) {
        fret = fret.raiseOctave();
      }

      if (this.isTooFar(fret)) {
        guitarString = guitarString.NextAscending;
        fret = guitarString.fretFor(pitch);
      }

      this.addFretFor(fret, guitarString);
      guitarString = guitarString.NextAscending;
    }
  }

  private addFretFor(fret: Fret, guitarString: GuitarString) {
    this.chordFrets[guitarString.Index - 1] = fret;
  }

  private mapOpenPositionChord(chord: Chord, guitarStrings: GuitarStrings): Fret[] {
    const mappedeFrets: Fret[] = [];

    for (const guitarString of guitarStrings) {
      for (const pitch of chord) {
        const fret = guitarString.fretFor(pitch);

        if (this.position.contains(fret, 1, 1)) {
          mappedeFrets.push(fret);
          break;
        }
      }
    }

    return mappedeFrets;
  }

  private mapNonOpenePositionChord(chord: Chord, guitarStrings: GuitarStrings): Fret[] {
    const mappedPitches: Pitch[] = [];
    const mappedeFrets: Fret[] = [];

    for (const guitarString of guitarStrings) {
      for (const pitch of chord) {
        if (mappedPitches.find((p) => p === pitch)) {
          continue;
        }

        const fret = guitarString.fretFor(pitch);

        if (this.position.contains(fret, 1, 1)) {
          mappedeFrets.push(fret);
          mappedPitches.push(pitch);
        }
      }

      if (!mappedeFrets.find((f) => f.String === guitarString)) {
        mappedeFrets.push(new BlankFret());
      }
    }

    return mappedeFrets;
  }

  private adjustOctaves() {
    if (this.chordFrets.some((f) => f.Number === 0) && this.chordFrets.some((f) => f.Number > 3)) {
      this.chordFrets = this.chordFrets.map((f) => (f.Number === 0 ? f.raiseOctave() : f));
    }
  }

  private isTooFar(fret: Fret): boolean {
    return this.chordFrets
      .filter((f) => f.Number !== -1)
      .some((f) => Math.abs(f.Number - fret.Number) > 4);
  }
}

export class GuitarMelodicLine implements Iterable<Fret> {
  private readonly line: Fret[] = [];
  private readonly position: Position = Position.Open;

  constructor(
    melodicLine: MelodicLine,
    position: Position,
    guitarStrings: GuitarStrings = new GuitarStrings()
  ) {
    this.position = position;
    this.line = this.mapMelodicLine(melodicLine, guitarStrings);
  }

  toTab(): TabMatrix {
    const column = this.line.map((fret) => fret.toTab());
    return new TabMatrix(...column);
  }

  private mapMelodicLine(melodicLine: MelodicLine, guitarStrings: GuitarStrings): Fret[] {
    const line: Fret[] = [];
    const guitarStringsOrdered = this.guitarStringsFor(melodicLine.Direction, guitarStrings);

    for (const pitch of melodicLine) {
      for (const guitarString of guitarStringsOrdered) {
        if (this.skipMappedString(line, guitarString)) {
          continue;
        }

        if (this.mapPitch(pitch, guitarString, line)) {
          break;
        }
      }
    }

    return melodicLine.Direction == MelodicLineDirection.Ascending ? line : line.reverse();
  }

  private guitarStringsFor(lineDirection: MelodicLineDirection, guitarStrings: GuitarStrings) {
    return lineDirection === MelodicLineDirection.Descending
      ? [...guitarStrings].reverse()
      : [...guitarStrings];
  }

  private skipMappedString(line: Fret[], guitarString: GuitarString) {
    const lastFret = line[line.length - 1];

    return lastFret && guitarString.isLowerThan(lastFret.String);
  }

  private mapPitch(pitch: Pitch, guitarString: GuitarString, line: Fret[]): boolean {
    let fret = guitarString.fretFor(pitch);

    if (this.position.contains(fret)) {
      line.push(fret);
      return true;
    }

    fret = fret.raiseOctave();
    if (this.position.contains(fret)) {
      line.push(fret);
      return true;
    }

    return false;
  }

  *[Symbol.iterator](): Iterator<Fret> {
    for (const pitch of this.line) {
      yield pitch;
    }
  }
}

export class TabColumn {
  private readonly maxRowLength: number = 0;

  private constructor(private readonly rows: string[]) {
    this.maxRowLength = Math.max(...rows.map((r) => r.length));
  }

  public static readonly Start: TabColumn = new TabColumn(Array<string>(6).fill('|-'));
  public static readonly Bar: TabColumn = new TabColumn(Array<string>(6).fill('-|-'));
  public static readonly End: TabColumn = new TabColumn(Array<string>(6).fill('-|'));
  public static readonly Rest: TabColumn = new TabColumn(Array<string>(6).fill(`-`));
  public static readonly Separator: TabColumn = new TabColumn(Array<string>(6).fill(`-`));
  public static readonly StandardTunning: TabColumn = new TabColumn(['e', 'B', 'G', 'D', 'A', 'E']);

  render(): string[] {
    return this.rows.map((r) => (r.length < this.maxRowLength ? `-${r}` : r));
  }

  static fromFrets(frets: Fret[]): TabColumn {
    return new TabColumn(frets.map((f) => f.toString()));
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
      .reduce((acc, column) => acc.map((row, i) => row.concat(column[i] ?? '')))
      .join('\n');
  }

  renderColumn(column: TabColumn): string {
    return this.render(new TabMatrix(column));
  }
}
