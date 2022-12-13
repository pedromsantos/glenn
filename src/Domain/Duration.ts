abstract class TimeSignature {
  private bpm: BeatsPerMinute = new BeatsPerMinute(60, Duration.Quarter);

  protected constructor(
    protected readonly beats: number,
    protected readonly duration: Duration,
    bpm = 60
  ) {
    this.bpm = new BeatsPerMinute(bpm, duration);
  }

  get beatDuration(): number {
    return this.beatValue;
  }

  abstract get beatValue(): number;

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

  milisecondsFor(duration: Duration = this.duration): number {
    return this.bpm.miliSecondsFor(duration);
  }
}

export class SimpleTimeSignature extends TimeSignature {
  constructor(beats: number, duration: Duration, bpm = 60) {
    super(beats, duration, bpm);
  }

  override get beatValue(): number {
    return this.duration.value;
  }

  override toFillMeasure(duration: Duration = this.duration): number {
    return (this.beatDurationTicks / duration.tick) * this.beats;
  }
}

export class CompoundTimeSignature extends TimeSignature {
  constructor(pulses: number, duration: Duration, bpm = 60) {
    if (pulses % 3 !== 0) {
      throw new RangeError('Compond signatures pulse must be divisible by 3');
    }

    super(pulses / 3, duration, bpm);
  }

  override get beatValue(): number {
    return this.duration.value * 3;
  }

  override toFillMeasure(duration: Duration = this.duration): number {
    return (this.beatDurationTicks / duration.tick) * this.beats * 3;
  }
}

export type DurationPrimitives = {
  name: string;
  duration: number;
};

export class Duration {
  private static readonly all: Duration[] = [];
  private static readonly ticksPerQuarterNote = 480;
  private static readonly dotMultiplier = 1.5;
  private static readonly doubleDotMultiplier = 1.75;

  private constructor(
    private readonly name: string,
    private readonly duration: number,
    private readonly ticks: number
  ) {
    Duration.all.push(this);
  }

  public static readonly Double: Duration = new Duration(
    'Double',
    2.0 / 1.0,
    this.ticksPerQuarterNote * 8
  );
  public static readonly Whole: Duration = new Duration('Whole', 1.0, this.ticksPerQuarterNote * 4);
  public static readonly Half: Duration = new Duration(
    'Half',
    1.0 / 2.0,
    this.ticksPerQuarterNote * 2
  );
  public static readonly Quarter: Duration = new Duration(
    'Quarter',
    1.0 / 4.0,
    this.ticksPerQuarterNote
  );
  public static readonly Eighth: Duration = new Duration(
    'Eighth',
    1.0 / 8.0,
    this.ticksPerQuarterNote / 2
  );
  public static readonly Sixteenth: Duration = new Duration(
    'Sixteenth',
    1.0 / 16.0,
    this.ticksPerQuarterNote / 4
  );
  public static readonly ThirtySecond: Duration = new Duration(
    'ThirtySecond',
    1.0 / 32.0,
    this.ticksPerQuarterNote / 8
  );
  public static readonly SixtyFourth: Duration = new Duration(
    'SixtyFourth',
    1.0 / 64.0,
    this.ticksPerQuarterNote / 16
  );
  public static readonly DoubleDottedHalf: Duration = new Duration(
    'Double Dotted Half',
    Duration.Half.duration * this.dotMultiplier,
    Duration.Half.tick * this.doubleDotMultiplier
  );
  public static readonly DottedHalf: Duration = new Duration(
    'Dotted Half',
    Duration.Half.duration * this.dotMultiplier,
    Duration.Half.tick * this.dotMultiplier
  );
  public static readonly TripletWhole: Duration = new Duration(
    'Triplet Whole',
    Duration.Double.duration / 3,
    Duration.Double.tick / 3
  );
  public static readonly DoubleDottedQuarter: Duration = new Duration(
    'Double Dotted Quarter',
    Duration.Quarter.duration * this.dotMultiplier,
    this.ticksPerQuarterNote * this.doubleDotMultiplier
  );
  public static readonly DottedQuarter: Duration = new Duration(
    'Dotted Quarter',
    Duration.Quarter.duration * this.dotMultiplier,
    this.ticksPerQuarterNote * this.dotMultiplier
  );
  public static readonly TripletHalf: Duration = new Duration(
    'Triplet Half',
    Duration.Whole.duration * 3,
    Duration.Whole.tick / 3
  );
  public static readonly DoubleDottedEighth: Duration = new Duration(
    'Double Dotted Quarter',
    Duration.Eighth.duration * this.dotMultiplier,
    Duration.Eighth.tick * this.doubleDotMultiplier
  );
  public static readonly DottedEighth: Duration = new Duration(
    'Dotted Quarter',
    Duration.Eighth.duration * this.dotMultiplier,
    Duration.Eighth.tick * this.dotMultiplier
  );
  public static readonly TripletQuarterNote: Duration = new Duration(
    'Triplet Quarter',
    Duration.Half.duration / 3,
    Duration.Half.tick / 3
  );
  public static readonly DoubleDottedSixteenth: Duration = new Duration(
    'Double Dotted Sixteenth',
    Duration.Sixteenth.duration * this.dotMultiplier,
    Duration.Sixteenth.tick * this.doubleDotMultiplier
  );
  public static readonly DottedSixteenth: Duration = new Duration(
    'Dotted Sixteenth',
    Duration.Sixteenth.duration * this.dotMultiplier,
    Duration.Sixteenth.tick * this.dotMultiplier
  );
  public static readonly TripletEighth: Duration = new Duration(
    'Triplet Eighth',
    Duration.Quarter.duration / 3,
    this.ticksPerQuarterNote / 3
  );
  public static readonly DoubleDottedThirtySecond: Duration = new Duration(
    'Double Dotted ThirtySecond',
    Duration.ThirtySecond.duration * this.dotMultiplier,
    Duration.ThirtySecond.tick * this.doubleDotMultiplier
  );
  public static readonly DottedThirtySecond: Duration = new Duration(
    'Dotted ThirtySecond',
    Duration.ThirtySecond.duration * this.dotMultiplier,
    Duration.ThirtySecond.tick * this.dotMultiplier
  );
  public static readonly TripletSixteenth: Duration = new Duration(
    'Triplet Sixteenth',
    Duration.Eighth.duration / 3,
    this.Eighth.tick / 3
  );
  public static readonly DottedSixtyFourth: Duration = new Duration(
    'Dotted SixtyFourth',
    Duration.SixtyFourth.duration * this.dotMultiplier,
    Duration.SixtyFourth.tick * this.dotMultiplier
  );
  public static readonly TripletThirtySecond: Duration = new Duration(
    'Triplet ThirtySecond',
    Duration.Sixteenth.duration / 3,
    Duration.Sixteenth.tick / 3
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
    return Duration.ticksPerQuarterNote;
  }

  static From(value: number): Duration | undefined {
    return Duration.durations.find((d) => d.value === value);
  }

  get To(): DurationPrimitives {
    return {
      name: this.name,
      duration: this.duration,
    };
  }

  static get durations() {
    return Duration.all;
  }
}

export class BeatsPerMinute {
  constructor(private bpm: number, private duration: Duration = Duration.Quarter) {}

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

export class RhythmicPhrase {
  private readonly phrase: Duration[] = [];

  push(duration: Duration): void {
    this.phrase.push(duration);
  }

  get ticks(): number {
    return this.phrase.reduce((total, current) => total + current.tick, 0);
  }
}

export class Measure {
  protected phrase: RhythmicPhrase;
  private readonly timeSignature: TimeSignature;

  constructor(timeSignature: TimeSignature) {
    this.phrase = new RhythmicPhrase();
    this.timeSignature = timeSignature;
  }

  add(duration: Duration): Measure {
    if (this.timeSignature.toFillMeasure(duration) < 1) {
      throw new RangeError(`cannot fit -${duration.Name} note in measure`);
    }

    if (this.phrase.ticks + duration.tick > this.timeSignature.ticksPerMeasure) {
      throw new RangeError(`cannot fit -${duration.Name} note in measure`);
    }

    this.phrase.push(duration);

    if (this.phrase.ticks === this.timeSignature.ticksPerMeasure) {
      return new FullMeasure(this.timeSignature, this.phrase);
    }

    return this;
  }
}

export class FullMeasure extends Measure {
  constructor(timeSignature: TimeSignature, phrase: RhythmicPhrase) {
    super(timeSignature);
    this.phrase = phrase;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override add(_: Duration): Measure {
    return this;
  }
}
