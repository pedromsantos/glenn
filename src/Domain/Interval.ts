export type IntervalPrimitives = {
  name: string;
  abreviature: string;
  distance: number;
  quality: string;
};

export class IntervalQuality {
  private static readonly all: IntervalQuality[] = [];

  private constructor(private readonly name: string) {
    IntervalQuality.all.push(this);
  }

  get Name(): string {
    return this.name;
  }

  public static readonly Minor: IntervalQuality = new IntervalQuality('Minor');
  public static readonly Major: IntervalQuality = new IntervalQuality('Major');
  public static readonly Augmented: IntervalQuality = new IntervalQuality('Augmented');
  public static readonly Diminished: IntervalQuality = new IntervalQuality('Diminished');
  public static readonly Perfect: IntervalQuality = new IntervalQuality('Perfect');
}

export class Interval {
  private static readonly all: Interval[] = [];

  private constructor(
    private readonly name: string,
    private readonly abreviature: string,
    private readonly distance: number,
    private readonly quality: IntervalQuality,
    public invert: () => Interval,
    public raiseOctave: () => Interval
  ) {
    Interval.all.push(this);
  }

  get To(): IntervalPrimitives {
    return {
      name: this.name,
      abreviature: this.abreviature,
      distance: this.distance,
      quality: this.quality.Name,
    };
  }

  public static readonly Unison: Interval = new Interval(
    'Unisson',
    'U',
    0,
    IntervalQuality.Perfect,
    () => Interval.PerfectOctave,
    () => Interval.PerfectOctave
  );

  public static readonly DiminishedUnison: Interval = new Interval(
    'Diminished Unison',
    'd1',
    -1,
    IntervalQuality.Diminished,
    () => Interval.AugmentedUnison,
    () => Interval.DiminishedUnison
  );

  public static readonly AugmentedUnison: Interval = new Interval(
    'Augmented Unison',
    'A1',
    1,
    IntervalQuality.Augmented,
    () => Interval.DiminishedUnison,
    () => Interval.AugmentedUnison
  );

  public static readonly MinorSecond: Interval = new Interval(
    'Minor Second',
    'm2',
    1,
    IntervalQuality.Minor,
    () => Interval.MajorSeventh,
    () => Interval.MinorNinth
  );

  public static readonly MajorSecond: Interval = new Interval(
    'Major Second',
    'M2',
    2,
    IntervalQuality.Major,
    () => Interval.MinorSeventh,
    () => Interval.MajorNinth
  );

  public static readonly AugmentedSecond: Interval = new Interval(
    'Augmented Second',
    'A2',
    3,
    IntervalQuality.Augmented,
    () => Interval.DiminishedSeventh,
    () => Interval.AugmentedNinth
  );

  public static readonly MinorThird: Interval = new Interval(
    'Minor Third',
    'm3',
    3,
    IntervalQuality.Minor,
    () => Interval.MajorSixth,
    () => Interval.MinorThird
  );

  public static readonly MajorThird: Interval = new Interval(
    'Major Third',
    'M3',
    4,
    IntervalQuality.Major,
    () => Interval.MinorSixth,
    () => Interval.MajorThird
  );

  public static readonly PerfectFourth: Interval = new Interval(
    'Perfect Fourth',
    'P4',
    5,
    IntervalQuality.Perfect,
    () => Interval.PerfectFifth,
    () => Interval.PerfectEleventh
  );

  public static readonly AugmentedFourth: Interval = new Interval(
    'Augmented Fourth',
    'A4',
    6,
    IntervalQuality.Augmented,
    () => Interval.DiminishedFifth,
    () => Interval.AugmentedEleventh
  );

  public static readonly DiminishedFifth: Interval = new Interval(
    'Diminished Fifth',
    'd5',
    6,
    IntervalQuality.Diminished,
    () => Interval.AugmentedFourth,
    () => Interval.DiminishedFifth
  );

  public static readonly Tritone: Interval = new Interval(
    'Diminished Fifth',
    'd5',
    6,
    IntervalQuality.Diminished,
    () => Interval.AugmentedFourth,
    () => Interval.Tritone
  );

  public static readonly PerfectFifth: Interval = new Interval(
    'Perfect Fifth',
    'P5',
    7,
    IntervalQuality.Perfect,
    () => Interval.PerfectFourth,
    () => Interval.PerfectFifth
  );

  public static readonly AugmentedFifth: Interval = new Interval(
    'Augmented Fifth',
    'A5',
    8,
    IntervalQuality.Augmented,
    () => Interval.AugmentedFourth,
    () => Interval.AugmentedFifth
  );

  public static readonly MinorSixth: Interval = new Interval(
    'Minor Sixth',
    'm6',
    8,
    IntervalQuality.Minor,
    () => Interval.MajorThird,
    () => Interval.MinorThirteenth
  );

  public static readonly MajorSixth: Interval = new Interval(
    'Major Sixth',
    'M6',
    9,
    IntervalQuality.Major,
    () => Interval.MinorThird,
    () => Interval.MajorThirteenth
  );

  public static readonly DiminishedSeventh: Interval = new Interval(
    'Diminished Seventh',
    'd7',
    9,
    IntervalQuality.Diminished,
    () => Interval.AugmentedSecond,
    () => Interval.DiminishedSeventh
  );

  public static readonly MinorSeventh: Interval = new Interval(
    'Minor Seventh',
    'm7',
    10,
    IntervalQuality.Minor,
    () => Interval.MajorSecond,
    () => Interval.MinorSeventh
  );

  public static readonly MajorSeventh: Interval = new Interval(
    'Major Seventh',
    'M7',
    11,
    IntervalQuality.Major,
    () => Interval.MinorSecond,
    () => Interval.MajorSeventh
  );

  public static readonly PerfectOctave: Interval = new Interval(
    'Perfect Octave',
    'PO',
    12,
    IntervalQuality.Perfect,
    () => Interval.Unison,
    () => Interval.PerfectOctave
  );

  public static readonly DiminishedNinth: Interval = new Interval(
    'Diminished Ninth',
    'd9',
    13,
    IntervalQuality.Minor,
    () => Interval.AugmentedUnison,
    () => Interval.DiminishedNinth
  );

  public static readonly MinorNinth: Interval = new Interval(
    'Minor Ninth',
    'm9',
    13,
    IntervalQuality.Minor,
    () => Interval.MajorSeventh,
    () => Interval.MinorNinth
  );

  public static readonly MajorNinth: Interval = new Interval(
    'Major Ninth',
    'M9',
    14,
    IntervalQuality.Major,
    () => Interval.MinorSeventh,
    () => Interval.MajorNinth
  );

  public static readonly AugmentedNinth: Interval = new Interval(
    'Augmented Ninth',
    'A9',
    15,
    IntervalQuality.Augmented,
    () => Interval.DiminishedUnison,
    () => Interval.AugmentedNinth
  );

  public static readonly PerfectEleventh: Interval = new Interval(
    'Perfect Eleventh',
    'P11',
    17,
    IntervalQuality.Perfect,
    () => Interval.PerfectFifth,
    () => Interval.PerfectEleventh
  );

  public static readonly AugmentedEleventh: Interval = new Interval(
    'Augmented Eleventh',
    'A11',
    18,
    IntervalQuality.Augmented,
    () => Interval.DiminishedFifth,
    () => Interval.AugmentedEleventh
  );

  public static readonly MinorThirteenth: Interval = new Interval(
    'Minor Thirteenth',
    'm13',
    20,
    IntervalQuality.Minor,
    () => Interval.MajorThird,
    () => Interval.MinorThirteenth
  );

  public static readonly MajorThirteenth: Interval = new Interval(
    'Major Thirteenth',
    'M13',
    21,
    IntervalQuality.Major,
    () => Interval.MinorThird,
    () => Interval.MajorThirteenth
  );

  isLargarThan(reference: Interval): boolean {
    return this.distance > reference.distance;
  }

  public static get intervals(): Interval[] {
    return Interval.all;
  }

  public static get unique(): Interval[] {
    return Interval.all.filter(
      (i) =>
        i.distance <= 12 &&
        (i.quality === IntervalQuality.Perfect ||
          i.quality === IntervalQuality.Minor ||
          i.quality === IntervalQuality.Major)
    );
  }
}

export const enum IntervalDirection {
  Ascending,
  Descending,
  Level,
}
