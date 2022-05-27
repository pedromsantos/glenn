import Interval from './Interval';
import Pitch, { MelodicLine, MelodicLineDirection, PitchState } from './Pitch';

export class ScalePattern {
  private constructor(private readonly name: string, private readonly pattern: Interval[]) {}

  public static readonly Ionian: ScalePattern = new ScalePattern('Ionian', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);

  public static readonly Dorian: ScalePattern = new ScalePattern('Dorian', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
  ]);

  public static readonly Phrygian: ScalePattern = new ScalePattern('Phrygian', [
    Interval.Unison,
    Interval.MinorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Lydian: ScalePattern = new ScalePattern('Lydian', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.AugmentedFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly Mixolydian: ScalePattern = new ScalePattern('Mixolydian', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Aolian: ScalePattern = new ScalePattern('Aolian', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Locrian: ScalePattern = new ScalePattern('Locrian', [
    Interval.Unison,
    Interval.MinorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.DiminishedFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly MajorPentatonic: ScalePattern = new ScalePattern('Major Pentatonic', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MajorSixth,
  ]);
  public static readonly MinorPentatonic: ScalePattern = new ScalePattern('Minor Pentatonic', [
    Interval.Unison,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
  ]);
  public static readonly Blues: ScalePattern = new ScalePattern('Blues', [
    Interval.Unison,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.DiminishedFifth,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
  ]);
  public static readonly HarmonicMinor: ScalePattern = new ScalePattern('Harmonic Minor', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly MelodicMinor: ScalePattern = new ScalePattern('Melodic Minor', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly Dorianb2: ScalePattern = new ScalePattern('Dorian b2', [
    Interval.Unison,
    Interval.MinorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly NeapolitanMinor: ScalePattern = new ScalePattern('Neapolitan Minor', [
    Interval.Unison,
    Interval.MinorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly LydianAugmented: ScalePattern = new ScalePattern('Lydian Augmented', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.AugmentedFourth,
    Interval.AugmentedFifth,
    Interval.MajorSixth,
    Interval.MajorSeventh,
  ]);
  public static readonly LydianDominant: ScalePattern = new ScalePattern('Lydian Dominant', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.AugmentedFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Mixolydianb6: ScalePattern = new ScalePattern('Mixolydian b6', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly Bebop: ScalePattern = new ScalePattern('Bebop', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.PerfectFourth,
    Interval.PerfectFifth,
    Interval.MajorSixth,
    Interval.MinorSeventh,
    Interval.MajorSeventh,
  ]);
  public static readonly LocrianSharp2: ScalePattern = new ScalePattern('Locrian #2', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MinorThird,
    Interval.PerfectFourth,
    Interval.DiminishedFifth,
    Interval.MinorSixth,
    Interval.MinorSeventh,
  ]);
  public static readonly AlteredDominant: ScalePattern = new ScalePattern('Altered Dominant', [
    Interval.Unison,
    Interval.MinorSecond,
    Interval.AugmentedSecond,
    Interval.MajorThird,
    Interval.DiminishedFifth,
    Interval.AugmentedFifth,
    Interval.MinorSeventh,
  ]);
  public static readonly HalfWholeDiminished: ScalePattern = new ScalePattern(
    'Half Whole Diminished',
    [
      Interval.Unison,
      Interval.MinorSecond,
      Interval.MinorThird,
      Interval.MajorThird,
      Interval.AugmentedFourth,
      Interval.PerfectFifth,
      Interval.MajorSixth,
      Interval.MinorSeventh,
    ]
  );
  public static readonly WholeTone: ScalePattern = new ScalePattern('Whole Tone', [
    Interval.Unison,
    Interval.MajorSecond,
    Interval.MajorThird,
    Interval.DiminishedFifth,
    Interval.AugmentedFifth,
    Interval.MinorSeventh,
  ]);
  public static readonly MajorSixthDiminished: ScalePattern = new ScalePattern(
    'Major Sixth Diminished',
    [
      Interval.Unison,
      Interval.MajorSecond,
      Interval.MajorThird,
      Interval.PerfectFourth,
      Interval.PerfectFifth,
      Interval.AugmentedFifth,
      Interval.MajorSixth,
      Interval.MajorSeventh,
    ]
  );
  public static readonly MinorSixthDiminished: ScalePattern = new ScalePattern(
    'Minor Sixth Diminished',
    [
      Interval.Unison,
      Interval.MajorSecond,
      Interval.MinorThird,
      Interval.PerfectFourth,
      Interval.PerfectFifth,
      Interval.AugmentedFifth,
      Interval.MajorSixth,
      Interval.MajorSeventh,
    ]
  );
  public static readonly DominantDiminished: ScalePattern = new ScalePattern(
    'Dominant Diminished',
    [
      Interval.Unison,
      Interval.MajorSecond,
      Interval.MajorThird,
      Interval.PerfectFourth,
      Interval.PerfectFifth,
      Interval.AugmentedFifth,
      Interval.MinorSeventh,
      Interval.MajorSeventh,
    ]
  );
  public static readonly Dominantb5Diminished: ScalePattern = new ScalePattern(
    'Dominant b5 Diminished',
    [
      Interval.Unison,
      Interval.MajorSecond,
      Interval.MajorThird,
      Interval.PerfectFourth,
      Interval.DiminishedFifth,
      Interval.AugmentedFifth,
      Interval.MinorSeventh,
      Interval.MajorSeventh,
    ]
  );

  public createScale(root: Pitch) {
    return new Scale(this, root, this.createScalePitches(root));
  }

  public createScalePitches(root: Pitch): Pitch[] {
    return this.pattern.map((interval) => root.transpose(interval));
  }

  public createMelodicLineScale(root: Pitch): MelodicLine {
    return new MelodicLine(this.createScalePitches(root));
  }

  public createDescendingMelodicLineScale(root: Pitch): MelodicLine {
    return this.createScale(root).DescendingMelodicLine;
  }

  public get Name(): string {
    return this.name;
  }

  // Stryker disable all
  public static readonly ScalePatterns = [
    ScalePattern.AlteredDominant,
    ScalePattern.Aolian,
    ScalePattern.Bebop,
    ScalePattern.Blues,
    ScalePattern.DominantDiminished,
    ScalePattern.Dominantb5Diminished,
    ScalePattern.Dorian,
    ScalePattern.Dorianb2,
    ScalePattern.HalfWholeDiminished,
    ScalePattern.HarmonicMinor,
    ScalePattern.Ionian,
    ScalePattern.Locrian,
    ScalePattern.LocrianSharp2,
    ScalePattern.Lydian,
    ScalePattern.LydianAugmented,
    ScalePattern.LydianDominant,
    ScalePattern.MajorPentatonic,
    ScalePattern.MajorSixthDiminished,
    ScalePattern.MelodicMinor,
    ScalePattern.MinorPentatonic,
    ScalePattern.MinorSixthDiminished,
    ScalePattern.Mixolydian,
    ScalePattern.Mixolydianb6,
    ScalePattern.NeapolitanMinor,
    ScalePattern.Phrygian,
    ScalePattern.WholeTone,
  ];

  // Stryker disable all
  public static readonly MajorModePatterns = [
    ScalePattern.Aolian,
    ScalePattern.Dorian,
    ScalePattern.Ionian,
    ScalePattern.Locrian,
    ScalePattern.Lydian,
    ScalePattern.Mixolydian,
    ScalePattern.Phrygian,
  ];
}

export type ScaleState = {
  pattern: string;
  root: PitchState;
  pitches: PitchState[];
};

export default class Scale {
  constructor(
    private readonly scalePattern: ScalePattern,
    private readonly root: Pitch,
    private readonly pitches: Pitch[]
  ) {}

  get Pitches(): Pitch[] {
    return this.pitches;
  }

  get MelodicLine(): MelodicLine {
    return new MelodicLine(this.pitches, MelodicLineDirection.Ascending);
  }

  get DescendingMelodicLine(): MelodicLine {
    return new MelodicLine(this.pitches, MelodicLineDirection.Descending);
  }

  get To(): Readonly<ScaleState> {
    return {
      pattern: this.scalePattern.Name,
      root: this.root.To,
      pitches: this.pitches.map((p) => p.To),
    };
  }
}
