export class TimeSignature {
  constructor(private beats: number, private duration: Duration) {}

  get beatDuration(): number {
    return this.duration.value / this.beats;
  }

  get beatValue(): number {
    return this.duration.value;
  }

  toBeats(duration: Duration): number {
    return duration.value / this.beatDuration / this.beats;
  }

  toFillMeasure(duration: Duration): number {
    return (this.beatValue / duration.value) * this.beats;
  }
}

export class Duration {
  constructor(private name: string, private duration: number) {}

  public static readonly Double: Duration = new Duration('Double', 2.0 / 1.0);
  public static readonly Whole: Duration = new Duration('Whole', 1.0 / 1.0);
  public static readonly Half: Duration = new Duration('Half', 1.0 / 2.0);
  public static readonly Quarter: Duration = new Duration('Quarter', 1.0 / 4.0);
  public static readonly Eighth: Duration = new Duration('Eighth', 1.0 / 8.0);
  public static readonly Sixteenth: Duration = new Duration(
    'Sixteenth',
    1.0 / 16.0
  );
  public static readonly ThirtySecond: Duration = new Duration(
    'ThirtySecond',
    1.0 / 32.0
  );
  public static readonly SixtyFourth: Duration = new Duration(
    'SixtyFourth',
    1.0 / 64.0
  );
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

  toFillMeasure(timeSignature: TimeSignature): number {
    return timeSignature.toFillMeasure(this);
  }

  remainingFillMeasure(
    timeSignature: TimeSignature,
    durations: Duration[],
    durationIn: Duration
  ): number {
    return Math.max(
      0,
      timeSignature.toFillMeasure(durationIn) -
        durations.reduce((acc, cur) => acc + cur.toBeats(timeSignature), 0)
    );
  }

  get value() {
    return this.duration;
  }
}
