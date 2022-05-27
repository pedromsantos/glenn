// Stryker disable StringLiteral
export default class Interval {
  private constructor(
    private readonly name: string,
    private readonly abreviature: string,
    private readonly distance: number,
    public invert: () => Interval
  ) {}

  public static readonly Unison: Interval = new Interval(
    'Unisson',
    'U',
    0,
    () => Interval.PerfectOctave
  );

  public static readonly AugmentedUnison: Interval = new Interval(
    'Augmented Unison',
    'A1',
    1,
    () => Interval.AugmentedUnison
  );
  public static readonly MinorSecond: Interval = new Interval(
    'Minor Second',
    'm2',
    1,
    () => Interval.MajorSeventh
  );
  public static readonly MajorSecond: Interval = new Interval(
    'Major Second',
    'M2',
    2,
    () => Interval.MinorSeventh
  );
  public static readonly AugmentedSecond: Interval = new Interval(
    'Augmented Second',
    'A2',
    3,
    () => Interval.DiminishedSeventh
  );
  public static readonly MinorThird: Interval = new Interval(
    'Minor Third',
    'm3',
    3,
    () => Interval.MajorSixth
  );
  public static readonly MajorThird: Interval = new Interval(
    'Major Third',
    'M3',
    4,
    () => Interval.MinorSixth
  );
  public static readonly PerfectFourth: Interval = new Interval(
    'Perfect Fourth',
    'P4',
    5,
    () => Interval.PerfectFifth
  );
  public static readonly AugmentedFourth: Interval = new Interval(
    'Augmented Fourth',
    'A4',
    6,
    () => Interval.DiminishedFifth
  );
  public static readonly DiminishedFifth: Interval = new Interval(
    'Diminished Fifth',
    'd5',
    6,
    () => Interval.AugmentedFourth
  );
  public static readonly Tritone: Interval = new Interval(
    'Diminished Fifth',
    'd5',
    6,
    () => Interval.AugmentedFourth
  );
  public static readonly PerfectFifth: Interval = new Interval(
    'Perfect Fifth',
    'P5',
    7,
    () => Interval.PerfectFourth
  );
  public static readonly AugmentedFifth: Interval = new Interval(
    'Augmented Fifth',
    'A5',
    8,
    () => Interval.AugmentedFourth
  );
  public static readonly MinorSixth: Interval = new Interval(
    'Minor Sixth',
    'm6',
    8,
    () => Interval.MajorThird
  );
  public static readonly MajorSixth: Interval = new Interval(
    'Major Sixth',
    'M6',
    9,
    () => Interval.MinorThird
  );
  public static readonly DiminishedSeventh: Interval = new Interval(
    'Diminished Seventh',
    'd7',
    9,
    () => Interval.AugmentedSecond
  );
  public static readonly MinorSeventh: Interval = new Interval(
    'Minor Seventh',
    'm7',
    10,
    () => Interval.MajorSecond
  );
  public static readonly MajorSeventh: Interval = new Interval(
    'Major Seventh',
    'M7',
    11,
    () => Interval.MinorSecond
  );
  public static readonly PerfectOctave: Interval = new Interval(
    'Perfect Octave',
    'PO',
    12,
    () => Interval.Unison
  );
  public static readonly MinorNinth: Interval = new Interval(
    'Minor Ninth',
    'm9',
    13,
    () => Interval.MajorSeventh
  );
  public static readonly MajorNinth: Interval = new Interval(
    'Major Ninth',
    'M9',
    14,
    () => Interval.MinorSeventh
  );
  public static readonly AugmentedNinth: Interval = new Interval(
    'Augmented Ninth',
    'A9',
    15,
    () => Interval.DiminishedSeventh
  );
  public static readonly PerfectEleventh: Interval = new Interval(
    'Perfect Eleventh',
    'P11',
    17,
    () => Interval.PerfectFifth
  );
  public static readonly AugmentedEleventh: Interval = new Interval(
    'Augmented Eleventh',
    'A11',
    18,
    () => Interval.DiminishedFifth
  );
  public static readonly MinorThirteenth: Interval = new Interval(
    'Minor Thirteenth',
    'm13',
    20,
    () => Interval.MajorThird
  );
  public static readonly MajorThirteenth: Interval = new Interval(
    'Major Thirteenth',
    'M13',
    21,
    () => Interval.MinorThird
  );

  public static readonly intervals = [
    Interval.Unison,
    Interval.AugmentedUnison,
    Interval.MinorSecond,
    Interval.MajorSecond,
    Interval.AugmentedSecond,
    Interval.MinorThird,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.AugmentedFourth,
    Interval.DiminishedFifth,
    Interval.Tritone,
    Interval.PerfectFifth,
    Interval.AugmentedFifth,
    Interval.MinorSixth,
    Interval.MajorSixth,
    Interval.DiminishedSeventh,
    Interval.MinorSeventh,
    Interval.MajorSeventh,
    Interval.PerfectOctave,
    Interval.MinorNinth,
    Interval.MajorNinth,
    Interval.AugmentedNinth,
    Interval.PerfectEleventh,
    Interval.AugmentedEleventh,
    Interval.MinorThirteenth,
    Interval.MajorThirteenth,
  ];
}
