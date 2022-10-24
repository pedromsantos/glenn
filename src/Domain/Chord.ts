import { Duration } from '../Domain/Duration';
import { Interval } from '../Domain/Interval';
import Pitch, { PitchPrimitives } from '../Domain/Pitch';

export type ChordPitchPrimitives = {
  pitch: PitchPrimitives;
  function: string;
};

export class ChordPitch {
  constructor(
    private readonly _pitch: Pitch = Pitch.C,
    private readonly _func: ChordFunction = ChordFunction.Root
  ) {}

  get Pitch() {
    return this._pitch;
  }

  get Function() {
    return this._func;
  }

  get To(): Readonly<ChordPitchPrimitives> {
    return {
      pitch: this._pitch.To,
      function: this._func.To,
    };
  }
}

export class ChordPitches {
  constructor(private readonly pitches: ChordPitch[]) {}

  static createFromPitches(pitches: ChordPitch[]) {
    return new ChordPitches(pitches);
  }

  static createFromRootAndPattern(root: Pitch, pattern: ChordPattern) {
    return new ChordPitches(pattern.pitches(root));
  }

  get Pitches(): Pitch[] {
    return this.pitches.map((p) => p.Pitch);
  }

  get Bass(): Pitch {
    return this.first();
  }

  get Lead(): Pitch {
    return this.last();
  }

  get To(): Readonly<ChordPitchPrimitives[]> {
    return this.pitches.map((p) => p.To);
  }

  toIntervals(): Interval[] {
    const root = this.pitchForFunction(ChordFunction.Root);
    return this.Pitches.map((p) => root.intervalTo(p)).slice(1);
  }

  pitchForFunction(func: ChordFunction): Pitch {
    const chordPitch = this.pitches.find((p) => p.Function === func);
    return chordPitch?.Pitch ?? this.first();
  }

  remove(func: ChordFunction): ChordPitches {
    return ChordPitches.createFromPitches(this.pitches.filter((p) => p.Function !== func));
  }

  drop2(): ChordPitches {
    return new ChordPitches(this.pitchMove(1, 2).pitchMove(2, 3).pitches);
  }

  drop3(): ChordPitches {
    return new ChordPitches(this.drop2().drop2().pitches);
  }

  rotate(amount = 1): ChordPitches {
    amount = amount % this.pitches.length;
    return new ChordPitches(this.pitches.slice(amount).concat(this.pitches.slice(0, amount)));
  }

  rotateLastSkipFirst(skip = 1): ChordPitches {
    const tail = this.pitches.slice(skip);
    const rotatedTail = tail.slice(1).concat(tail.slice(0, 1));
    const invertedPitches = this.pitches.slice(0, skip).concat(rotatedTail);
    return new ChordPitches(invertedPitches);
  }

  private first(): Pitch {
    const pitch = this.pitches[0];

    /* istanbul ignore next */
    if (!pitch) {
      throw Error('first pitch cannot be null/undefined');
    }

    return pitch.Pitch;
  }

  private last(): Pitch {
    const pitch = this.pitches.slice(-1)[0];

    /* istanbul ignore next */
    if (!pitch) {
      throw Error('last pitch cannot be null/undefined');
    }

    return pitch.Pitch;
  }

  private pitchMove(fromIndex: number, toIndex: number): ChordPitches {
    const element: ChordPitch | undefined = this.pitches[fromIndex];
    if (element) {
      this.pitches.splice(fromIndex, 1);
      this.pitches.splice(toIndex, 0, element);
    }

    return this;
  }
}

export interface Chord {
  get Pitches(): Pitch[];
  get Bass(): Pitch;
  get Lead(): Pitch;
  get Name(): string;
  get Pattern(): ChordPattern;
  pitchForFunction(func: ChordFunction): Pitch;
  remove(func: ChordFunction): Chord;
  invert(): Chord;
  drop2(): Chord;
  drop3(): Chord;
  closed(): Chord;
}

export type ChordPrimitives = {
  name: string;
  root: PitchPrimitives;
  pitches: ChordPitchPrimitives[];
  pattern: string;
  bass: PitchPrimitives;
  lead: PitchPrimitives;
  duration: number;
};

class BaseChord implements Chord {
  protected readonly pattern: ChordPattern;
  protected readonly _pitches: ChordPitches;
  protected readonly root: ChordPitch;
  protected readonly duration: Duration;

  protected constructor(
    root: Pitch,
    pattern: ChordPattern,
    duration: Duration = Duration.Whole,
    overridePitches?: ChordPitches
  ) {
    this.pattern = pattern;
    this.root = new ChordPitch(root, ChordFunction.Root);
    this.duration = duration;
    this._pitches = overridePitches || ChordPitches.createFromRootAndPattern(root, pattern);
  }

  get Pitches(): Pitch[] {
    return this._pitches.Pitches;
  }

  get Bass(): Pitch {
    return this._pitches.Bass;
  }

  get Lead(): Pitch {
    return this._pitches.Lead;
  }

  get Name(): string {
    return this.root.Pitch.Name + this.pattern.Name;
  }

  get Abbreviation(): string {
    return this.root.Pitch.Name + this.pattern.Abbreviation;
  }

  get Pattern(): ChordPattern {
    return this.pattern;
  }

  get To(): Readonly<ChordPrimitives> {
    return {
      name: this.Name,
      root: this.root.Pitch.To,
      pitches: this._pitches.To.map((p) => p),
      pattern: this.pattern.To,
      bass: this.Bass.To,
      lead: this.Lead.To,
      duration: this.duration.value,
    };
  }

  pitchForFunction(func: ChordFunction): Pitch {
    return this._pitches.pitchForFunction(func);
  }

  remove(func: ChordFunction): Chord {
    return new BaseChord(this.root.Pitch, this.pattern, this.duration, this._pitches.remove(func));
  }

  invert(): Chord {
    return new BaseChord(this.root.Pitch, this.pattern, this.duration, this._pitches.rotate(1));
  }

  drop2(): Chord {
    if (this.Pitches.length < 4) {
      return this;
    }
    return new Drop2Chord(this.root.Pitch, this.pattern, this.duration, this._pitches.drop2());
  }

  drop3(): Chord {
    if (this.Pitches.length < 4) {
      return this;
    }

    return new Drop3Chord(this.root.Pitch, this.pattern, this.duration, this._pitches.drop3());
  }

  closed(): Chord {
    return new ClosedChord(this.root.Pitch, this.pattern, this.duration);
  }

  static From(state: ChordPrimitives): Chord {
    const root = Pitch.From(state.root);
    const pattern = ChordPattern.From(state.pattern);
    if (root === undefined || pattern === undefined) {
      throw 'Cannot create instance from state';
    }
    return new BaseChord(root, pattern, Duration.From(state.duration));
  }
}

export class ClosedChord extends BaseChord {
  constructor(
    root: Pitch,
    pattern: ChordPattern,
    duration: Duration = Duration.Whole,
    overridePitches?: ChordPitches
  ) {
    super(root, pattern, duration, overridePitches);
  }

  override closed(): Chord {
    return this;
  }
}

export class Drop2Chord extends BaseChord {
  constructor(
    root: Pitch,
    pattern: ChordPattern,
    duration: Duration = Duration.Whole,
    overridePitches?: ChordPitches
  ) {
    super(root, pattern, duration, overridePitches);
  }

  override invert(): Chord {
    return new Drop2Chord(
      this.root.Pitch,
      this.pattern,
      this.duration,
      this._pitches.rotate(3).rotateLastSkipFirst().rotateLastSkipFirst()
    );
  }

  override remove(func: ChordFunction): Chord {
    return new Drop2Chord(this.root.Pitch, this.pattern, this.duration, this._pitches.remove(func));
  }

  override drop2(): Chord {
    return this;
  }
}

export class Drop3Chord extends BaseChord {
  constructor(
    root: Pitch,
    pattern: ChordPattern,
    duration: Duration = Duration.Whole,
    overridePitches?: ChordPitches
  ) {
    super(root, pattern, duration, overridePitches);
  }

  override invert(): Chord {
    return new Drop3Chord(
      this.root.Pitch,
      this.pattern,
      this.duration,
      this._pitches.rotate(2).rotateLastSkipFirst(2).rotateLastSkipFirst(1).rotateLastSkipFirst(1)
    );
  }

  override remove(func: ChordFunction): Chord {
    return new Drop3Chord(this.root.Pitch, this.pattern, this.duration, this._pitches.remove(func));
  }

  override drop3(): Chord {
    return this;
  }
}

export class ChordFunction {
  private static readonly all: ChordFunction[] = [];

  private constructor(private name: string) {
    ChordFunction.all.push(this);
  }

  public static readonly Root: ChordFunction = new ChordFunction('Root');
  public static readonly Third: ChordFunction = new ChordFunction('Third');
  public static readonly Fifth: ChordFunction = new ChordFunction('Fifth');
  public static readonly Sixth: ChordFunction = new ChordFunction('Sixth');
  public static readonly Seventh: ChordFunction = new ChordFunction('Seventh');
  public static readonly Ninth: ChordFunction = new ChordFunction('Ninth');
  public static readonly Eleventh: ChordFunction = new ChordFunction('Eleventh');
  public static readonly Thirteenth: ChordFunction = new ChordFunction('Thirteenth');

  public static functionForInterval(interval: Interval): ChordFunction {
    switch (interval) {
      case Interval.Unison:
        return ChordFunction.Root;
      case Interval.MajorThird:
      case Interval.MinorThird:
      case Interval.MajorSecond:
      case Interval.MinorSecond:
      case Interval.PerfectFourth:
      case Interval.AugmentedFourth:
        return ChordFunction.Third;
      case Interval.PerfectFifth:
      case Interval.DiminishedFifth:
      case Interval.AugmentedFifth:
        return ChordFunction.Fifth;
      case Interval.MinorSixth:
      case Interval.MajorSixth:
        return ChordFunction.Sixth;
      case Interval.MajorSeventh:
      case Interval.MinorSeventh:
      case Interval.DiminishedSeventh:
        return ChordFunction.Seventh;
      case Interval.MajorNinth:
      case Interval.MinorNinth:
        return ChordFunction.Ninth;
      case Interval.PerfectEleventh:
      case Interval.AugmentedEleventh:
        return ChordFunction.Eleventh;
      case Interval.MajorThirteenth:
        return ChordFunction.Thirteenth;
      default:
        return ChordFunction.Root;
    }
  }

  get To(): Readonly<string> {
    return this.name;
  }
}

// Stryker disable StringLiteral
export class ChordPattern {
  private static readonly all: ChordPattern[] = [];

  private constructor(
    private readonly name: string,
    private readonly abbreviation: string,
    private readonly pattern: Array<Interval>
  ) {
    ChordPattern.all.push(this);
  }

  get Name() {
    return this.name;
  }

  get Abbreviation() {
    return this.abbreviation;
  }

  get To(): Readonly<string> {
    return this.Name;
  }

  pitches(root: Pitch): Array<ChordPitch> {
    return [new ChordPitch(root, ChordFunction.Root)].concat(
      this.pattern.map((p) => this.createChordNote(p, root))
    );
  }

  static get patterns() {
    return ChordPattern.all;
  }

  static patternFor(intervals: Interval[]): ChordPattern | undefined {
    return (
      ChordPattern.patterns.find(
        (p) =>
          intervals.length === p.pattern.length &&
          p.pattern.every((interval, index) => interval === intervals[index])
      ) || undefined
    );
  }

  static From(name: string): ChordPattern | undefined {
    return ChordPattern.patterns.find((n) => n.Name === name);
  }

  public static readonly Major: ChordPattern = new ChordPattern('Major', 'Maj', [
    Interval.MajorThird,
    Interval.PerfectFifth,
  ]);

  public static readonly Augmented: ChordPattern = new ChordPattern('Augmented', 'Aug', [
    Interval.MajorThird,
    Interval.AugmentedFifth,
  ]);
  public static readonly Major6: ChordPattern = new ChordPattern('Major 6', 'Maj 6', [
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MajorSixth,
  ]);
  public static readonly Major6Add9: ChordPattern = new ChordPattern(
    'Major 6 add 9',
    'Maj 6 add 9',
    [Interval.MajorThird, Interval.PerfectFifth, Interval.MajorSixth, Interval.MajorNinth]
  );
  public static readonly Major6Flat5Add9: ChordPattern = new ChordPattern(
    'Major 6 flat5 add 9',
    'Maj 6 b5 add 9',
    [Interval.MajorThird, Interval.DiminishedFifth, Interval.MajorSixth, Interval.MajorNinth]
  );
  public static readonly Major7: ChordPattern = new ChordPattern('Major 7', 'Maj 7', [
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MajorSeventh,
  ]);
  public static readonly Major9: ChordPattern = new ChordPattern('Major 9', 'Maj 9', [
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MajorSeventh,
    Interval.MajorNinth,
  ]);
  public static readonly Major9Sharp11: ChordPattern = new ChordPattern(
    'Major 9 sharp 11',
    'Maj 9 #11',
    [
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MajorSeventh,
      Interval.MajorNinth,
      Interval.AugmentedEleventh,
    ]
  );

  public static readonly Major11: ChordPattern = new ChordPattern('Major 11', 'Maj 11', [
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MajorSeventh,
    Interval.PerfectEleventh,
  ]);

  public static readonly Major13: ChordPattern = new ChordPattern('Major 13', 'Maj 13', [
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MajorSeventh,
    Interval.MajorThirteenth,
  ]);

  public static readonly Major13Sharp11: ChordPattern = new ChordPattern(
    'Major 13 sharp11',
    'Maj 13 #11',
    [
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MajorSeventh,
      Interval.AugmentedEleventh,
      Interval.MajorThirteenth,
    ]
  );

  public static readonly Augmented7: ChordPattern = new ChordPattern('Augmented 7', 'Aug 7', [
    Interval.MajorThird,
    Interval.AugmentedFifth,
    Interval.MajorSeventh,
  ]);

  public static readonly Dominant7: ChordPattern = new ChordPattern('Dominant 7', '7', [
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
  ]);

  public static readonly Dominant7Flat5: ChordPattern = new ChordPattern(
    'Dominant 7 flat 5',
    '7 b5',
    [Interval.MajorThird, Interval.DiminishedFifth, Interval.MinorSeventh]
  );

  public static readonly Dominant7Flat9: ChordPattern = new ChordPattern(
    'Dominant 7 flat 9',
    '7 b9',
    [Interval.MajorThird, Interval.PerfectFifth, Interval.MinorSeventh, Interval.MinorNinth]
  );

  public static readonly Dominant7Sharp9: ChordPattern = new ChordPattern(
    'Dominant 7 sharp 9',
    '7 #9',
    [Interval.MajorThird, Interval.PerfectFifth, Interval.MinorSeventh, Interval.AugmentedNinth]
  );

  public static readonly Dominant7Flat5Flat9: ChordPattern = new ChordPattern(
    'Dominant 7 flat 5 flat9',
    '7 b5 b9',
    [Interval.MajorThird, Interval.DiminishedFifth, Interval.MinorSeventh, Interval.MinorNinth]
  );

  public static readonly Dominant7Flat5Sharp9: ChordPattern = new ChordPattern(
    'Dominant 7 flat 5 sharp9',
    '7 b5 #9',
    [Interval.MajorThird, Interval.DiminishedFifth, Interval.MinorSeventh, Interval.AugmentedNinth]
  );

  public static readonly Dominant9: ChordPattern = new ChordPattern('Dominant 9', '9', [
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
    Interval.MajorNinth,
  ]);

  public static readonly Dominant11: ChordPattern = new ChordPattern('Dominant 11', '11', [
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
    Interval.MajorNinth,
    Interval.PerfectEleventh,
  ]);

  public static readonly Dominant13: ChordPattern = new ChordPattern('Dominant 13', '13', [
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
    Interval.MajorNinth,
    Interval.PerfectEleventh,
    Interval.MajorThirteenth,
  ]);

  public static readonly Minor: ChordPattern = new ChordPattern('Minor', 'min', [
    Interval.MinorThird,
    Interval.PerfectFifth,
  ]);

  public static readonly Diminished: ChordPattern = new ChordPattern('Diminished', 'dim', [
    Interval.MinorThird,
    Interval.DiminishedFifth,
  ]);

  public static readonly Minor7: ChordPattern = new ChordPattern('Minor 7', 'min 7', [
    Interval.MinorThird,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
  ]);

  public static readonly Minor6: ChordPattern = new ChordPattern('Minor 6', 'min 6', [
    Interval.MinorThird,
    Interval.PerfectFifth,
    Interval.MajorSixth,
  ]);

  public static readonly Minor6Add9: ChordPattern = new ChordPattern(
    'Minor 6 add 9',
    'min 6 add 9',
    [Interval.MinorThird, Interval.PerfectFifth, Interval.MajorSixth, Interval.MajorNinth]
  );

  public static readonly Minor9: ChordPattern = new ChordPattern('Minor 9', 'min 9', [
    Interval.MinorThird,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
    Interval.MajorNinth,
  ]);

  public static readonly Diminished7: ChordPattern = new ChordPattern('Diminished7 ', 'dim 7', [
    Interval.MinorThird,
    Interval.DiminishedFifth,
    Interval.DiminishedSeventh,
  ]);

  public static readonly Minor7b5: ChordPattern = new ChordPattern('Minor 7 b5', 'min 7 b5', [
    Interval.MinorThird,
    Interval.DiminishedFifth,
    Interval.MinorSeventh,
  ]);

  public static readonly MinorMaj7: ChordPattern = new ChordPattern('Minor Major 7', 'min Maj 7', [
    Interval.MinorThird,
    Interval.PerfectFifth,
    Interval.MajorSeventh,
  ]);

  public static readonly MinorMaj9: ChordPattern = new ChordPattern('Minor Major 9', 'min Maj 9', [
    Interval.MinorThird,
    Interval.PerfectFifth,
    Interval.MajorSeventh,
    Interval.MajorNinth,
  ]);

  public static readonly Sus2: ChordPattern = new ChordPattern('Su 2', 'Sus 2', [
    Interval.MajorSecond,
    Interval.PerfectFifth,
  ]);

  public static readonly Sus2Diminished: ChordPattern = new ChordPattern(
    'Sus 2 diminished',
    'Sus 2 dim',
    [Interval.MajorSecond, Interval.DiminishedFifth]
  );

  public static readonly Sus2Augmented: ChordPattern = new ChordPattern(
    'Sus 2 Augmented',
    'Sus 2 Aug',
    [Interval.MajorSecond, Interval.AugmentedFifth]
  );

  public static readonly Sus4: ChordPattern = new ChordPattern('Sus 4', 'Sus 4', [
    Interval.PerfectFourth,
    Interval.PerfectFifth,
  ]);

  public static readonly Sus4Diminished: ChordPattern = new ChordPattern(
    'Sus 4 diminished',
    'Sus 4 dim',
    [Interval.PerfectFourth, Interval.DiminishedFifth]
  );

  public static readonly Sus4Augmented: ChordPattern = new ChordPattern(
    'Sus 4 Augmented',
    'Sus 4 aug',
    [Interval.PerfectFourth, Interval.AugmentedFifth]
  );

  private createChordNote(interval: Interval, root: Pitch) {
    return new ChordPitch(root.transpose(interval), ChordFunction.functionForInterval(interval));
  }
}
