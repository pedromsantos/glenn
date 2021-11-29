import Interval from './Interval';

interface IntervalMap {
  with: Interval;
  goesTo: () => Pitch;
}

class IntervalMapper {
  constructor(private intervals: IntervalMap[]) {}

  sharp = () => {
    return new IntervalMapper(
      this.intervals.map(
        (it) =>
          ({
            with: it.with,
            goesTo: it.goesTo().sharp,
          } as IntervalMap)
      )
    );
  };

  flat = () => {
    return new IntervalMapper(
      this.intervals.map(
        (it) =>
          ({
            with: it.with,
            goesTo: it.goesTo().flat,
          } as IntervalMap)
      )
    );
  };

  transposer(interval: Interval): (() => Pitch) | undefined {
    return this.intervals.find((it) => it.with === interval)?.goesTo;
  }

  intervalTo(to: Pitch): Interval | undefined {
    return this.intervals.find((it) => it.goesTo() === to)?.with;
  }
}

export default class Pitch {
  constructor(
    private name: string,
    private value: number,
    public sharp: () => Pitch,
    public flat: () => Pitch,
    public natural: () => Pitch,
    private intervals: () => IntervalMapper
  ) {}

  absoluteDistance(to: Pitch): Number {
    if (this.value <= to.value) return <any>to.value - <any>this.value;

    return 12 + (<any>to.value - <any>this.value);
  }

  transpose(interval: Interval): Pitch {
    const transposer = this.intervals().transposer(interval);

    return transposer == undefined ? this : transposer();
  }

  intervalTo(to: Pitch): Interval {
    const intervalTo = this.intervals().intervalTo(to);

    return intervalTo == undefined ? Interval.Unison : intervalTo;
  }

  getNumericValue(): number {
    return this.value;
  }

  public static readonly C: Pitch = new Pitch(
    'C',
    0,
    () => Pitch.CSharp,
    () => Pitch.B,
    () => Pitch.C,
    () =>
      new IntervalMapper([
        { with: Interval.Unison, goesTo: () => Pitch.C },
        { with: Interval.AugmentedUnison, goesTo: () => Pitch.CSharp },
        { with: Interval.MinorSecond, goesTo: () => Pitch.DFlat },
        { with: Interval.MajorSecond, goesTo: () => Pitch.D },
        { with: Interval.MinorThird, goesTo: () => Pitch.EFlat },
        { with: Interval.AugmentedSecond, goesTo: () => Pitch.DSharp },
        { with: Interval.MajorThird, goesTo: () => Pitch.E },
        { with: Interval.PerfectFourth, goesTo: () => Pitch.F },
        { with: Interval.AugmentedFourth, goesTo: () => Pitch.FSharp },
        { with: Interval.DiminishedFifth, goesTo: () => Pitch.GFlat },
        { with: Interval.Tritone, goesTo: () => Pitch.GFlat },
        { with: Interval.PerfectFifth, goesTo: () => Pitch.G },
        { with: Interval.AugmentedFifth, goesTo: () => Pitch.GSharp },
        { with: Interval.MinorSixth, goesTo: () => Pitch.AFlat },
        { with: Interval.MajorSixth, goesTo: () => Pitch.A },
        { with: Interval.DiminishedSeventh, goesTo: () => Pitch.A },
        { with: Interval.MinorSeventh, goesTo: () => Pitch.BFlat },
        { with: Interval.MajorSeventh, goesTo: () => Pitch.B },
        { with: Interval.PerfectOctave, goesTo: () => Pitch.C },
        { with: Interval.MinorNinth, goesTo: () => Pitch.DFlat },
        { with: Interval.MajorNinth, goesTo: () => Pitch.D },
        { with: Interval.AugmentedNinth, goesTo: () => Pitch.DSharp },
        { with: Interval.PerfectEleventh, goesTo: () => Pitch.F },
        { with: Interval.AugmentedEleventh, goesTo: () => Pitch.FSharp },
        { with: Interval.MinorThirteenth, goesTo: () => Pitch.AFlat },
        { with: Interval.MajorThirteenth, goesTo: () => Pitch.A },
      ])
  );

  public static readonly CSharp: Pitch = new Pitch(
    'C#',
    1,
    () => Pitch.D,
    () => Pitch.C,
    () => Pitch.C,
    () => Pitch.C.intervals().sharp()
  );

  public static readonly DFlat: Pitch = new Pitch(
    'Db',
    1,
    () => Pitch.D,
    () => Pitch.C,
    () => Pitch.D,
    () => Pitch.D.intervals().flat()
  );

  public static readonly D: Pitch = new Pitch(
    'D',
    2,
    () => Pitch.DSharp,
    () => Pitch.DFlat,
    () => Pitch.D,
    () =>
      new IntervalMapper([
        { with: Interval.Unison, goesTo: () => Pitch.D },
        { with: Interval.AugmentedUnison, goesTo: () => Pitch.DSharp },
        { with: Interval.MinorSecond, goesTo: () => Pitch.EFlat },
        { with: Interval.MajorSecond, goesTo: () => Pitch.E },
        { with: Interval.MinorThird, goesTo: () => Pitch.F },
        { with: Interval.AugmentedSecond, goesTo: () => Pitch.ESharp },
        { with: Interval.MajorThird, goesTo: () => Pitch.FSharp },
        { with: Interval.PerfectFourth, goesTo: () => Pitch.G },
        { with: Interval.AugmentedFourth, goesTo: () => Pitch.GSharp },
        { with: Interval.DiminishedFifth, goesTo: () => Pitch.AFlat },
        { with: Interval.Tritone, goesTo: () => Pitch.AFlat },
        { with: Interval.PerfectFifth, goesTo: () => Pitch.A },
        { with: Interval.AugmentedFifth, goesTo: () => Pitch.ASharp },
        { with: Interval.MinorSixth, goesTo: () => Pitch.BFlat },
        { with: Interval.MajorSixth, goesTo: () => Pitch.B },
        { with: Interval.DiminishedSeventh, goesTo: () => Pitch.B },
        { with: Interval.MinorSeventh, goesTo: () => Pitch.C },
        { with: Interval.MajorSeventh, goesTo: () => Pitch.CSharp },
        { with: Interval.PerfectOctave, goesTo: () => Pitch.D },
        { with: Interval.MinorNinth, goesTo: () => Pitch.EFlat },
        { with: Interval.MajorNinth, goesTo: () => Pitch.E },
        { with: Interval.AugmentedNinth, goesTo: () => Pitch.ESharp },
        { with: Interval.PerfectEleventh, goesTo: () => Pitch.G },
        { with: Interval.AugmentedEleventh, goesTo: () => Pitch.GSharp },
        { with: Interval.MinorThirteenth, goesTo: () => Pitch.BFlat },
        { with: Interval.MajorThirteenth, goesTo: () => Pitch.B },
      ])
  );

  public static readonly DSharp: Pitch = new Pitch(
    'D#',
    3,
    () => Pitch.E,
    () => Pitch.D,
    () => Pitch.D,
    () => Pitch.D.intervals().sharp()
  );

  public static readonly EFlat: Pitch = new Pitch(
    'Eb',
    3,
    () => Pitch.E,
    () => Pitch.D,
    () => Pitch.E,
    () => Pitch.E.intervals().flat()
  );

  public static readonly E: Pitch = new Pitch(
    'E',
    4,
    () => Pitch.F,
    () => Pitch.EFlat,
    () => Pitch.E,
    () =>
      new IntervalMapper([
        { with: Interval.Unison, goesTo: () => Pitch.E },
        { with: Interval.AugmentedUnison, goesTo: () => Pitch.ESharp },
        { with: Interval.MinorSecond, goesTo: () => Pitch.F },
        { with: Interval.MajorSecond, goesTo: () => Pitch.FSharp },
        { with: Interval.MinorThird, goesTo: () => Pitch.G },
        { with: Interval.AugmentedSecond, goesTo: () => Pitch.G },
        { with: Interval.MajorThird, goesTo: () => Pitch.GSharp },
        { with: Interval.PerfectFourth, goesTo: () => Pitch.A },
        { with: Interval.AugmentedFourth, goesTo: () => Pitch.ASharp },
        { with: Interval.DiminishedFifth, goesTo: () => Pitch.BFlat },
        { with: Interval.Tritone, goesTo: () => Pitch.BFlat },
        { with: Interval.PerfectFifth, goesTo: () => Pitch.B },
        { with: Interval.AugmentedFifth, goesTo: () => Pitch.BSharp },
        { with: Interval.MajorSixth, goesTo: () => Pitch.CSharp },
        { with: Interval.DiminishedSeventh, goesTo: () => Pitch.CSharp },
        { with: Interval.MinorSeventh, goesTo: () => Pitch.D },
        { with: Interval.MajorSeventh, goesTo: () => Pitch.DSharp },
        { with: Interval.PerfectOctave, goesTo: () => Pitch.E },
        { with: Interval.MinorNinth, goesTo: () => Pitch.F },
        { with: Interval.MajorNinth, goesTo: () => Pitch.FSharp },
        { with: Interval.AugmentedNinth, goesTo: () => Pitch.G },
        { with: Interval.PerfectEleventh, goesTo: () => Pitch.A },
        { with: Interval.AugmentedEleventh, goesTo: () => Pitch.ASharp },
        { with: Interval.MinorThirteenth, goesTo: () => Pitch.C },
        { with: Interval.MajorThirteenth, goesTo: () => Pitch.CSharp },
      ])
  );

  public static readonly F: Pitch = new Pitch(
    'F',
    5,
    () => Pitch.FSharp,
    () => Pitch.E,
    () => Pitch.F,
    () =>
      new IntervalMapper([
        { with: Interval.Unison, goesTo: () => Pitch.F },
        { with: Interval.AugmentedUnison, goesTo: () => Pitch.FSharp },
        { with: Interval.MinorSecond, goesTo: () => Pitch.GFlat },
        { with: Interval.MajorSecond, goesTo: () => Pitch.G },
        { with: Interval.MinorThird, goesTo: () => Pitch.AFlat },
        { with: Interval.AugmentedSecond, goesTo: () => Pitch.GSharp },
        { with: Interval.MajorThird, goesTo: () => Pitch.A },
        { with: Interval.PerfectFourth, goesTo: () => Pitch.BFlat },
        { with: Interval.AugmentedFourth, goesTo: () => Pitch.B },
        { with: Interval.DiminishedFifth, goesTo: () => Pitch.CFlat },
        { with: Interval.Tritone, goesTo: () => Pitch.CFlat },
        { with: Interval.PerfectFifth, goesTo: () => Pitch.C },
        { with: Interval.AugmentedFifth, goesTo: () => Pitch.CSharp },
        { with: Interval.MinorSixth, goesTo: () => Pitch.DFlat },
        { with: Interval.MajorSixth, goesTo: () => Pitch.D },
        { with: Interval.DiminishedSeventh, goesTo: () => Pitch.D },
        { with: Interval.MinorSeventh, goesTo: () => Pitch.EFlat },
        { with: Interval.MajorSeventh, goesTo: () => Pitch.E },
        { with: Interval.PerfectOctave, goesTo: () => Pitch.F },
        { with: Interval.MinorNinth, goesTo: () => Pitch.GFlat },
        { with: Interval.MajorNinth, goesTo: () => Pitch.G },
        { with: Interval.AugmentedNinth, goesTo: () => Pitch.GSharp },
        { with: Interval.PerfectEleventh, goesTo: () => Pitch.BFlat },
        { with: Interval.AugmentedEleventh, goesTo: () => Pitch.B },
        { with: Interval.MinorThirteenth, goesTo: () => Pitch.DFlat },
        { with: Interval.MajorThirteenth, goesTo: () => Pitch.D },
      ])
  );

  public static readonly ESharp: Pitch = new Pitch(
    'E#',
    5,
    () => Pitch.F,
    () => Pitch.E,
    () => Pitch.E,
    () => Pitch.F.intervals().sharp()
  );

  public static readonly FSharp: Pitch = new Pitch(
    'F#',
    6,
    () => Pitch.G,
    () => Pitch.F,
    () => Pitch.F,
    () => Pitch.F.intervals().sharp()
  );

  public static readonly GFlat: Pitch = new Pitch(
    'Gb',
    6,
    () => Pitch.G,
    () => Pitch.F,
    () => Pitch.G,
    () => Pitch.G.intervals().flat()
  );

  public static readonly G: Pitch = new Pitch(
    'G',
    7,
    () => Pitch.GSharp,
    () => Pitch.GFlat,
    () => Pitch.G,
    () =>
      new IntervalMapper([
        { with: Interval.Unison, goesTo: () => Pitch.G },
        { with: Interval.AugmentedUnison, goesTo: () => Pitch.GSharp },
        { with: Interval.MinorSecond, goesTo: () => Pitch.AFlat },
        { with: Interval.MajorSecond, goesTo: () => Pitch.A },
        { with: Interval.MinorThird, goesTo: () => Pitch.BFlat },
        { with: Interval.AugmentedSecond, goesTo: () => Pitch.ASharp },
        { with: Interval.MajorThird, goesTo: () => Pitch.B },
        { with: Interval.PerfectFourth, goesTo: () => Pitch.C },
        { with: Interval.AugmentedFourth, goesTo: () => Pitch.CSharp },
        { with: Interval.DiminishedFifth, goesTo: () => Pitch.DFlat },
        { with: Interval.Tritone, goesTo: () => Pitch.DFlat },
        { with: Interval.PerfectFifth, goesTo: () => Pitch.D },
        { with: Interval.AugmentedFifth, goesTo: () => Pitch.DSharp },
        { with: Interval.MinorSixth, goesTo: () => Pitch.EFlat },
        { with: Interval.MajorSixth, goesTo: () => Pitch.E },
        { with: Interval.DiminishedSeventh, goesTo: () => Pitch.E },
        { with: Interval.MinorSeventh, goesTo: () => Pitch.F },
        { with: Interval.MajorSeventh, goesTo: () => Pitch.FSharp },
        { with: Interval.PerfectOctave, goesTo: () => Pitch.G },
        { with: Interval.MinorNinth, goesTo: () => Pitch.AFlat },
        { with: Interval.MajorNinth, goesTo: () => Pitch.A },
        { with: Interval.AugmentedNinth, goesTo: () => Pitch.ASharp },
        { with: Interval.PerfectEleventh, goesTo: () => Pitch.C },
        { with: Interval.AugmentedEleventh, goesTo: () => Pitch.CSharp },
        { with: Interval.MinorThirteenth, goesTo: () => Pitch.EFlat },
        { with: Interval.MajorThirteenth, goesTo: () => Pitch.E },
      ])
  );

  public static readonly GSharp: Pitch = new Pitch(
    'G#',
    8,
    () => Pitch.A,
    () => Pitch.G,
    () => Pitch.G,
    () => Pitch.G.intervals().sharp()
  );

  public static readonly AFlat: Pitch = new Pitch(
    'Ab',
    8,
    () => Pitch.A,
    () => Pitch.G,
    () => Pitch.A,
    () => Pitch.A.intervals().flat()
  );

  public static readonly A: Pitch = new Pitch(
    'A',
    9,
    () => Pitch.ASharp,
    () => Pitch.AFlat,
    () => Pitch.A,
    () =>
      new IntervalMapper([
        { with: Interval.Unison, goesTo: () => Pitch.A },
        { with: Interval.AugmentedUnison, goesTo: () => Pitch.ASharp },
        { with: Interval.MinorSecond, goesTo: () => Pitch.BFlat },
        { with: Interval.MajorSecond, goesTo: () => Pitch.B },
        { with: Interval.MinorThird, goesTo: () => Pitch.C },
        { with: Interval.AugmentedSecond, goesTo: () => Pitch.BSharp },
        { with: Interval.MajorThird, goesTo: () => Pitch.CSharp },
        { with: Interval.PerfectFourth, goesTo: () => Pitch.D },
        { with: Interval.AugmentedFourth, goesTo: () => Pitch.DSharp },
        { with: Interval.DiminishedFifth, goesTo: () => Pitch.EFlat },
        { with: Interval.Tritone, goesTo: () => Pitch.EFlat },
        { with: Interval.PerfectFifth, goesTo: () => Pitch.E },
        { with: Interval.AugmentedFifth, goesTo: () => Pitch.ESharp },
        { with: Interval.MinorSixth, goesTo: () => Pitch.F },
        { with: Interval.MajorSixth, goesTo: () => Pitch.FSharp },
        { with: Interval.DiminishedSeventh, goesTo: () => Pitch.FSharp },
        { with: Interval.MinorSeventh, goesTo: () => Pitch.G },
        { with: Interval.MajorSeventh, goesTo: () => Pitch.GSharp },
        { with: Interval.PerfectOctave, goesTo: () => Pitch.A },
        { with: Interval.MinorNinth, goesTo: () => Pitch.BFlat },
        { with: Interval.MajorNinth, goesTo: () => Pitch.B },
        { with: Interval.AugmentedNinth, goesTo: () => Pitch.BSharp },
        { with: Interval.PerfectEleventh, goesTo: () => Pitch.D },
        { with: Interval.AugmentedEleventh, goesTo: () => Pitch.DSharp },
        { with: Interval.MinorThirteenth, goesTo: () => Pitch.F },
        { with: Interval.MajorThirteenth, goesTo: () => Pitch.FSharp },
      ])
  );

  public static readonly ASharp: Pitch = new Pitch(
    'A#',
    10,
    () => Pitch.B,
    () => Pitch.A,
    () => Pitch.A,
    () => Pitch.A.intervals().sharp()
  );

  public static readonly BFlat: Pitch = new Pitch(
    'Bb',
    10,
    () => Pitch.B,
    () => Pitch.A,
    () => Pitch.B,
    () => Pitch.B.intervals().flat()
  );

  public static readonly B: Pitch = new Pitch(
    'B',
    11,
    () => Pitch.C,
    () => Pitch.BFlat,
    () => Pitch.B,
    () =>
      new IntervalMapper([
        { with: Interval.Unison, goesTo: () => Pitch.B },
        { with: Interval.AugmentedUnison, goesTo: () => Pitch.BSharp },
        { with: Interval.MinorSecond, goesTo: () => Pitch.C },
        { with: Interval.MajorSecond, goesTo: () => Pitch.CSharp },
        { with: Interval.MinorThird, goesTo: () => Pitch.D },
        { with: Interval.AugmentedSecond, goesTo: () => Pitch.D },
        { with: Interval.MajorThird, goesTo: () => Pitch.DSharp },
        { with: Interval.PerfectFourth, goesTo: () => Pitch.E },
        { with: Interval.AugmentedFourth, goesTo: () => Pitch.ESharp },
        { with: Interval.DiminishedFifth, goesTo: () => Pitch.F },
        { with: Interval.Tritone, goesTo: () => Pitch.F },
        { with: Interval.PerfectFifth, goesTo: () => Pitch.FSharp },
        { with: Interval.AugmentedFifth, goesTo: () => Pitch.FSharp },
        { with: Interval.MinorSixth, goesTo: () => Pitch.G },
        { with: Interval.MajorSixth, goesTo: () => Pitch.GSharp },
        { with: Interval.DiminishedSeventh, goesTo: () => Pitch.GSharp },
        { with: Interval.MinorSeventh, goesTo: () => Pitch.A },
        { with: Interval.MajorSeventh, goesTo: () => Pitch.ASharp },
        { with: Interval.PerfectOctave, goesTo: () => Pitch.B },
        { with: Interval.MinorNinth, goesTo: () => Pitch.C },
        { with: Interval.MajorNinth, goesTo: () => Pitch.CSharp },
        { with: Interval.AugmentedNinth, goesTo: () => Pitch.CSharp },
        { with: Interval.PerfectEleventh, goesTo: () => Pitch.E },
        { with: Interval.AugmentedEleventh, goesTo: () => Pitch.ESharp },
        { with: Interval.MinorThirteenth, goesTo: () => Pitch.G },
        { with: Interval.MajorThirteenth, goesTo: () => Pitch.GSharp },
      ])
  );

  public static readonly BSharp: Pitch = new Pitch(
    'C',
    0,
    () => Pitch.C,
    () => Pitch.B,
    () => Pitch.B,
    () => Pitch.C.intervals().sharp()
  );

  public static readonly CFlat: Pitch = new Pitch(
    'Cb',
    11,
    () => Pitch.C,
    () => Pitch.B,
    () => Pitch.C,
    () => Pitch.B.intervals().flat()
  );

  public static readonly pitches = [
    Pitch.C,
    Pitch.CSharp,
    Pitch.DFlat,
    Pitch.D,
    Pitch.DSharp,
    Pitch.EFlat,
    Pitch.E,
    Pitch.F,
    Pitch.FSharp,
    Pitch.GFlat,
    Pitch.G,
    Pitch.GSharp,
    Pitch.AFlat,
    Pitch.A,
    Pitch.ASharp,
    Pitch.BFlat,
    Pitch.B,
  ];
}
