import { FretPrimitives, GuitarStringPrimitives, PositionPrimitives } from '../primitives/Guitar';
import { PitchLines } from './Barry';
import { Chord } from './Chord';
import { Pitch, PitchLine, PitchLineDirection } from './Pitch';

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

export class Fret {
  constructor(
    protected readonly string: GuitarString,
    private readonly fret: number,
    private readonly pitch?: Pitch
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

  toTab(guitarStrings: GuitarStrings = new GuitarStrings()): TabColumn {
    const frets: Fret[] = [...guitarStrings].map((gs) =>
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

  isOnAdjacentStringAs(other: Fret) {
    return this.String == other.String.NextAscending || this.String == other.String.NextDescending;
  }

  isOnAdjacentOfAdjacentStringAs(other: Fret) {
    const nextNextAscending = other.String.NextAscending.NextAscending;
    const nextNextDescending = other.String.NextDescending.NextDescending;
    return this.String == nextNextAscending || this.String == nextNextDescending;
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

  override toTab(guitarStrings: GuitarStrings = new GuitarStrings()): TabColumn {
    const frets: Fret[] = [...guitarStrings].map((gs) => new BlankFret(gs));

    return TabColumn.fromFrets([...frets]);
  }

  override toString() {
    return '-';
  }

  override raiseOctave(): Fret {
    return new BlankFret(this.string, -1);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override isWithin(_lowFret: Fret, _highFret: Fret, _lowerMargin = 0, _higherMargin = 0) {
    return false;
  }
}

abstract class Frets implements Iterable<Fret> {
  protected frets: Fret[] = [];

  protected constructor(frets: Fret[] = []) {
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

  protected areAllFretsOnSameGuitarString() {
    return this.frets.every((f) => f.isOnSameStringAs(this.frets[0]!));
  }

  protected areAllFretsWithinAdjacentGuitarStrings() {
    return this.frets.every(
      (f) => f.isOnSameStringAs(this.frets[0]!) || f.isOnAdjacentStringAs(this.frets[0]!)
    );
  }

  protected areAllFretsWithinAdjacentOfAdjacentGuitarStrings() {
    return this.frets.every(
      (f) =>
        f.isOnSameStringAs(this.frets[0]!) ||
        f.isOnAdjacentStringAs(this.frets[0]!) ||
        f.isOnAdjacentOfAdjacentStringAs(this.frets[0]!)
    );
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

  concat(frets: HorizontalFrets) {
    this.frets = this.frets.concat(frets.frets);
  }

  last() {
    return this.frets[this.frets.length - 1];
  }

  toTab(guitarStrings: GuitarStrings): Tab {
    const column = this.frets.map((fret) => fret.toTab(guitarStrings));
    return new Tab(...column);
  }

  smoothness() {
    if (this.areAllFretsOnSameGuitarString()) {
      return 0;
    }

    if (this.areAllFretsWithinAdjacentGuitarStrings()) {
      return 1;
    }

    if (this.areAllFretsWithinAdjacentOfAdjacentGuitarStrings()) {
      return 2;
    }

    return 3;
  }

  get length() {
    return this.frets.length;
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

  lowerToHigher() {
    return new GuitarStrings(
      this.guitarStrings.sort((s1: GuitarString, s2: GuitarString) => s1.Index - s2.Index)
    );
  }

  sortByDirectionAndString(lineDirection: PitchLineDirection, previousString: GuitarString) {
    return lineDirection === PitchLineDirection.Descending
      ? this.higherThan(previousString).lowerToHigher()
      : this.lowerThan(previousString);
  }

  *[Symbol.iterator](): Iterator<GuitarString> {
    for (const guitarString of this.guitarStrings) {
      yield guitarString;
    }
  }

  private higherThan(guitarString: GuitarString) {
    return new GuitarStrings(this.guitarStrings.filter((s) => !s.isLowerIndexThan(guitarString)));
  }

  private lowerThan(guitarString: GuitarString) {
    return new GuitarStrings(this.guitarStrings.filter((s) => !s.isHigherIndexThan(guitarString)));
  }
}

export class GuitarString {
  private static readonly all: GuitarString[] = [];

  private constructor(
    private readonly name: string,
    private openStringPitch: Pitch,
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

  toTunning(tunning: GuitarTuning) {
    return new GuitarString(
      this.name,
      tunning.openStringPitchFor(this),
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
    let pitch = this.openStringPitch;

    for (let i = from; i--; ) {
      pitch = pitch.sharp();
    }

    for (let i = from; i <= to; i++) {
      frets.push(new Fret(this, i, pitch));
      pitch = pitch.sharp();
    }

    return frets;
  }

  equals(other: GuitarString): boolean {
    return this.index === other.index;
  }

  isHigherIndexThan(other: GuitarString): boolean {
    return other.index < this.index;
  }

  isLowerIndexThan(other: GuitarString): boolean {
    return other.index > this.index;
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
      throw 'Invalid position';
    }

    return position;
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
}

export class PositionFrets {
  private readonly frets: Fret[][] = [];

  constructor(position: Position, guitarStrings: GuitarStrings) {
    for (const guitarString of guitarStrings) {
      this.frets.push([...guitarString.fretsFromTo(position.Low, position.High)]);
    }
  }

  horizontalFretsFor(guitarString: GuitarString) {
    for (const fretsOnString of this.frets) {
      if (fretsOnString.some((f) => f.String == guitarString)) {
        return new HorizontalFrets(fretsOnString);
      }
    }
    return new HorizontalFrets();
  }

  verticalFretsAt(fretNumber: number) {
    const vFrets: Fret[] = [];
    for (const fretsOnString of this.frets) {
      const fret = fretsOnString.find((f) => f.Number == fretNumber);
      if (fret) {
        vFrets.push(fret);
      }
    }

    return new VerticalFrets(vFrets);
  }

  map(line: PitchLine): HorizontalFrets | undefined {
    const fretsOnStrings =
      line.Direction == PitchLineDirection.Descending ? this.frets.reverse() : this.frets;
    const fretLines = [];

    while (fretsOnStrings.length != 0) {
      const fretLine = this.lineToFrets(fretsOnStrings, line);

      fretLines.push(fretLine);

      fretsOnStrings.shift();
    }

    fretLines.sort((fl1, fl2) => {
      const d1 = Math.abs(fl1.length - line.length);
      const d2 = Math.abs(fl2.length - line.length);

      return fl1.smoothness() + d1 - (fl2.smoothness() + d2);
    });

    return fretLines[0];
  }

  private lineToFrets(fretsOnStrings: Fret[][], line: PitchLine) {
    const fretsForLine: HorizontalFrets = new HorizontalFrets();
    let pitchIndex = 0;

    for (const fretsOnString of fretsOnStrings) {
      if (PitchLineDirection.Descending) {
        fretsOnString.reverse();
      }

      fretsOnString.forEach((f) => {
        if (line.pitchAt(pitchIndex)?.equal(f.Pitch)) {
          fretsForLine.push(f);
          pitchIndex++;
        }
      });
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

        if (this.position.contains(fret, 1, 1)) {
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

        if (this.position.contains(fret, 1, 1)) {
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

export class GuitarPitchLine {
  protected readonly line: HorizontalFrets = new HorizontalFrets();
  private readonly position: Position = Position.Open;
  private readonly guitarStrings = new GuitarStrings();

  constructor(
    pitchLine: PitchLine,
    position: Position,
    guitarStrings: GuitarStrings = new GuitarStrings()
  ) {
    this.position = position;
    this.guitarStrings = guitarStrings;
    this.line =
      pitchLine.length == 0 ? new HorizontalFrets() : this.mapPitchLine(pitchLine, guitarStrings);
  }

  toTab(): Tab {
    return this.line.toTab(this.guitarStrings);
  }

  protected mapPitchLine(pitchLine: PitchLine, guitarStrings: GuitarStrings) {
    return this.mapLine(pitchLine, this.guitarStringsFor(pitchLine.Direction, guitarStrings));
  }

  private guitarStringsFor(lineDirection: PitchLineDirection, guitarStrings: GuitarStrings) {
    const lastFret = this.line.last();

    if (lastFret) {
      return guitarStrings.sortByDirectionAndString(lineDirection, lastFret.String);
    }

    return guitarStrings;
  }

  private mapLine(pitchLine: PitchLine, guitarStrings: GuitarStrings) {
    const line = new HorizontalFrets();

    for (const pitch of pitchLine) {
      for (const guitarString of guitarStrings) {
        const lastFret = line.last();
        if (lastFret && this.skipString(lastFret, guitarString, pitchLine.Direction)) {
          continue;
        }

        if (
          pitchLine.Direction == PitchLineDirection.OctaveDown &&
          this.mapPitch(pitch, guitarString.NextDescending.NextDescending, line)
        ) {
          break;
        }

        if (this.mapPitch(pitch, guitarString, line)) {
          break;
        }
      }
    }

    return line;
  }

  private skipString(
    lastFretOnLine: Fret,
    guitarString: GuitarString,
    direction: PitchLineDirection
  ) {
    return direction == PitchLineDirection.Ascending
      ? guitarString.isHigherIndexThan(lastFretOnLine.String)
      : guitarString.isLowerIndexThan(lastFretOnLine.String);
  }

  private mapPitch(pitch: Pitch, guitarString: GuitarString, line: HorizontalFrets): boolean {
    const fret = guitarString.fretFor(pitch);
    if (this.position.contains(fret)) {
      line.push(fret);
      return true;
    }

    return false;
  }
}

export class GuitarPitchLines extends GuitarPitchLine {
  constructor(
    pitchLines: PitchLines,
    position: Position,
    guitarStrings: GuitarStrings = new GuitarStrings()
  ) {
    super(new PitchLine(), position, guitarStrings);

    for (const pitchLine of pitchLines) {
      if (pitchLine.length > 0) {
        this.line.concat(this.mapPitchLine(pitchLine, guitarStrings));
      }
    }
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
      .reduce((acc = [], column) => acc.map((row, i) => row.concat(column[i] ?? '')))
      .join('\n');
  }

  static renderColumn(column: TabColumn): string {
    return Tab.render(new Tab(column));
  }

  private renderColumns(columns: TabColumn[]): string[][] {
    return columns.map((column) => column.render());
  }
}
