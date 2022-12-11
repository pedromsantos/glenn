export interface TimeSignature {
  get beatDuration(): number;
  get beatValue(): number;
  get beatDurationMiliseconds(): number;
  get beatDurationTicks(): number;
  get milisecondsPerMeasure(): number;
  get ticksPerSecond(): number;
  toFillMeasure(duration: Duration): number;
  milisecondsFor(duration: Duration): number;
}

export class SimpleTimeSignature implements TimeSignature {
  private bpm: BeatsPerMinute = new BeatsPerMinute(60, Duration.Quarter);

  constructor(private readonly beats: number, private readonly duration: Duration, bpm = 60) {
    this.bpm = new BeatsPerMinute(bpm, duration);
  }

  get beatDurationMiliseconds(): number {
    return this.bpm.miliSeconds();
  }

  get beatDurationTicks(): number {
    return this.duration.tick;
  }

  get beatDuration(): number {
    return this.duration.value / this.beats;
  }

  get beatValue(): number {
    return this.duration.value;
  }

  get milisecondsPerMeasure(): number {
    return this.beatDurationMiliseconds * this.beats;
  }

  get ticksPerSecond(): number {
    return (this.bpm.beatsPerMinute * Duration.tickPerQuarterNote) / 60;
  }

  toFillMeasure(duration: Duration = this.duration): number {
    return (this.beatDurationTicks / duration.tick) * this.beats;
  }

  milisecondsFor(duration: Duration = this.duration): number {
    return this.bpm.miliSecondsFor(duration);
  }
}

export class CompoundTimeSignature implements TimeSignature {
  private beats = 0;
  private bpm: BeatsPerMinute = new BeatsPerMinute(60, Duration.Quarter);

  constructor(pulses: number, private readonly duration: Duration, bpm = 60) {
    this.beats = pulses / 3;
    this.bpm = new BeatsPerMinute(bpm, this.duration);
  }

  get beatDuration(): number {
    return this.beatValue;
  }

  get beatValue(): number {
    return this.duration.value * 3;
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

  get ticksPerSecond(): number {
    return (this.bpm.beatsPerMinute * Duration.tickPerQuarterNote) / 60;
  }

  toFillMeasure(duration: Duration = this.duration): number {
    return (this.beatDurationTicks / duration.tick) * this.beats;
  }

  milisecondsFor(duration: Duration = this.duration): number {
    return this.bpm.miliSecondsFor(duration);
  }
}

export interface RhythmicDuration {
  toBeats(timeSignature: SimpleTimeSignature): number;
  toFillMeasure(timeSignature: SimpleTimeSignature, measure?: Measure): number;
  get value(): number;
}

export type DurationPrimitives = {
  name: string;
  duration: number;
};

// Stryker disable StringLiteral
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
    this.ticksPerQuarterNote * 4
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
    Duration.Half.duration * 1.75,
    this.ticksPerQuarterNote * 2 * this.doubleDotMultiplier
  );
  public static readonly DottedHalf: Duration = new Duration(
    'Dotted Half',
    Duration.Half.duration * this.dotMultiplier,
    this.ticksPerQuarterNote * 2 * this.dotMultiplier
  );
  public static readonly TripletWhole: Duration = new Duration(
    'Triplet Whole',
    Duration.Double.duration / 3,
    (this.ticksPerQuarterNote * 8) / 3
  );
  public static readonly DoubleDottedQuarter: Duration = new Duration(
    'Double Dotted Quarter',
    Duration.Quarter.duration * 1.75,
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
    (this.ticksPerQuarterNote * 4) / 3
  );
  public static readonly DoubleDottedEighth: Duration = new Duration(
    'Double Dotted Quarter',
    Duration.Eighth.duration * 1.75,
    (this.ticksPerQuarterNote / 2) * this.doubleDotMultiplier
  );
  public static readonly DottedEighth: Duration = new Duration(
    'Dotted Quarter',
    Duration.Eighth.duration * this.dotMultiplier,
    (this.ticksPerQuarterNote / 2) * this.dotMultiplier
  );
  public static readonly TripletQuarterNote: Duration = new Duration(
    'Triplet Quarter',
    Duration.Half.duration / 3,
    (this.ticksPerQuarterNote * 2) / 3
  );
  public static readonly DoubleDottedSixteenth: Duration = new Duration(
    'Double Dotted Sixteenth',
    Duration.Sixteenth.duration * 1.75,
    (this.ticksPerQuarterNote / 4) * this.doubleDotMultiplier
  );
  public static readonly DottedSixteenth: Duration = new Duration(
    'Dotted Sixteenth',
    Duration.Sixteenth.duration * this.dotMultiplier,
    (this.ticksPerQuarterNote / 4) * this.dotMultiplier
  );
  public static readonly TripletEighth: Duration = new Duration(
    'Triplet Eighth',
    Duration.Quarter.duration / 3,
    this.ticksPerQuarterNote / 3
  );
  public static readonly DoubleDottedThirtySecond: Duration = new Duration(
    'Double Dotted ThirtySecond',
    Duration.ThirtySecond.duration * 1.75,
    (this.ticksPerQuarterNote / 8) * this.doubleDotMultiplier
  );
  public static readonly DottedThirtySecond: Duration = new Duration(
    'Dotted ThirtySecond',
    Duration.ThirtySecond.duration * this.dotMultiplier,
    (this.ticksPerQuarterNote / 8) * this.dotMultiplier
  );
  public static readonly TripletSixteenth: Duration = new Duration(
    'Triplet Sixteenth',
    Duration.Eighth.duration / 3,
    this.ticksPerQuarterNote / 2 / 3
  );
  public static readonly DottedSixtyFourth: Duration = new Duration(
    'Dotted SixtyFourth',
    Duration.SixtyFourth.duration * this.dotMultiplier,
    (this.ticksPerQuarterNote / 16) * this.dotMultiplier
  );
  public static readonly TripletThirtySecond: Duration = new Duration(
    'Triplet ThirtySecond',
    Duration.Sixteenth.duration / 3,
    this.ticksPerQuarterNote / 4 / 3
  );

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

export class RhythmicPhrase {
  private readonly phrase: Duration[] = [];

  push(duration: Duration): void {
    this.phrase.push(duration);
  }
}

export class Measure {
  private readonly phrase: RhythmicPhrase;
  private readonly timeSignature: SimpleTimeSignature;

  constructor(timeSignature: SimpleTimeSignature) {
    this.phrase = new RhythmicPhrase();
    this.timeSignature = timeSignature;
  }

  maxBeats(): number {
    return this.timeSignature.toFillMeasure();
  }

  add(duration: Duration) {
    this.phrase.push(duration);
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
