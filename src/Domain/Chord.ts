import Interval from '../Domain/Interval';
import Pitch, { PitchPrimitives } from '../Domain/Pitch';
import { Duration } from '../Domain/Duration';

export type ChordPitchPrimitives = {
  pitch: PitchPrimitives;
  function: string;
};

class ChordPitch {
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

class ChordPitches {
  private readonly _pitches: Array<ChordPitch> = [];

  constructor(root: Pitch, pattern: ChordPattern) {
    this._pitches = pattern.pitches(root);
  }

  get Pitches(): Pitch[] {
    return this._pitches.map((p) => p.Pitch);
  }

  get Bass(): Pitch {
    return this.first();
  }

  get Lead(): Pitch {
    return this.last();
  }

  pitchForFunction(func: ChordFunction): Pitch {
    const chordPitch = this._pitches.find((p) => p.Function === func);
    return chordPitch === undefined ? this.first() : chordPitch.Pitch;
  }

  get To(): Readonly<ChordPitchPrimitives[]> {
    return this._pitches.map((p) => p.To);
  }

  private first(): Pitch {
    const pitch = this._pitches[0];
    if (!pitch) {
      throw Error('pitch should not be null/undefined');
    }

    return pitch.Pitch;
  }

  private last(): Pitch {
    const pitch = this._pitches.slice(-1)[0];
    if (!pitch) {
      throw Error('pitch should not be null/undefined');
    }

    return pitch.Pitch;
  }

  // remove(func: ChordFunction) {
  //   this._pitches = this._pitches.filter((p) => p.Function != func);
  // }

  // rotate(amount = 1) {
  //   this._pitches = this._pitches.slice(amount).concat(this._pitches.slice(0, amount));
  // }
}

interface Chord {
  get Pitches(): Pitch[];
  get Bass(): Pitch;
  get Lead(): Pitch;
  get Name(): string;
  pitchForFunction(func: ChordFunction): Pitch;
  //   remove(func: ChordFunction): Chord;
  //   invert(): Chord;
  //   drop2(): Chord;
  //   drop3(): Chord;
  //   closed(): Chord;
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

  constructor(root: Pitch, pattern: ChordPattern, duration: Duration = Duration.Whole) {
    this.pattern = pattern;
    this._pitches = new ChordPitches(root, pattern);
    this.root = new ChordPitch(root, ChordFunction.Root);
    this.duration = duration;
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

  pitchForFunction(func: ChordFunction): Pitch {
    return this._pitches.pitchForFunction(func);
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

  static From(state: ChordPrimitives): Chord | undefined {
    const root = Pitch.From(state.root);
    const pattern = ChordPattern.From(state.pattern);
    if (root === undefined || pattern === undefined) {
      return undefined;
    }
    return new BaseChord(root, pattern, Duration.From(state.duration));
  }
}

export class ClosedChord extends BaseChord {}

export class ChordFunction {
  private constructor(private name: string) {}

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

  static From(name: string): ChordFunction | undefined {
    return ChordFunction.functions.find((f) => f.name === name);
  }

  static functions = [
    ChordFunction.Root,
    ChordFunction.Third,
    ChordFunction.Fifth,
    ChordFunction.Sixth,
    ChordFunction.Seventh,
    ChordFunction.Ninth,
    ChordFunction.Eleventh,
    ChordFunction.Thirteenth,
  ];
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

  pitches(root: Pitch): Array<ChordPitch> {
    return [new ChordPitch(root, ChordFunction.Root)].concat(
      this.pattern.map((p) => this.createChordNote(p, root))
    );
  }

  private createChordNote(interval: Interval, root: Pitch) {
    return new ChordPitch(root.transpose(interval), ChordFunction.functionForInterval(interval));
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

  static From(name: string): ChordPattern | undefined {
    return ChordPattern.patterns.find((n) => n.Name === name);
  }

  static get patterns() {
    return ChordPattern.all;
  }

  static get patternNames() {
    return ChordPattern.patterns.map((p) => p.To);
  }
}
