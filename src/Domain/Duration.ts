export interface TimeSignature {
  get beatDuration(): number;
  get beatValue(): number;
  toBeats(duration: Duration): number;
  toFillMeasure(duration: Duration): number;
}

export class SimpleTimeSignature implements TimeSignature {
  constructor(private readonly beats: number, private readonly duration: Duration) {}

  get beatDuration(): number {
    return this.duration.value / this.beats;
  }

  get beatValue(): number {
    return this.duration.value;
  }

  toBeats(duration: Duration = this.duration): number {
    return duration.value / this.beatDuration / this.beats;
  }

  toFillMeasure(duration: Duration = this.duration): number {
    return (this.beatValue / duration.value) * this.beats;
  }
}

export class CompoundTimeSignature implements TimeSignature {
  constructor(private readonly beats: number, private readonly duration: Duration) {}

  get beatDuration(): number {
    return (this.duration.value * 3) / this.beats;
  }

  get beatValue(): number {
    return this.duration.value * 3;
  }

  toBeats(duration: Duration = this.duration): number {
    return (duration.value * 3) / this.beatDuration / this.beats;
  }

  toFillMeasure(duration: Duration = this.duration): number {
    return (this.beatValue / duration.value) * (this.beats / 3) - this.beatValue;
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
export class Duration implements RhythmicDuration {
  private static readonly all: Duration[] = [];

  private constructor(private readonly name: string, private readonly duration: number) {
    Duration.all.push(this);
  }

  public static readonly Double: Duration = new Duration('Double', 2.0 / 1.0);
  public static readonly Whole: Duration = new Duration('Whole', 1.0);
  public static readonly Half: Duration = new Duration('Half', 1.0 / 2.0);
  public static readonly Quarter: Duration = new Duration('Quarter', 1.0 / 4.0);
  public static readonly Eighth: Duration = new Duration('Eighth', 1.0 / 8.0);
  public static readonly Sixteenth: Duration = new Duration('Sixteenth', 1.0 / 16.0);
  public static readonly ThirtySecond: Duration = new Duration('ThirtySecond', 1.0 / 32.0);
  public static readonly SixtyFourth: Duration = new Duration('SixtyFourth', 1.0 / 64.0);
  public static readonly HundredTwentyEighth: Duration = new Duration(
    'HundredTwentyEighth',
    1.0 / 128.0
  );
  public static readonly TwoHundredFiftySixth: Duration = new Duration(
    'TwoHundredFiftySixth',
    1.0 / 256.0
  );

  toBeats(timeSignature: TimeSignature): number {
    return timeSignature.toBeats(this);
  }

  toFillMeasure(timeSignature: TimeSignature, measure?: Measure): number {
    if (measure === undefined) return timeSignature.toFillMeasure(this);

    const needsBeats = this.toBeats(timeSignature);
    const usedBeats = measure.usedBeats();

    if (usedBeats >= measure.maxBeats() || needsBeats > usedBeats) return 0;

    return Math.max(
      0,
      this.toFillMeasure(timeSignature) - this.usedBeatsInInstanceDuration(timeSignature, usedBeats)
    );
  }

  get value() {
    return this.duration;
  }

  static From(value: number): Duration | undefined {
    return Duration.durations.find((d) => d.value === value);
  }

  private usedBeatsInInstanceDuration(timeSignature: TimeSignature, usedBeats: number): number {
    return usedBeats / this.toBeats(timeSignature);
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

// export class DottedDuration implements RhythmicDuration {
//   protected baseDuration: RhythmicDuration;

//   constructor(duration: Duration) {
//     this.baseDuration = duration;
//   }

//   toBeats(timeSignature: SimpleTimeSignature): number {
//     return 0;
//   }

//   toFillMeasure(timeSignature: SimpleTimeSignature, measure?: Measure): number {
//     return 0;
//   }

//   get value(): number {
//     return 0;
//   }
// }

export class RhythmicPhrase {
  private readonly phrase: Duration[] = [];

  beats(timeSignature: SimpleTimeSignature): number {
    return this.phrase.reduce((acc, d) => acc + d.toBeats(timeSignature), 0);
  }

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

  usedBeats(): number {
    return this.phrase.beats(this.timeSignature);
  }
}
