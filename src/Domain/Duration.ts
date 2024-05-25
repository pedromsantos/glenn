import { DurationPrimitives, TimeSignaturePrimitives } from '../primitives/Duration';

export abstract class TimeSignature {
  private bpm: BeatsPerMinute = new BeatsPerMinute(60, Duration.Quarter);

  protected constructor(
    protected readonly beats: number,
    protected readonly duration: Duration,
    bpm: number
  ) {
    this.bpm = new BeatsPerMinute(bpm, duration);
  }

  protected get beatValue(): number {
    return this.duration.value;
  }

  get beatDuration(): number {
    return this.beatValue;
  }

  get beatDurationMiliseconds(): number {
    return this.bpm.miliSeconds();
  }

  get beatDurationTicks(): number {
    return this.duration.tick;
  }

  get milisecondsPerMeasure(): number {
    return this.beatDurationMiliseconds * this.beats;
  }

  get ticksPerMeasure(): number {
    return this.beatDurationTicks * this.beats;
  }

  get ticksPerSecond(): number {
    return (this.bpm.beatsPerMinute * Duration.tickPerQuarterNote) / 60;
  }

  abstract toFillMeasure(duration: Duration): number;

  milisecondsFor(duration: Duration): number {
    return this.bpm.miliSecondsFor(duration);
  }

  abstract toString(): string;

  get To(): TimeSignaturePrimitives {
    return { signature: this.toString() };
  }
}

export class SimpleTimeSignature extends TimeSignature {
  constructor(beats: number, duration: Duration, bpm = 60) {
    super(beats, duration, bpm);
  }

  override toFillMeasure(duration: Duration): number {
    return (this.beatDurationTicks / duration.tick) * this.beats;
  }

  override toString(): string {
    return `${this.beats}/${
      this.duration.toString().length > 1
        ? this.duration.toString().slice(2)
        : this.duration.toString()
    }`;
  }
}

export class CompoundTimeSignature extends TimeSignature {
  constructor(pulses: number, duration: Duration, bpm = 60) {
    if (pulses % 3 !== 0) {
      throw new RangeError('Compound signatures pulse must be divisible by 3');
    }

    super(pulses / 3, duration, bpm);
  }

  protected override get beatValue(): number {
    return this.duration.value * 3;
  }

  override toFillMeasure(duration: Duration): number {
    return (this.beatDurationTicks / duration.tick) * this.beats * 3;
  }

  override get ticksPerMeasure(): number {
    return this.beatDurationTicks * this.beats * 3;
  }

  override toString(): string {
    return `${this.beats * 3}/${
      this.duration.toString().length > 1
        ? this.duration.toString().slice(2)
        : this.duration.toString()
    }`;
  }
}

enum Durations {
  Double = 2.0 / 1.0,
  Whole = 1.0,
  Half = 1.0 / 2.0,
  Quarter = 1.0 / 4.0,
  Eighth = 1.0 / 8.0,
  Sixteenth = 1.0 / 16.0,
  ThirtySecond = 1.0 / 32.0,
  SixtyFourth = 1.0 / 64.0,
}

const ticksPerQuarterNote = 480;

enum Ticks {
  Double = ticksPerQuarterNote * 8,
  Whole = ticksPerQuarterNote * 4,
  Half = ticksPerQuarterNote * 2,
  Quarter = ticksPerQuarterNote,
  Eighth = ticksPerQuarterNote / 2,
  Sixteenth = ticksPerQuarterNote / 4,
  ThirtySecond = ticksPerQuarterNote / 8,
  SixtyFourth = ticksPerQuarterNote / 16,
}

export class Duration {
  private static readonly all: Duration[] = [];
  private static readonly dotMultiplier = 1.5;
  private static readonly doubleDotMultiplier = 1.75;

  private constructor(
    private readonly name: string,
    private readonly duration: number,
    private readonly ticks: number,
    private readonly stringRepresentation: string
  ) {
    Duration.all.push(this);
  }

  public static readonly Double: Duration = new Duration(
    'Double',
    Durations.Double,
    Ticks.Double,
    '2'
  );

  public static readonly Whole: Duration = new Duration('Whole', Durations.Whole, Ticks.Whole, '1');

  public static readonly Half: Duration = new Duration('Half', Durations.Half, Ticks.Half, '1/2');

  public static readonly Quarter: Duration = new Duration(
    'Quarter',
    Durations.Quarter,
    Ticks.Quarter,
    '1/4'
  );

  public static readonly Eighth: Duration = new Duration(
    'Eighth',
    Durations.Eighth,
    Ticks.Eighth,
    '1/8'
  );

  public static readonly Sixteenth: Duration = new Duration(
    'Sixteenth',
    Durations.Sixteenth,
    Ticks.Sixteenth,
    '1/16'
  );

  public static readonly ThirtySecond: Duration = new Duration(
    'ThirtySecond',
    Durations.ThirtySecond,
    Ticks.ThirtySecond,
    '1/32'
  );

  public static readonly SixtyFourth: Duration = new Duration(
    'SixtyFourth',
    Durations.SixtyFourth,
    Ticks.SixtyFourth,
    '1/64'
  );

  public static readonly DoubleDottedHalf: Duration = new Duration(
    'Double Dotted Half',
    Duration.Half.duration * this.doubleDotMultiplier,
    Duration.Half.tick * this.doubleDotMultiplier,
    Duration.Half.toString() + '3/4'
  );

  public static readonly DottedHalf: Duration = new Duration(
    'Dotted Half',
    Duration.Half.duration * this.dotMultiplier,
    Duration.Half.tick * this.dotMultiplier,
    ''
  );

  public static readonly TripletWhole: Duration = new Duration(
    'Triplet Whole',
    Duration.Double.duration / 3,
    Duration.Double.tick / 3,
    ''
  );

  public static readonly DoubleDottedQuarter: Duration = new Duration(
    'Double Dotted Quarter',
    Duration.Quarter.duration * this.doubleDotMultiplier,
    ticksPerQuarterNote * this.doubleDotMultiplier,
    Duration.Quarter.toString() + '3/4'
  );

  public static readonly DottedQuarter: Duration = new Duration(
    'Dotted Quarter',
    Duration.Quarter.duration * this.dotMultiplier,
    ticksPerQuarterNote * this.dotMultiplier,
    Duration.Quarter.toString() + '1/2'
  );

  public static readonly TripletHalf: Duration = new Duration(
    'Triplet Half',
    Duration.Whole.duration * 3,
    Duration.Whole.tick / 3,
    ''
  );

  public static readonly DoubleDottedEighth: Duration = new Duration(
    'Double Dotted Quarter',
    Duration.Eighth.duration * this.doubleDotMultiplier,
    Duration.Eighth.tick * this.doubleDotMultiplier,
    Duration.Eighth.toString() + '3/4'
  );

  public static readonly DottedEighth: Duration = new Duration(
    'Dotted Quarter',
    Duration.Eighth.duration * this.dotMultiplier,
    Duration.Eighth.tick * this.dotMultiplier,
    Duration.Eighth.toString() + '1/2'
  );

  public static readonly TripletQuarterNote: Duration = new Duration(
    'Triplet Quarter',
    Duration.Half.duration / 3,
    Duration.Half.tick / 3,
    ''
  );

  public static readonly DoubleDottedSixteenth: Duration = new Duration(
    'Double Dotted Sixteenth',
    Duration.Sixteenth.duration * this.doubleDotMultiplier,
    Duration.Sixteenth.tick * this.doubleDotMultiplier,
    Duration.Sixteenth.toString() + '3/4'
  );

  public static readonly DottedSixteenth: Duration = new Duration(
    'Dotted Sixteenth',
    Duration.Sixteenth.duration * this.dotMultiplier,
    Duration.Sixteenth.tick * this.dotMultiplier,
    Duration.Sixteenth.toString() + '1/2'
  );

  public static readonly TripletEighth: Duration = new Duration(
    'Triplet Eighth',
    Duration.Quarter.duration / 3,
    ticksPerQuarterNote / 3,
    ''
  );

  public static readonly DoubleDottedThirtySecond: Duration = new Duration(
    'Double Dotted ThirtySecond',
    Duration.ThirtySecond.duration * this.doubleDotMultiplier,
    Duration.ThirtySecond.tick * this.doubleDotMultiplier,
    Duration.ThirtySecond.toString() + '3/4'
  );

  public static readonly DottedThirtySecond: Duration = new Duration(
    'Dotted ThirtySecond',
    Duration.ThirtySecond.duration * this.dotMultiplier,
    Duration.ThirtySecond.tick * this.dotMultiplier,
    Duration.ThirtySecond.toString() + '1/2'
  );

  public static readonly TripletSixteenth: Duration = new Duration(
    'Triplet Sixteenth',
    Duration.Eighth.duration / 3,
    this.Eighth.tick / 3,
    ''
  );

  public static readonly DottedSixtyFourth: Duration = new Duration(
    'Dotted SixtyFourth',
    Duration.SixtyFourth.duration * this.dotMultiplier,
    Duration.SixtyFourth.tick * this.dotMultiplier,
    Duration.SixtyFourth.toString() + '1/2'
  );

  public static readonly TripletThirtySecond: Duration = new Duration(
    'Triplet ThirtySecond',
    Duration.Sixteenth.duration / 3,
    Duration.Sixteenth.tick / 3,
    ''
  );

  get Name() {
    return this.name;
  }

  get value() {
    return this.duration;
  }

  get tick() {
    return this.ticks;
  }

  static get tickPerQuarterNote() {
    return ticksPerQuarterNote;
  }

  static From(value: number): Duration | undefined {
    return Duration.durations.find((d) => d.value === value);
  }

  get To(): DurationPrimitives {
    return {
      name: this.name,
      value: this.duration,
      fraction: this.stringRepresentation,
    };
  }

  static get durations() {
    return Duration.all;
  }

  toString() {
    return this.stringRepresentation;
  }
}

export class BeatsPerMinute {
  constructor(
    private bpm: number,
    private duration: Duration = Duration.Quarter
  ) {}

  get beatsPerMinute(): number {
    return this.bpm;
  }

  minutes(beats = 1): number {
    return beats / this.bpm;
  }

  seconds(beats = 1): number {
    return (beats / this.bpm) * 60;
  }

  miliSeconds(beats = 1): number {
    return (beats / this.bpm) * 60 * 1000;
  }

  secondsFor(duration: Duration): number {
    const durationToBeats = duration.value / this.duration.value;

    return (durationToBeats / this.bpm) * 60;
  }

  miliSecondsFor(duration: Duration): number {
    const durationToBeats = duration.value / this.duration.value;

    return (durationToBeats / this.bpm) * 60 * 1000;
  }
}
