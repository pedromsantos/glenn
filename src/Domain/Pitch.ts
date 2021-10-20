import Interval from './Interval';

interface IntervalMap {
  key: Interval;
  to: () => Pitch;
}

export default class Pitch {
  constructor(
    private name: string,
    private value: Number,
    public sharp: () => Pitch,
    public flat: () => Pitch,
    public natural: () => Pitch,
    private intervals: () => IntervalMap[]
  ) {}

  absoluteDistance(to: Pitch): Number {
    if (this.value <= to.value) return <any>to.value - <any>this.value;

    return 12 + (<any>to.value - <any>this.value);
  }

  transpose(interval: Interval): Pitch {
    const transposingInterval = this.intervals().find(
      (it) => it.key === interval
    );

    return transposingInterval?.to() || this;
  }

  intervalTo(to: Pitch): Interval {
    const transposingInterval = this.intervals().find((it) => it.to() === to);

    return transposingInterval?.key || Interval.Unison;
  }

  public static readonly C: Pitch = new Pitch(
    'C',
    0,
    () => Pitch.CSharp,
    () => Pitch.B,
    () => Pitch.C,
    () => [
      { key: Interval.Unison, to: () => Pitch.C },
      { key: Interval.AugmentedUnison, to: () => Pitch.CSharp },
      { key: Interval.MinorSecond, to: () => Pitch.DFlat },
      { key: Interval.MajorSecond, to: () => Pitch.D },
      { key: Interval.MinorThird, to: () => Pitch.EFlat },
      { key: Interval.AugmentedSecond, to: () => Pitch.DSharp },
      { key: Interval.MajorThird, to: () => Pitch.E },
      { key: Interval.PerfectFourth, to: () => Pitch.F },
      { key: Interval.AugmentedFourth, to: () => Pitch.FSharp },
      { key: Interval.DiminishedFifth, to: () => Pitch.GFlat },
      { key: Interval.Tritone, to: () => Pitch.GFlat },
      { key: Interval.PerfectFifth, to: () => Pitch.G },
      { key: Interval.AugmentedFifth, to: () => Pitch.GSharp },
      { key: Interval.MinorSixth, to: () => Pitch.AFlat },
      { key: Interval.MajorSixth, to: () => Pitch.A },
      { key: Interval.DiminishedSeventh, to: () => Pitch.A },
      { key: Interval.MinorSeventh, to: () => Pitch.BFlat },
      { key: Interval.MajorSeventh, to: () => Pitch.B },
      { key: Interval.PerfectOctave, to: () => Pitch.C },
      { key: Interval.MinorNinth, to: () => Pitch.DFlat },
      { key: Interval.MajorNinth, to: () => Pitch.D },
      { key: Interval.AugmentedNinth, to: () => Pitch.DSharp },
      { key: Interval.PerfectEleventh, to: () => Pitch.F },
      { key: Interval.AugmentedEleventh, to: () => Pitch.FSharp },
      { key: Interval.MinorThirteenth, to: () => Pitch.AFlat },
      { key: Interval.MajorThirteenth, to: () => Pitch.A },
    ]
  );

  public static readonly CSharp: Pitch = new Pitch(
    'C#',
    1,
    () => Pitch.D,
    () => Pitch.C,
    () => Pitch.C,
    () => Pitch.sharpIntervals(Pitch.C.intervals())
  );

  public static readonly DFlat: Pitch = new Pitch(
    'Db',
    1,
    () => Pitch.D,
    () => Pitch.C,
    () => Pitch.D,
    () => Pitch.flatIntervals(Pitch.D.intervals())
  );

  public static readonly D: Pitch = new Pitch(
    'D',
    2,
    () => Pitch.DSharp,
    () => Pitch.DFlat,
    () => Pitch.D,
    () => [
      { key: Interval.Unison, to: () => Pitch.D },
      { key: Interval.AugmentedUnison, to: () => Pitch.DSharp },
      { key: Interval.MinorSecond, to: () => Pitch.EFlat },
      { key: Interval.MajorSecond, to: () => Pitch.E },
      { key: Interval.MinorThird, to: () => Pitch.F },
      { key: Interval.AugmentedSecond, to: () => Pitch.ESharp },
      { key: Interval.MajorThird, to: () => Pitch.FSharp },
      { key: Interval.PerfectFourth, to: () => Pitch.G },
      { key: Interval.AugmentedFourth, to: () => Pitch.GSharp },
      { key: Interval.DiminishedFifth, to: () => Pitch.AFlat },
      { key: Interval.Tritone, to: () => Pitch.AFlat },
      { key: Interval.PerfectFifth, to: () => Pitch.A },
      { key: Interval.AugmentedFifth, to: () => Pitch.ASharp },
      { key: Interval.MinorSixth, to: () => Pitch.BFlat },
      { key: Interval.MajorSixth, to: () => Pitch.B },
      { key: Interval.DiminishedSeventh, to: () => Pitch.B },
      { key: Interval.MinorSeventh, to: () => Pitch.C },
      { key: Interval.MajorSeventh, to: () => Pitch.CSharp },
      { key: Interval.PerfectOctave, to: () => Pitch.D },
      { key: Interval.MinorNinth, to: () => Pitch.EFlat },
      { key: Interval.MajorNinth, to: () => Pitch.E },
      { key: Interval.AugmentedNinth, to: () => Pitch.ESharp },
      { key: Interval.PerfectEleventh, to: () => Pitch.G },
      { key: Interval.AugmentedEleventh, to: () => Pitch.GSharp },
      { key: Interval.MinorThirteenth, to: () => Pitch.BFlat },
      { key: Interval.MajorThirteenth, to: () => Pitch.B },
    ]
  );

  public static readonly DSharp: Pitch = new Pitch(
    'D#',
    3,
    () => Pitch.E,
    () => Pitch.D,
    () => Pitch.D,
    () => Pitch.sharpIntervals(Pitch.D.intervals())
  );

  public static readonly EFlat: Pitch = new Pitch(
    'Eb',
    3,
    () => Pitch.E,
    () => Pitch.D,
    () => Pitch.E,
    () => Pitch.flatIntervals(Pitch.E.intervals())
  );

  public static readonly E: Pitch = new Pitch(
    'E',
    4,
    () => Pitch.F,
    () => Pitch.EFlat,
    () => Pitch.E,
    () => [
      { key: Interval.Unison, to: () => Pitch.E },
      { key: Interval.AugmentedUnison, to: () => Pitch.ESharp },
      { key: Interval.MinorSecond, to: () => Pitch.F },
      { key: Interval.MajorSecond, to: () => Pitch.FSharp },
      { key: Interval.MinorThird, to: () => Pitch.G },
      { key: Interval.AugmentedSecond, to: () => Pitch.G },
      { key: Interval.MajorThird, to: () => Pitch.GSharp },
      { key: Interval.PerfectFourth, to: () => Pitch.A },
      { key: Interval.AugmentedFourth, to: () => Pitch.ASharp },
      { key: Interval.DiminishedFifth, to: () => Pitch.BFlat },
      { key: Interval.Tritone, to: () => Pitch.BFlat },
      { key: Interval.PerfectFifth, to: () => Pitch.B },
      { key: Interval.AugmentedFifth, to: () => Pitch.BSharp },
      { key: Interval.MajorSixth, to: () => Pitch.CSharp },
      { key: Interval.DiminishedSeventh, to: () => Pitch.CSharp },
      { key: Interval.MinorSeventh, to: () => Pitch.D },
      { key: Interval.MajorSeventh, to: () => Pitch.DSharp },
      { key: Interval.PerfectOctave, to: () => Pitch.E },
      { key: Interval.MinorNinth, to: () => Pitch.F },
      { key: Interval.MajorNinth, to: () => Pitch.FSharp },
      { key: Interval.AugmentedNinth, to: () => Pitch.G },
      { key: Interval.PerfectEleventh, to: () => Pitch.A },
      { key: Interval.AugmentedEleventh, to: () => Pitch.ASharp },
      { key: Interval.MinorThirteenth, to: () => Pitch.C },
      { key: Interval.MajorThirteenth, to: () => Pitch.CSharp },
    ]
  );

  public static readonly F: Pitch = new Pitch(
    'F',
    5,
    () => Pitch.FSharp,
    () => Pitch.E,
    () => Pitch.F,
    () => [
      { key: Interval.Unison, to: () => Pitch.F },
      { key: Interval.AugmentedUnison, to: () => Pitch.FSharp },
      { key: Interval.MinorSecond, to: () => Pitch.GFlat },
      { key: Interval.MajorSecond, to: () => Pitch.G },
      { key: Interval.MinorThird, to: () => Pitch.AFlat },
      { key: Interval.AugmentedSecond, to: () => Pitch.GSharp },
      { key: Interval.MajorThird, to: () => Pitch.A },
      { key: Interval.PerfectFourth, to: () => Pitch.BFlat },
      { key: Interval.AugmentedFourth, to: () => Pitch.B },
      { key: Interval.DiminishedFifth, to: () => Pitch.CFlat },
      { key: Interval.Tritone, to: () => Pitch.CFlat },
      { key: Interval.PerfectFifth, to: () => Pitch.C },
      { key: Interval.AugmentedFifth, to: () => Pitch.CSharp },
      { key: Interval.MinorSixth, to: () => Pitch.DFlat },
      { key: Interval.MajorSixth, to: () => Pitch.D },
      { key: Interval.DiminishedSeventh, to: () => Pitch.D },
      { key: Interval.MinorSeventh, to: () => Pitch.EFlat },
      { key: Interval.MajorSeventh, to: () => Pitch.E },
      { key: Interval.PerfectOctave, to: () => Pitch.F },
      { key: Interval.MinorNinth, to: () => Pitch.GFlat },
      { key: Interval.MajorNinth, to: () => Pitch.G },
      { key: Interval.AugmentedNinth, to: () => Pitch.GSharp },
      { key: Interval.PerfectEleventh, to: () => Pitch.BFlat },
      { key: Interval.AugmentedEleventh, to: () => Pitch.B },
      { key: Interval.MinorThirteenth, to: () => Pitch.DFlat },
      { key: Interval.MajorThirteenth, to: () => Pitch.D },
    ]
  );

  public static readonly ESharp: Pitch = new Pitch(
    'E#',
    5,
    () => Pitch.F,
    () => Pitch.E,
    () => Pitch.E,
    () => Pitch.sharpIntervals(Pitch.F.intervals())
  );

  public static readonly FSharp: Pitch = new Pitch(
    'F#',
    6,
    () => Pitch.G,
    () => Pitch.F,
    () => Pitch.F,
    () => Pitch.sharpIntervals(Pitch.F.intervals())
  );

  public static readonly GFlat: Pitch = new Pitch(
    'Gb',
    6,
    () => Pitch.G,
    () => Pitch.F,
    () => Pitch.G,
    () => Pitch.flatIntervals(Pitch.G.intervals())
  );

  public static readonly G: Pitch = new Pitch(
    'G',
    7,
    () => Pitch.GSharp,
    () => Pitch.GFlat,
    () => Pitch.G,
    () => [
      { key: Interval.Unison, to: () => Pitch.G },
      { key: Interval.AugmentedUnison, to: () => Pitch.GSharp },
      { key: Interval.MinorSecond, to: () => Pitch.AFlat },
      { key: Interval.MajorSecond, to: () => Pitch.A },
      { key: Interval.MinorThird, to: () => Pitch.BFlat },
      { key: Interval.AugmentedSecond, to: () => Pitch.ASharp },
      { key: Interval.MajorThird, to: () => Pitch.B },
      { key: Interval.PerfectFourth, to: () => Pitch.C },
      { key: Interval.AugmentedFourth, to: () => Pitch.CSharp },
      { key: Interval.DiminishedFifth, to: () => Pitch.DFlat },
      { key: Interval.Tritone, to: () => Pitch.DFlat },
      { key: Interval.PerfectFifth, to: () => Pitch.D },
      { key: Interval.AugmentedFifth, to: () => Pitch.DSharp },
      { key: Interval.MinorSixth, to: () => Pitch.EFlat },
      { key: Interval.MajorSixth, to: () => Pitch.E },
      { key: Interval.DiminishedSeventh, to: () => Pitch.E },
      { key: Interval.MinorSeventh, to: () => Pitch.F },
      { key: Interval.MajorSeventh, to: () => Pitch.FSharp },
      { key: Interval.PerfectOctave, to: () => Pitch.G },
      { key: Interval.MinorNinth, to: () => Pitch.AFlat },
      { key: Interval.MajorNinth, to: () => Pitch.A },
      { key: Interval.AugmentedNinth, to: () => Pitch.ASharp },
      { key: Interval.PerfectEleventh, to: () => Pitch.C },
      { key: Interval.AugmentedEleventh, to: () => Pitch.CSharp },
      { key: Interval.MinorThirteenth, to: () => Pitch.EFlat },
      { key: Interval.MajorThirteenth, to: () => Pitch.E },
    ]
  );

  public static readonly GSharp: Pitch = new Pitch(
    'G#',
    8,
    () => Pitch.A,
    () => Pitch.G,
    () => Pitch.G,
    () => Pitch.sharpIntervals(Pitch.G.intervals())
  );

  public static readonly AFlat: Pitch = new Pitch(
    'Ab',
    8,
    () => Pitch.A,
    () => Pitch.G,
    () => Pitch.A,
    () => Pitch.flatIntervals(Pitch.A.intervals())
  );

  public static readonly A: Pitch = new Pitch(
    'A',
    9,
    () => Pitch.ASharp,
    () => Pitch.AFlat,
    () => Pitch.A,
    () => [
      { key: Interval.Unison, to: () => Pitch.A },
      { key: Interval.AugmentedUnison, to: () => Pitch.ASharp },
      { key: Interval.MinorSecond, to: () => Pitch.BFlat },
      { key: Interval.MajorSecond, to: () => Pitch.B },
      { key: Interval.MinorThird, to: () => Pitch.C },
      { key: Interval.AugmentedSecond, to: () => Pitch.BSharp },
      { key: Interval.MajorThird, to: () => Pitch.CSharp },
      { key: Interval.PerfectFourth, to: () => Pitch.D },
      { key: Interval.AugmentedFourth, to: () => Pitch.DSharp },
      { key: Interval.DiminishedFifth, to: () => Pitch.EFlat },
      { key: Interval.Tritone, to: () => Pitch.EFlat },
      { key: Interval.PerfectFifth, to: () => Pitch.E },
      { key: Interval.AugmentedFifth, to: () => Pitch.ESharp },
      { key: Interval.MinorSixth, to: () => Pitch.F },
      { key: Interval.MajorSixth, to: () => Pitch.FSharp },
      { key: Interval.DiminishedSeventh, to: () => Pitch.FSharp },
      { key: Interval.MinorSeventh, to: () => Pitch.G },
      { key: Interval.MajorSeventh, to: () => Pitch.GSharp },
      { key: Interval.PerfectOctave, to: () => Pitch.A },
      { key: Interval.MinorNinth, to: () => Pitch.BFlat },
      { key: Interval.MajorNinth, to: () => Pitch.B },
      { key: Interval.AugmentedNinth, to: () => Pitch.BSharp },
      { key: Interval.PerfectEleventh, to: () => Pitch.D },
      { key: Interval.AugmentedEleventh, to: () => Pitch.DSharp },
      { key: Interval.MinorThirteenth, to: () => Pitch.F },
      { key: Interval.MajorThirteenth, to: () => Pitch.FSharp },
    ]
  );

  public static readonly ASharp: Pitch = new Pitch(
    'A#',
    10,
    () => Pitch.B,
    () => Pitch.A,
    () => Pitch.A,
    () => Pitch.sharpIntervals(Pitch.A.intervals())
  );

  public static readonly BFlat: Pitch = new Pitch(
    'Bb',
    10,
    () => Pitch.B,
    () => Pitch.A,
    () => Pitch.B,
    () => Pitch.flatIntervals(Pitch.B.intervals())
  );

  public static readonly B: Pitch = new Pitch(
    'B',
    11,
    () => Pitch.C,
    () => Pitch.BFlat,
    () => Pitch.B,
    () => [
      { key: Interval.Unison, to: () => Pitch.B },
      { key: Interval.AugmentedUnison, to: () => Pitch.BSharp },
      { key: Interval.MinorSecond, to: () => Pitch.C },
      { key: Interval.MajorSecond, to: () => Pitch.CSharp },
      { key: Interval.MinorThird, to: () => Pitch.D },
      { key: Interval.AugmentedSecond, to: () => Pitch.D },
      { key: Interval.MajorThird, to: () => Pitch.DSharp },
      { key: Interval.PerfectFourth, to: () => Pitch.E },
      { key: Interval.AugmentedFourth, to: () => Pitch.ESharp },
      { key: Interval.DiminishedFifth, to: () => Pitch.F },
      { key: Interval.Tritone, to: () => Pitch.F },
      { key: Interval.PerfectFifth, to: () => Pitch.FSharp },
      { key: Interval.AugmentedFifth, to: () => Pitch.FSharp },
      { key: Interval.MinorSixth, to: () => Pitch.G },
      { key: Interval.MajorSixth, to: () => Pitch.GSharp },
      { key: Interval.DiminishedSeventh, to: () => Pitch.GSharp },
      { key: Interval.MinorSeventh, to: () => Pitch.A },
      { key: Interval.MajorSeventh, to: () => Pitch.ASharp },
      { key: Interval.PerfectOctave, to: () => Pitch.B },
      { key: Interval.MinorNinth, to: () => Pitch.C },
      { key: Interval.MajorNinth, to: () => Pitch.CSharp },
      { key: Interval.AugmentedNinth, to: () => Pitch.CSharp },
      { key: Interval.PerfectEleventh, to: () => Pitch.E },
      { key: Interval.AugmentedEleventh, to: () => Pitch.ESharp },
      { key: Interval.MinorThirteenth, to: () => Pitch.G },
      { key: Interval.MajorThirteenth, to: () => Pitch.GSharp },
    ]
  );

  public static readonly BSharp: Pitch = new Pitch(
    'C',
    0,
    () => Pitch.C,
    () => Pitch.B,
    () => Pitch.B,
    () => Pitch.sharpIntervals(Pitch.C.intervals())
  );

  public static readonly CFlat: Pitch = new Pitch(
    'Cb',
    11,
    () => Pitch.C,
    () => Pitch.B,
    () => Pitch.C,
    () => Pitch.flatIntervals(Pitch.B.intervals())
  );

  private static sharpIntervals = (intervals: IntervalMap[]) => {
    return intervals.map(
      (it) =>
        ({
          key: it.key,
          to: it.to().sharp,
        } as IntervalMap)
    );
  };

  private static flatIntervals = (intervals: IntervalMap[]) => {
    return intervals.map(
      (it) =>
        ({
          key: it.key,
          to: it.to().flat,
        } as IntervalMap)
    );
  };
}
