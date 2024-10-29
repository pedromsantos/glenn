import { FretPrimitives, GuitarStringPrimitives, PositionPrimitives } from '../primitives/Guitar';
import { Chord } from './Chord';
import { MelodicLine, Octave } from './Note';
import { Pitch } from './Pitch';

export class TabColumn {
  private static readonly DEFAULT_STRING_COUNT = 6;
  private readonly maxRowLength: number;

  private constructor(private readonly rows: string[]) {
    if (!TabColumn.isValidRowCount(rows)) {
      throw new Error(`TabColumn must have exactly ${TabColumn.DEFAULT_STRING_COUNT} rows`);
    }
    this.maxRowLength = Math.max(...rows.map((r) => r.length));
  }

  public static readonly Start: TabColumn = TabColumn.withRepeting('|-');
  public static readonly Bar: TabColumn = TabColumn.withRepeting('-|-');
  public static readonly End: TabColumn = TabColumn.withRepeting('-|');
  public static readonly Rest: TabColumn = TabColumn.withRepeting('-');
  public static readonly Separator: TabColumn = TabColumn.withRepeting('-');
  public static readonly StandardTunning: TabColumn = new TabColumn(['e', 'B', 'G', 'D', 'A', 'E']);

  render(): string[] {
    return this.rows.map((row) => this.padRow(row));
  }

  static fromFrets(frets: Fret[]): TabColumn {
    if (!frets?.length) {
      return TabColumn.Rest;
    }
    return new TabColumn(frets.map((f) => f.toString()));
  }

  private static withRepeting(value: string): TabColumn {
    return new TabColumn(Array<string>(TabColumn.DEFAULT_STRING_COUNT).fill(value));
  }

  private padRow(row: string): string {
    if (row.length >= this.maxRowLength) {
      return row;
    }
    return `-${row}`;
  }

  private static isValidRowCount(rows: string[]): boolean {
    return Array.isArray(rows) && rows.length === TabColumn.DEFAULT_STRING_COUNT;
  }
}

export class Fret {
  constructor(
    protected readonly string: GuitarString,
    private readonly fret: number,
    private readonly pitch?: Pitch,
    private readonly octave?: Octave
  ) {}

  get Number(): number {
    return this.fret;
  }

  get String(): GuitarString {
    return this.string;
  }

  get Pitch() {
    return this.pitch;
  }

  get Octave() {
    return this.octave;
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
    return new Fret(this.string, this.fret + 12, this.pitch, this.octave?.up());
  }

  isWithin(lowFret: Fret, highFret: Fret) {
    return (
      (this.isHigher(lowFret) || this.isSameFretNumber(lowFret)) &&
      (this.isLower(highFret) || this.isSameFretNumber(highFret))
    );
  }

  toTab(guitarStrings: GuitarStrings = new GuitarStrings()): TabColumn {
    const frets = [...guitarStrings].map((gs) =>
      this.String.equals(gs) ? this : new BlankFret(gs)
    );

    return TabColumn.fromFrets([...frets].reverse());
  }

  toString() {
    return this.Number.toString();
  }

  isOnSameStringAs(other: Fret) {
    return this.String == other.String;
  }

  private isHigher(other: Fret) {
    return this.fret > other.fret;
  }

  private isLower(other: Fret) {
    return this.fret < other.fret;
  }

  private isSameFretNumber(other: Fret) {
    return this.fret === other.fret;
  }
}

export class BlankFret extends Fret {
  constructor(string: GuitarString = GuitarString.Sixth) {
    super(string, -1);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override toTab(_guitarStrings: GuitarStrings = new GuitarStrings()): TabColumn {
    return TabColumn.Rest;
  }

  override toString() {
    return '-';
  }

  override raiseOctave(): Fret {
    return new BlankFret(this.string);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override isWithin(_lowFret: Fret, _highFret: Fret) {
    return false;
  }
}

abstract class Frets implements Iterable<Fret> {
  protected frets: Fret[] = [];

  protected constructor(frets: Fret[]) {
    this.frets = frets;
  }

  *[Symbol.iterator](): Iterator<Fret> {
    for (const f of this.frets) {
      yield f;
    }
  }

  reverse() {
    this.frets.reverse();
  }
}

class VerticalFrets extends Frets {
  constructor(frets: Fret[] = Array<Fret>(6).fill(new BlankFret())) {
    super(frets);
  }

  updateFretAt(fret: Fret, position: number) {
    this.frets[position] = fret;
  }

  adjustOpenStringOctaves() {
    if (
      this.frets.some((f) => f.Number === Position.Open.Low) &&
      this.frets.some((f) => f.Number >= Position.Open.High)
    ) {
      this.frets = this.frets.map((f) => (f.Number === 0 ? f.raiseOctave() : f));
    }
  }

  isTooFar(fret: Fret): boolean {
    return this.frets
      .filter((f) => f.Number !== -1)
      .some((f) => Math.abs(f.Number - fret.Number) >= 4);
  }

  override toString(): string {
    return this.frets.map((f) => f.toString()).join('\n');
  }

  toTab(): TabColumn {
    return TabColumn.fromFrets([...this.frets]);
  }
}

export class HorizontalFrets extends Frets {
  constructor(frets: Fret[] = []) {
    super(frets);
  }

  push(fret: Fret) {
    this.frets.push(fret);
  }

  last() {
    return this.frets[this.frets.length - 1];
  }

  toTab(guitarStrings: GuitarStrings): Tab {
    const column = this.frets.map((fret) => fret.toTab(guitarStrings));
    return new Tab(...column);
  }
}

export class GuitarStrings implements Iterable<GuitarString> {
  constructor(private readonly guitarStrings: GuitarString[] = GuitarString.standardTunning) {}

  toTunning(tunning: GuitarTuning) {
    return new GuitarStrings(this.guitarStrings.map((gs) => gs.toTunning(tunning)));
  }

  guitarString(guitarStringIndex: number) {
    return this.guitarStrings.find((gs) => gs.Index == guitarStringIndex)!;
  }

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
    private openStringPitch: Pitch,
    private openStringOctave: Octave,
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
    Octave.C2,
    6,
    () => GuitarString.Fifth,
    () => GuitarString.Sixth
  );
  public static readonly Fifth: GuitarString = new GuitarString(
    'Fifth',
    Pitch.A,
    Octave.C2,
    5,
    () => GuitarString.Fourth,
    () => GuitarString.Sixth
  );
  public static readonly Fourth: GuitarString = new GuitarString(
    'Fourth',
    Pitch.D,
    Octave.C3,
    4,
    () => GuitarString.Third,
    () => GuitarString.Fifth
  );
  public static readonly Third: GuitarString = new GuitarString(
    'Third',
    Pitch.G,
    Octave.C3,
    3,
    () => GuitarString.Second,
    () => GuitarString.Fourth
  );
  public static readonly Second: GuitarString = new GuitarString(
    'Second',
    Pitch.B,
    Octave.C3,
    2,
    () => GuitarString.First,
    () => GuitarString.Third
  );
  public static readonly First: GuitarString = new GuitarString(
    'First',
    Pitch.E,
    Octave.C4,
    1,
    () => GuitarString.First,
    () => GuitarString.Second
  );

  static get standardTunning(): GuitarString[] {
    return GuitarString.all;
  }

  toTunning(tunning: GuitarTuning) {
    return new GuitarString(
      this.name,
      tunning.openStringPitchFor(this),
      this.openStringOctave,
      this.Index,
      () => this.NextDescending,
      () => this.NextAscending
    );
  }

  fretFor(pitch: Pitch): Fret {
    return new Fret(this, this.openStringPitch.absoluteDistance(pitch), pitch);
  }

  fretsFor(position: Position) {
    return new HorizontalFrets(this.fretsFromTo(position.Low, position.High));
  }

  fretsFromTo(from: number, to: number) {
    const frets: Fret[] = [];
    let [pitch, octave] = [...this.pitchAndOctaveFor(from)];

    for (let fretNumber = from; fretNumber <= to; fretNumber++) {
      if (pitch == Pitch.C) {
        octave = octave.up();
      }

      frets.push(new Fret(this, fretNumber, pitch, octave));
      pitch = pitch.sharp();
    }

    return frets;
  }

  equals(other: GuitarString): boolean {
    return this.index === other.index;
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

  private pitchAndOctaveFor(fretNumber: number): [Pitch, Octave] {
    let pitch = this.openStringPitch;
    let octave = this.openStringOctave;

    for (let i = 0; i < fretNumber; i++) {
      if (pitch == Pitch.C) {
        octave = octave.up();
      }

      pitch = pitch.sharp();
    }

    return [pitch, octave];
  }
}

export class GuitarTuning {
  private static readonly all: GuitarTuning[] = [];

  private constructor(
    private readonly name: string,
    private readonly pitches: Pitch[]
  ) {
    GuitarTuning.all.push(this);
  }

  get Name() {
    return this.name;
  }

  openStringPitchFor(guitarString: GuitarString) {
    return this.pitches[guitarString.Index - 1]!;
  }

  public static readonly OpenA: GuitarTuning = new GuitarTuning(
    'Open A',
    [Pitch.E, Pitch.A, Pitch.CSharp, Pitch.E, Pitch.A, Pitch.E].reverse()
  );

  public static readonly OpenAltA: GuitarTuning = new GuitarTuning(
    'Open A alternate',
    [Pitch.A, Pitch.E, Pitch.A, Pitch.E, Pitch.A, Pitch.CSharp].reverse()
  );

  public static readonly OpenASlide: GuitarTuning = new GuitarTuning(
    'Open A alternate',
    [Pitch.E, Pitch.A, Pitch.E, Pitch.A, Pitch.CSharp, Pitch.E].reverse()
  );

  public static readonly OpenB: GuitarTuning = new GuitarTuning(
    'Open B',
    [Pitch.B, Pitch.FSharp, Pitch.B, Pitch.FSharp, Pitch.B, Pitch.DSharp].reverse()
  );

  public static readonly OpenAltB: GuitarTuning = new GuitarTuning(
    'Open B alternate',
    [Pitch.FSharp, Pitch.B, Pitch.DSharp, Pitch.FSharp, Pitch.B, Pitch.DSharp].reverse()
  );

  public static readonly OpenC: GuitarTuning = new GuitarTuning(
    'Open C',
    [Pitch.C, Pitch.G, Pitch.C, Pitch.G, Pitch.C, Pitch.E].reverse()
  );

  public static readonly OpenAltC: GuitarTuning = new GuitarTuning(
    'Open C alternate',
    [Pitch.C, Pitch.E, Pitch.G, Pitch.C, Pitch.E, Pitch.G].reverse()
  );

  public static readonly OpenD: GuitarTuning = new GuitarTuning(
    'Open D',
    [Pitch.D, Pitch.A, Pitch.D, Pitch.FSharp, Pitch.A, Pitch.D].reverse()
  );

  public static readonly DropD: GuitarTuning = new GuitarTuning(
    'Drop D',
    [Pitch.D, Pitch.A, Pitch.D, Pitch.G, Pitch.B, Pitch.E].reverse()
  );

  public static readonly OpenG: GuitarTuning = new GuitarTuning(
    'Open G',
    [Pitch.D, Pitch.G, Pitch.D, Pitch.G, Pitch.B, Pitch.D].reverse()
  );

  public static readonly EFlat: GuitarTuning = new GuitarTuning(
    'Eb',
    [Pitch.EFlat, Pitch.AFlat, Pitch.DFlat, Pitch.GFlat, Pitch.BFlat, Pitch.EFlat].reverse()
  );

  public static readonly D: GuitarTuning = new GuitarTuning(
    'D',
    [Pitch.D, Pitch.G, Pitch.C, Pitch.F, Pitch.A, Pitch.D].reverse()
  );
}

export class Position {
  private static readonly all: Position[] = [];

  private constructor(
    private name: string,
    private lowFret: Fret,
    private highFret: Fret
  ) {
    Position.all.push(this);
  }

  get High() {
    return this.highFret.Number;
  }

  get Low() {
    return this.lowFret.Number;
  }

  get To(): PositionPrimitives {
    return {
      name: this.name,
      lowestFret: this.lowFret.To,
      highestFret: this.highFret.To,
    };
  }

  public static From(primitive: PositionPrimitives) {
    const position = Position.all.find(
      (p) =>
        p.name === primitive.name &&
        p.lowFret.Number === primitive.lowestFret.fret &&
        p.highFret.Number === primitive.highestFret.fret
    );

    if (!position) {
      throw new Error('Invalid position');
    }

    return position;
  }

  public static readonly Open: Position = new Position(
    'Open',
    new Fret(GuitarString.Sixth, 0, Pitch.E, Octave.C2),
    new Fret(GuitarString.First, 4, Pitch.GSharp, Octave.C4)
  );

  public static readonly C: Position = new Position(
    'C',
    new Fret(GuitarString.Sixth, 1, Pitch.F, Octave.C2),
    new Fret(GuitarString.First, 5, Pitch.A, Octave.C4)
  );

  public static readonly A: Position = new Position(
    'A',
    new Fret(GuitarString.Sixth, 4, Pitch.AFlat, Octave.C2),
    new Fret(GuitarString.First, 8, Pitch.C, Octave.C5)
  );

  public static readonly G: Position = new Position(
    'G',
    new Fret(GuitarString.Sixth, 6, Pitch.BFlat, Octave.C2),
    new Fret(GuitarString.First, 10, Pitch.D, Octave.C5)
  );

  public static readonly E: Position = new Position(
    'E',
    new Fret(GuitarString.Sixth, 9, Pitch.DFlat, Octave.C3),
    new Fret(GuitarString.First, 12, Pitch.E, Octave.C5)
  );

  public static readonly D: Position = new Position(
    'D',
    new Fret(GuitarString.Sixth, 11, Pitch.EFlat, Octave.C3),
    new Fret(GuitarString.First, 15, Pitch.G, Octave.C5)
  );

  public static readonly C8: Position = new Position(
    'C8',
    new Fret(GuitarString.Sixth, 14, Pitch.GFlat, Octave.C3),
    new Fret(GuitarString.First, 17, Pitch.A, Octave.C5)
  );

  public static readonly A8: Position = new Position(
    'A8',
    new Fret(GuitarString.Sixth, 16, Pitch.AFlat, Octave.C3),
    new Fret(GuitarString.First, 20, Pitch.C, Octave.C6)
  );

  public static readonly G8: Position = new Position(
    'G8',
    new Fret(GuitarString.Sixth, 18, Pitch.BFlat, Octave.C3),
    new Fret(GuitarString.First, 22, Pitch.D, Octave.C6)
  );

  public static readonly E8: Position = new Position(
    'E8',
    new Fret(GuitarString.Sixth, 21, Pitch.DFlat, Octave.C4),
    new Fret(GuitarString.First, 24, Pitch.E, Octave.C6)
  );

  contains(fret: Fret): boolean {
    return fret.isWithin(this.lowFret, this.highFret);
  }
}

export class FretboardPosition {
  private readonly frets: Fret[][] = [];

  constructor(position: Position, guitarStrings: GuitarStrings) {
    for (const guitarString of guitarStrings) {
      this.frets.push([...guitarString.fretsFromTo(position.Low, position.High)]);
    }
  }

  mapMelodicLine(line: MelodicLine): HorizontalFrets {
    const fretsForLine: HorizontalFrets = new HorizontalFrets();

    for (const note of line) {
      const lastFret = fretsForLine.last();
      const frets = this.frets.flatMap((fs) =>
        fs.filter((f) => note.hasSamePitch(f.Pitch!) && note.hasSameOctave(f.Octave!))
      );

      if (!frets) {
        break;
      }

      if (frets.length === 1) {
        fretsForLine.push(frets[0]!);
        continue;
      }

      if (!lastFret) {
        fretsForLine.push(frets[0]!);
        continue;
      }

      frets.filter((f) => f.isOnSameStringAs(lastFret)).forEach((f) => fretsForLine.push(f));
    }

    return fretsForLine;
  }
}

export class GuitarChord implements Iterable<Fret> {
  private chordFrets: VerticalFrets = new VerticalFrets();
  private position: Position = Position.Open;

  toTab(): TabColumn {
    return TabColumn.fromFrets([...this.chordFrets].reverse());
  }

  toString(): string {
    return this.chordFrets.toString();
  }

  *[Symbol.iterator](): Iterator<Fret> {
    for (const fret of this.chordFrets) {
      yield fret;
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
      guitarChord.chordFrets = new VerticalFrets(
        guitarChord.mapOpenPositionChord(chord, guitarStrings)
      );
      return guitarChord;
    }

    guitarChord.chordFrets = new VerticalFrets(
      guitarChord.mapNonOpenePositionChord(chord, guitarStrings)
    );
    return guitarChord;
  }

  public static fromBassString(chord: Chord, bass: GuitarString): GuitarChord {
    const guitarChord = new GuitarChord();

    guitarChord.mapFromBassString(chord, bass);
    guitarChord.chordFrets.adjustOpenStringOctaves();
    guitarChord.chordFrets.reverse();
    return guitarChord;
  }

  private mapFromBassString(chord: Chord, guitarString: GuitarString) {
    for (const pitch of chord) {
      let fret = guitarString.fretFor(pitch);

      if (this.chordFrets.isTooFar(fret)) {
        fret = fret.raiseOctave();
      }

      if (this.chordFrets.isTooFar(fret)) {
        guitarString = guitarString.NextAscending;
        fret = guitarString.fretFor(pitch);
      }

      this.addFretFor(fret, guitarString);
      guitarString = guitarString.NextAscending;
    }
  }

  private addFretFor(fret: Fret, guitarString: GuitarString) {
    this.chordFrets.updateFretAt(fret, guitarString.Index - 1);
  }

  private mapOpenPositionChord(chord: Chord, guitarStrings: GuitarStrings): Fret[] {
    const mappedeFrets: Fret[] = [];

    for (const guitarString of guitarStrings) {
      for (const pitch of chord) {
        const fret = guitarString.fretFor(pitch);

        if (this.position.contains(fret)) {
          mappedeFrets.push(fret);
          break;
        }
      }
    }

    return mappedeFrets;
  }

  private mapNonOpenePositionChord(chord: Chord, guitarStrings: GuitarStrings): Fret[] {
    const mappedeFrets: Fret[] = [];

    for (const guitarString of guitarStrings) {
      for (const pitch of chord) {
        if (mappedeFrets.find((f) => f.Pitch === pitch)) {
          continue;
        }

        const fret = guitarString.fretFor(pitch);

        if (this.position.contains(fret)) {
          mappedeFrets.push(fret);
        }
      }

      if (!mappedeFrets.find((f) => f.String === guitarString)) {
        mappedeFrets.push(new BlankFret());
      }
    }

    return mappedeFrets;
  }
}

export class GuitarHarmonicLine {
  private readonly chords: GuitarChord[] = [];
  private readonly bassString: GuitarString = GuitarString.Sixth;

  constructor(bassString: GuitarString, chords: Chord[] = []) {
    this.bassString = bassString;
    chords.forEach((c) => this.add(c));
  }

  add(chord: Chord) {
    this.chords.push(GuitarChord.fromBassString(chord, this.bassString));
  }

  toTab() {
    const column = [...this.chords].map((c) => c.toTab());
    return new Tab(...column);
  }
}

export class Tab {
  private tab: string[][];

  constructor(...columns: TabColumn[]) {
    this.tab = this.renderColumns(columns);
  }

  sufixWith(...columns: TabColumn[]) {
    this.tab = this.tab.concat(this.renderColumns(columns));
    return this;
  }

  prefixWith(...columns: TabColumn[]) {
    this.tab = this.renderColumns(columns).concat(this.tab);
    return this;
  }

  separateWith(separator: string): this {
    this.tab = this.tab.map((column, i) =>
      i == this.tab.length - 1 ? column : column.map((value) => `${value}${separator}`)
    );
    return this;
  }

  render(): string[][] {
    return this.tab;
  }

  static render(tab: Tab = new Tab()): string {
    return tab
      .separateWith('-')
      .prefixWith(TabColumn.Start)
      .prefixWith(TabColumn.StandardTunning)
      .sufixWith(TabColumn.End)
      .render()
      .reduce((acc, column) => acc.map((row, i) => row.concat(column[i] ?? ''), []))
      .join('\n');
  }

  static renderColumn(column: TabColumn): string {
    return Tab.render(new Tab(column));
  }

  private renderColumns(columns: TabColumn[]): string[][] {
    return columns.map((column) => column.render());
  }
}
