import { ScalePatternPrimitives, ScalePrimitives } from '../primitives/Scale';
import { Chord, ChordFunction, ChordPattern, ChordPitch, ChordPitches, ClosedChord } from './Chord';
import { Duration } from './Duration';
import { Interval } from './Interval';
import { MelodicLine, Note, Octave } from './Note';
import { Pitch, PitchLine, PitchLineDirection } from './Pitch';

export const enum ScaleDegree {
  I = 0,
  II,
  III,
  IV,
  V,
  VI,
  VII,
}

export class ScalePattern {
  private static readonly all: ScalePattern[] = [];

  private constructor(
    private readonly name: string,
    private readonly pattern: Interval[]
  ) {
    ScalePattern.all.push(this);
  }

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
    return new Scale(this, root);
  }

  public createScalePitches(root: Pitch): Pitch[] {
    return this.pattern.map((interval) => root.transpose(interval));
  }

  public get Name(): string {
    return this.name;
  }

  public static get ScalePatterns(): ScalePattern[] {
    return ScalePattern.all;
  }

  public get To(): ScalePatternPrimitives {
    return {
      name: this.Name,
      pattern: this.pattern.map((i) => i.To),
    };
  }

  public equals(other: ScalePattern) {
    return this.name === other.name;
  }

  public static From(primitive: ScalePatternPrimitives) {
    return new ScalePattern(
      primitive.name,
      primitive.pattern.map((i) => Interval.From(i))
    );
  }

  public static readonly MajorScaleModePatterns = [
    ScalePattern.Ionian,
    ScalePattern.Dorian,
    ScalePattern.Phrygian,
    ScalePattern.Lydian,
    ScalePattern.Mixolydian,
    ScalePattern.Aolian,
    ScalePattern.Locrian,
  ];
}

export class Scale implements Iterable<Pitch> {
  constructor(
    private readonly scalePattern: ScalePattern,
    private readonly root: Pitch,
    private readonly pitches: Pitch[] = scalePattern.createScalePitches(root)
  ) {}

  get To(): Readonly<ScalePrimitives> {
    return {
      pattern: this.scalePattern.To,
      root: this.root.To,
      pitches: this.pitches.map((p) => p.To),
    };
  }

  static From(primitive: ScalePrimitives) {
    return new Scale(
      ScalePattern.From(primitive.pattern),
      Pitch.From(primitive.root),
      primitive.pitches.map((p) => Pitch.From(p))
    );
  }

  pitchFor(degree: ScaleDegree) {
    return this.pitches[degree]!;
  }

  degreeFor(pitch: Pitch) {
    const degree: ScaleDegree = this.pitches.findIndex((p) => p === pitch);
    if (degree) {
      return degree;
    }

    return undefined;
  }

  down(from: ScaleDegree, to: ScaleDegree) {
    if (from > to) {
      const line = this.pitches.slice(to, from + 1).reverse();
      return new PitchLine(line, PitchLineDirection.Descending);
    }

    const line1 = this.pitches.slice(0, from + 1).reverse();
    const line2 = this.pitches.slice(to).reverse();
    return new PitchLine(line1.concat(line2), PitchLineDirection.Descending);
  }

  melodicLine(duration: Duration, octave: Octave) {
    return new MelodicLine(
      this.pitches.map(
        (p, i) => new Note(p, duration, p === Pitch.C && i !== 0 ? octave.up() : octave)
      )
    );
  }

  thirdsFrom(degree: ScaleDegree): Array<Pitch> {
    return this.pitches
      .slice(degree)
      .concat(this.pitches)
      .concat(this.pitches)
      .filter((_, i) => i % 2 === 0)
      .slice(0, 7);
  }

  melodicThirdsFrom(degree: ScaleDegree, pitchDurations: Duration, octave: Octave) {
    return new MelodicLine(
      this.pitches
        .slice(degree)
        .map((p) => new Note(p, pitchDurations, octave))
        .concat(this.pitches.map((p) => new Note(p, pitchDurations, octave.up())))
        .concat(this.pitches.map((p) => new Note(p, pitchDurations, octave.up().up())))
        .filter((_, i) => i % 2 === 0)
        .slice(0, 7)
    );
  }

  thirdsTo(degree: ScaleDegree): Array<Pitch> {
    return this.pitches
      .slice(degree)
      .concat(this.pitches)
      .concat(this.pitches)
      .filter((_, i) => i % 2 != 0 || i == 0)
      .slice(0, 7);
  }

  melodicThirdsTo(degree: ScaleDegree, pitchDurations: Duration, startingOctave: Octave) {
    return new MelodicLine(
      this.pitches
        .slice(degree)
        .map((p) => new Note(p, pitchDurations, startingOctave))
        .concat(this.pitches.map((p) => new Note(p, pitchDurations, startingOctave.up())))
        .concat(this.pitches.map((p) => new Note(p, pitchDurations, startingOctave.up().up())))
        .filter((_, i) => i % 2 != 0 || i == 0)
        .slice(0, 7)
    );
  }

  hasPattern(other: ScalePattern) {
    return this.scalePattern.equals(other);
  }

  *[Symbol.iterator](): Iterator<Pitch> {
    for (const pitch of this.pitches) {
      yield pitch;
    }
  }
}

export interface ScaleHarmonizer {
  chordFor(degree: ScaleDegree): Chord;
}

export class TriadHarmonizer implements ScaleHarmonizer {
  constructor(private scale: Scale) {}

  chordFor(degree: ScaleDegree): Chord {
    const thirds = this.scale.thirdsFrom(degree);

    const chordPitches = new ChordPitches([
      new ChordPitch(thirds[0]!, ChordFunction.Root),
      new ChordPitch(thirds[1]!, ChordFunction.Third),
      new ChordPitch(thirds[2]!, ChordFunction.Fifth),
    ]);

    return new ClosedChord(
      chordPitches.pitchForFunction(ChordFunction.Root),
      ChordPattern.patternFor(chordPitches.toIntervals()) ?? ChordPattern.Major,
      Duration.Whole,
      Octave.C4
    );
  }
}

export class SeventhHarmonizer implements ScaleHarmonizer {
  constructor(private scale: Scale) {}

  chordFor(degree: ScaleDegree): Chord {
    const thirds = this.scale.thirdsFrom(degree);

    const chordPitches = new ChordPitches([
      new ChordPitch(thirds[0]!, ChordFunction.Root),
      new ChordPitch(thirds[1]!, ChordFunction.Third),
      new ChordPitch(thirds[2]!, ChordFunction.Fifth),
      new ChordPitch(thirds[3]!, ChordFunction.Seventh),
    ]);

    return new ClosedChord(
      chordPitches.pitchForFunction(ChordFunction.Root),
      ChordPattern.patternFor(chordPitches.toIntervals()) ?? ChordPattern.Major7,
      Duration.Whole,
      Octave.C4
    );
  }
}
