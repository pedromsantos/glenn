import Interval from './Interval';
import Pitch from './Pitch';

export class ScalePattern {
  constructor(private pattern: Interval[]) {}

  public static readonly Ionian: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);

  public static readonly Dorian: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
  ]);

  public static readonly Phrygian: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MinorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Lydian: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.AugmentedFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly Mixolydian: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Aolian: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Locrian: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MinorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.DiminishedFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly MajorPentatonic: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MajorSixth,
  ]);
  public static readonly MinorPentatonic: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
  ]);
  public static readonly Blues: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.DiminishedFifth,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
  ]);
  public static readonly HarmonicMinor: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly MelodicMinor: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly Dorianb2: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MinorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly NeapolitanMinor: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MinorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly LydianAugmented: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.AugmentedFourth,
    Interval.AugmentedFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly LydianDominant: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.AugmentedFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Mixolydianb6: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Bebop: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
    Interval.MajorSeventh,
  ]);
  public static readonly LocrianSharp2: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.DiminishedFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly AlteredDominant: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MinorSecond,
    Interval.AugmentedSecond,
    Interval.MajorThird,
    Interval.DiminishedFifth,
    Interval.AugmentedFifth,
    Interval.MinorSeventh,
  ]);
  public static readonly HalfWholeDiminished: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MinorSecond,
    Interval.MinorThird,
    Interval.MajorThird,
    Interval.AugmentedFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly WholeTone: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.DiminishedFifth,
    Interval.AugmentedFifth,
    Interval.MinorSeventh,
  ]);
  public static readonly MajorSixthDiminishedScale: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.AugmentedFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly MinorSixthDiminishedScale: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.AugmentedFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly DominantDiminishedScale: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.AugmentedFifth,
    Interval.MinorSeventh,
    Interval.MajorSeventh,
  ]);
  public static readonly Dominantb5DiminishedScale: ScalePattern = new ScalePattern([
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.DiminishedFifth,
    Interval.AugmentedFifth,
    Interval.MinorSeventh,
    Interval.MajorSeventh,
  ]);

  public createScale(root: Pitch) {
    return new Scale(
      this,
      root,
      this.pattern.map((interval) => root.transpose(interval))
    );
  }
}

export default class Scale {
  constructor(private scalePattern: ScalePattern, private root: Pitch, private notes: Pitch[]) {}

  get Notes(): Pitch[] {
    return this.notes;
  }
}
