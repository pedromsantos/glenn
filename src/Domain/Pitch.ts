import { PitchPrimitives } from '../primitives/Pitch';
import { throwExpression } from './Ensure';
import { Interval } from './Interval';

export enum Accidental {
  Flat = -1,
  Natural = 0,
  Sharp = 1,
}

export class Pitch {
  PITCHES = 12;

  private constructor(
    private readonly name: string,
    private readonly value: number,
    private readonly accidental: Accidental,
    public readonly sharp: () => Pitch,
    public readonly flat: () => Pitch,
    public readonly natural: () => Pitch,
    private readonly intervals: () => IntervalsToPitches
  ) {}

  absoluteDistance(to: Pitch): number {
    if (this.value <= to.value) return to.value - this.value;

    return this.PITCHES + (to.value - this.value);
  }

  transpose(interval: Interval): Pitch {
    const transposer = this.intervals().transposerFor(interval);

    return transposer?.() ?? this;
  }

  intervalTo(to: Pitch): Interval {
    const intervalTo = this.intervals().intervalTo(to);

    return intervalTo ?? throwExpression('Invalid interval');
  }

  equal(other?: Pitch) {
    return this.NumericValue == other?.NumericValue;
  }

  isHiger(other: Pitch): boolean {
    return this.value > other.value;
  }

  isLower(other: Pitch): boolean {
    return this.value < other.value;
  }

  get NumericValue(): number {
    return this.value;
  }

  get Name() {
    return this.name;
  }

  get To(): PitchPrimitives {
    return {
      name: this.name,
      naturalName: this.natural().name,
      value: this.value,
      accidental: this.accidental,
    };
  }

  static From(state: PitchPrimitives): Pitch {
    const pitch = Pitch.pitches.find((p) => p.value === state.value && p.name === state.name);

    if (!pitch) {
      throw new Error('Invalid pitch value');
    }

    return pitch;
  }

  public static readonly C: Pitch = new Pitch(
    'C',
    0,
    Accidental.Natural,
    () => Pitch.CSharp,
    () => Pitch.B,
    () => Pitch.C,
    () =>
      new IntervalsToPitches([
        { with: Interval.Unison, to: () => Pitch.C },
        { with: Interval.AugmentedUnison, to: () => Pitch.CSharp },
        { with: Interval.MinorSecond, to: () => Pitch.DFlat },
        { with: Interval.MajorSecond, to: () => Pitch.D },
        { with: Interval.MinorThird, to: () => Pitch.EFlat },
        { with: Interval.AugmentedSecond, to: () => Pitch.DSharp },
        { with: Interval.MajorThird, to: () => Pitch.E },
        { with: Interval.PerfectFourth, to: () => Pitch.F },
        { with: Interval.AugmentedFourth, to: () => Pitch.FSharp },
        { with: Interval.DiminishedFifth, to: () => Pitch.GFlat },
        { with: Interval.Tritone, to: () => Pitch.GFlat },
        { with: Interval.PerfectFifth, to: () => Pitch.G },
        { with: Interval.AugmentedFifth, to: () => Pitch.GSharp },
        { with: Interval.MinorSixth, to: () => Pitch.AFlat },
        { with: Interval.MajorSixth, to: () => Pitch.A },
        { with: Interval.DiminishedSeventh, to: () => Pitch.A },
        { with: Interval.MinorSeventh, to: () => Pitch.BFlat },
        { with: Interval.MajorSeventh, to: () => Pitch.B },
        { with: Interval.PerfectOctave, to: () => Pitch.C },
        { with: Interval.MinorNinth, to: () => Pitch.DFlat },
        { with: Interval.MajorNinth, to: () => Pitch.D },
        { with: Interval.AugmentedNinth, to: () => Pitch.DSharp },
        { with: Interval.PerfectEleventh, to: () => Pitch.F },
        { with: Interval.AugmentedEleventh, to: () => Pitch.FSharp },
        { with: Interval.MinorThirteenth, to: () => Pitch.AFlat },
        { with: Interval.MajorThirteenth, to: () => Pitch.A },
      ])
  );

  public static readonly CSharp: Pitch = new Pitch(
    'C#',
    1,
    Accidental.Sharp,
    () => Pitch.D,
    () => Pitch.C,
    () => Pitch.C,
    () => Pitch.C.intervals().sharp()
  );

  public static readonly DFlat: Pitch = new Pitch(
    'Db',
    1,
    Accidental.Flat,
    () => Pitch.D,
    () => Pitch.C,
    () => Pitch.D,
    () => Pitch.D.intervals().flat()
  );

  public static readonly D: Pitch = new Pitch(
    'D',
    2,
    Accidental.Natural,
    () => Pitch.DSharp,
    () => Pitch.DFlat,
    () => Pitch.D,
    () =>
      new IntervalsToPitches([
        { with: Interval.Unison, to: () => Pitch.D },
        { with: Interval.AugmentedUnison, to: () => Pitch.DSharp },
        { with: Interval.MinorSecond, to: () => Pitch.EFlat },
        { with: Interval.MajorSecond, to: () => Pitch.E },
        { with: Interval.MinorThird, to: () => Pitch.F },
        { with: Interval.AugmentedSecond, to: () => Pitch.ESharp },
        { with: Interval.MajorThird, to: () => Pitch.FSharp },
        { with: Interval.PerfectFourth, to: () => Pitch.G },
        { with: Interval.AugmentedFourth, to: () => Pitch.GSharp },
        { with: Interval.DiminishedFifth, to: () => Pitch.AFlat },
        { with: Interval.Tritone, to: () => Pitch.AFlat },
        { with: Interval.PerfectFifth, to: () => Pitch.A },
        { with: Interval.AugmentedFifth, to: () => Pitch.ASharp },
        { with: Interval.MinorSixth, to: () => Pitch.BFlat },
        { with: Interval.MajorSixth, to: () => Pitch.B },
        { with: Interval.DiminishedSeventh, to: () => Pitch.B },
        { with: Interval.MinorSeventh, to: () => Pitch.C },
        { with: Interval.MajorSeventh, to: () => Pitch.CSharp },
        { with: Interval.PerfectOctave, to: () => Pitch.D },
        { with: Interval.MinorNinth, to: () => Pitch.EFlat },
        { with: Interval.MajorNinth, to: () => Pitch.E },
        { with: Interval.AugmentedNinth, to: () => Pitch.ESharp },
        { with: Interval.PerfectEleventh, to: () => Pitch.G },
        { with: Interval.AugmentedEleventh, to: () => Pitch.GSharp },
        { with: Interval.MinorThirteenth, to: () => Pitch.BFlat },
        { with: Interval.MajorThirteenth, to: () => Pitch.B },
      ])
  );

  public static readonly DSharp: Pitch = new Pitch(
    'D#',
    3,
    Accidental.Sharp,
    () => Pitch.E,
    () => Pitch.D,
    () => Pitch.D,
    () => Pitch.D.intervals().sharp()
  );

  public static readonly EFlat: Pitch = new Pitch(
    'Eb',
    3,
    Accidental.Flat,
    () => Pitch.E,
    () => Pitch.D,
    () => Pitch.E,
    () => Pitch.E.intervals().flat()
  );

  public static readonly E: Pitch = new Pitch(
    'E',
    4,
    Accidental.Natural,
    () => Pitch.F,
    () => Pitch.EFlat,
    () => Pitch.E,
    () =>
      new IntervalsToPitches([
        { with: Interval.Unison, to: () => Pitch.E },
        { with: Interval.AugmentedUnison, to: () => Pitch.ESharp },
        { with: Interval.MinorSecond, to: () => Pitch.F },
        { with: Interval.MajorSecond, to: () => Pitch.FSharp },
        { with: Interval.MinorThird, to: () => Pitch.G },
        { with: Interval.AugmentedSecond, to: () => Pitch.G },
        { with: Interval.MajorThird, to: () => Pitch.GSharp },
        { with: Interval.PerfectFourth, to: () => Pitch.A },
        { with: Interval.AugmentedFourth, to: () => Pitch.ASharp },
        { with: Interval.DiminishedFifth, to: () => Pitch.BFlat },
        { with: Interval.Tritone, to: () => Pitch.BFlat },
        { with: Interval.PerfectFifth, to: () => Pitch.B },
        { with: Interval.AugmentedFifth, to: () => Pitch.BSharp },
        { with: Interval.MajorSixth, to: () => Pitch.CSharp },
        { with: Interval.DiminishedSeventh, to: () => Pitch.CSharp },
        { with: Interval.MinorSeventh, to: () => Pitch.D },
        { with: Interval.MajorSeventh, to: () => Pitch.DSharp },
        { with: Interval.PerfectOctave, to: () => Pitch.E },
        { with: Interval.MinorNinth, to: () => Pitch.F },
        { with: Interval.MajorNinth, to: () => Pitch.FSharp },
        { with: Interval.AugmentedNinth, to: () => Pitch.G },
        { with: Interval.PerfectEleventh, to: () => Pitch.A },
        { with: Interval.AugmentedEleventh, to: () => Pitch.ASharp },
        { with: Interval.MinorThirteenth, to: () => Pitch.C },
        { with: Interval.MajorThirteenth, to: () => Pitch.CSharp },
      ])
  );

  public static readonly F: Pitch = new Pitch(
    'F',
    5,
    Accidental.Natural,
    () => Pitch.FSharp,
    () => Pitch.E,
    () => Pitch.F,
    () =>
      new IntervalsToPitches([
        { with: Interval.Unison, to: () => Pitch.F },
        { with: Interval.AugmentedUnison, to: () => Pitch.FSharp },
        { with: Interval.MinorSecond, to: () => Pitch.GFlat },
        { with: Interval.MajorSecond, to: () => Pitch.G },
        { with: Interval.MinorThird, to: () => Pitch.AFlat },
        { with: Interval.AugmentedSecond, to: () => Pitch.GSharp },
        { with: Interval.MajorThird, to: () => Pitch.A },
        { with: Interval.PerfectFourth, to: () => Pitch.BFlat },
        { with: Interval.AugmentedFourth, to: () => Pitch.B },
        { with: Interval.DiminishedFifth, to: () => Pitch.CFlat },
        { with: Interval.Tritone, to: () => Pitch.CFlat },
        { with: Interval.PerfectFifth, to: () => Pitch.C },
        { with: Interval.AugmentedFifth, to: () => Pitch.CSharp },
        { with: Interval.MinorSixth, to: () => Pitch.DFlat },
        { with: Interval.MajorSixth, to: () => Pitch.D },
        { with: Interval.DiminishedSeventh, to: () => Pitch.D },
        { with: Interval.MinorSeventh, to: () => Pitch.EFlat },
        { with: Interval.MajorSeventh, to: () => Pitch.E },
        { with: Interval.PerfectOctave, to: () => Pitch.F },
        { with: Interval.MinorNinth, to: () => Pitch.GFlat },
        { with: Interval.MajorNinth, to: () => Pitch.G },
        { with: Interval.AugmentedNinth, to: () => Pitch.GSharp },
        { with: Interval.PerfectEleventh, to: () => Pitch.BFlat },
        { with: Interval.AugmentedEleventh, to: () => Pitch.B },
        { with: Interval.MinorThirteenth, to: () => Pitch.DFlat },
        { with: Interval.MajorThirteenth, to: () => Pitch.D },
      ])
  );

  public static readonly ESharp: Pitch = new Pitch(
    'E#',
    5,
    Accidental.Sharp,
    () => Pitch.F,
    () => Pitch.E,
    () => Pitch.E,
    () => Pitch.F.intervals().sharp()
  );

  public static readonly FSharp: Pitch = new Pitch(
    'F#',
    6,
    Accidental.Sharp,
    () => Pitch.G,
    () => Pitch.F,
    () => Pitch.F,
    () => Pitch.F.intervals().sharp()
  );

  public static readonly GFlat: Pitch = new Pitch(
    'Gb',
    6,
    Accidental.Flat,
    () => Pitch.G,
    () => Pitch.F,
    () => Pitch.G,
    () => Pitch.G.intervals().flat()
  );

  public static readonly G: Pitch = new Pitch(
    'G',
    7,
    Accidental.Natural,
    () => Pitch.GSharp,
    () => Pitch.GFlat,
    () => Pitch.G,
    () =>
      new IntervalsToPitches([
        { with: Interval.Unison, to: () => Pitch.G },
        { with: Interval.AugmentedUnison, to: () => Pitch.GSharp },
        { with: Interval.MinorSecond, to: () => Pitch.AFlat },
        { with: Interval.MajorSecond, to: () => Pitch.A },
        { with: Interval.MinorThird, to: () => Pitch.BFlat },
        { with: Interval.AugmentedSecond, to: () => Pitch.ASharp },
        { with: Interval.MajorThird, to: () => Pitch.B },
        { with: Interval.PerfectFourth, to: () => Pitch.C },
        { with: Interval.AugmentedFourth, to: () => Pitch.CSharp },
        { with: Interval.DiminishedFifth, to: () => Pitch.DFlat },
        { with: Interval.Tritone, to: () => Pitch.DFlat },
        { with: Interval.PerfectFifth, to: () => Pitch.D },
        { with: Interval.AugmentedFifth, to: () => Pitch.DSharp },
        { with: Interval.MinorSixth, to: () => Pitch.EFlat },
        { with: Interval.MajorSixth, to: () => Pitch.E },
        { with: Interval.DiminishedSeventh, to: () => Pitch.E },
        { with: Interval.MinorSeventh, to: () => Pitch.F },
        { with: Interval.MajorSeventh, to: () => Pitch.FSharp },
        { with: Interval.PerfectOctave, to: () => Pitch.G },
        { with: Interval.MinorNinth, to: () => Pitch.AFlat },
        { with: Interval.MajorNinth, to: () => Pitch.A },
        { with: Interval.AugmentedNinth, to: () => Pitch.ASharp },
        { with: Interval.PerfectEleventh, to: () => Pitch.C },
        { with: Interval.AugmentedEleventh, to: () => Pitch.CSharp },
        { with: Interval.MinorThirteenth, to: () => Pitch.EFlat },
        { with: Interval.MajorThirteenth, to: () => Pitch.E },
      ])
  );

  public static readonly GSharp: Pitch = new Pitch(
    'G#',
    8,
    Accidental.Sharp,
    () => Pitch.A,
    () => Pitch.G,
    () => Pitch.G,
    () => Pitch.G.intervals().sharp()
  );

  public static readonly AFlat: Pitch = new Pitch(
    'Ab',
    8,
    Accidental.Flat,
    () => Pitch.A,
    () => Pitch.G,
    () => Pitch.A,
    () => Pitch.A.intervals().flat()
  );

  public static readonly A: Pitch = new Pitch(
    'A',
    9,
    Accidental.Natural,
    () => Pitch.ASharp,
    () => Pitch.AFlat,
    () => Pitch.A,
    () =>
      new IntervalsToPitches([
        { with: Interval.Unison, to: () => Pitch.A },
        { with: Interval.AugmentedUnison, to: () => Pitch.ASharp },
        { with: Interval.MinorSecond, to: () => Pitch.BFlat },
        { with: Interval.MajorSecond, to: () => Pitch.B },
        { with: Interval.MinorThird, to: () => Pitch.C },
        { with: Interval.AugmentedSecond, to: () => Pitch.BSharp },
        { with: Interval.MajorThird, to: () => Pitch.CSharp },
        { with: Interval.PerfectFourth, to: () => Pitch.D },
        { with: Interval.AugmentedFourth, to: () => Pitch.DSharp },
        { with: Interval.DiminishedFifth, to: () => Pitch.EFlat },
        { with: Interval.Tritone, to: () => Pitch.EFlat },
        { with: Interval.PerfectFifth, to: () => Pitch.E },
        { with: Interval.AugmentedFifth, to: () => Pitch.ESharp },
        { with: Interval.MinorSixth, to: () => Pitch.F },
        { with: Interval.MajorSixth, to: () => Pitch.FSharp },
        { with: Interval.DiminishedSeventh, to: () => Pitch.FSharp },
        { with: Interval.MinorSeventh, to: () => Pitch.G },
        { with: Interval.MajorSeventh, to: () => Pitch.GSharp },
        { with: Interval.PerfectOctave, to: () => Pitch.A },
        { with: Interval.MinorNinth, to: () => Pitch.BFlat },
        { with: Interval.MajorNinth, to: () => Pitch.B },
        { with: Interval.AugmentedNinth, to: () => Pitch.BSharp },
        { with: Interval.PerfectEleventh, to: () => Pitch.D },
        { with: Interval.AugmentedEleventh, to: () => Pitch.DSharp },
        { with: Interval.MinorThirteenth, to: () => Pitch.F },
        { with: Interval.MajorThirteenth, to: () => Pitch.FSharp },
      ])
  );

  public static readonly ASharp: Pitch = new Pitch(
    'A#',
    10,
    Accidental.Sharp,
    () => Pitch.B,
    () => Pitch.A,
    () => Pitch.A,
    () => Pitch.A.intervals().sharp()
  );

  public static readonly BFlat: Pitch = new Pitch(
    'Bb',
    10,
    Accidental.Flat,
    () => Pitch.B,
    () => Pitch.A,
    () => Pitch.B,
    () => Pitch.B.intervals().flat()
  );

  public static readonly B: Pitch = new Pitch(
    'B',
    11,
    Accidental.Natural,
    () => Pitch.C,
    () => Pitch.BFlat,
    () => Pitch.B,
    () =>
      new IntervalsToPitches([
        { with: Interval.Unison, to: () => Pitch.B },
        { with: Interval.AugmentedUnison, to: () => Pitch.BSharp },
        { with: Interval.MinorSecond, to: () => Pitch.C },
        { with: Interval.MajorSecond, to: () => Pitch.CSharp },
        { with: Interval.MinorThird, to: () => Pitch.D },
        { with: Interval.AugmentedSecond, to: () => Pitch.D },
        { with: Interval.MajorThird, to: () => Pitch.DSharp },
        { with: Interval.PerfectFourth, to: () => Pitch.E },
        { with: Interval.AugmentedFourth, to: () => Pitch.ESharp },
        { with: Interval.DiminishedFifth, to: () => Pitch.F },
        { with: Interval.Tritone, to: () => Pitch.F },
        { with: Interval.PerfectFifth, to: () => Pitch.FSharp },
        { with: Interval.AugmentedFifth, to: () => Pitch.FSharp },
        { with: Interval.MinorSixth, to: () => Pitch.G },
        { with: Interval.MajorSixth, to: () => Pitch.GSharp },
        { with: Interval.DiminishedSeventh, to: () => Pitch.GSharp },
        { with: Interval.MinorSeventh, to: () => Pitch.A },
        { with: Interval.MajorSeventh, to: () => Pitch.ASharp },
        { with: Interval.PerfectOctave, to: () => Pitch.B },
        { with: Interval.MinorNinth, to: () => Pitch.C },
        { with: Interval.MajorNinth, to: () => Pitch.CSharp },
        { with: Interval.AugmentedNinth, to: () => Pitch.CSharp },
        { with: Interval.PerfectEleventh, to: () => Pitch.E },
        { with: Interval.AugmentedEleventh, to: () => Pitch.ESharp },
        { with: Interval.MinorThirteenth, to: () => Pitch.G },
        { with: Interval.MajorThirteenth, to: () => Pitch.GSharp },
      ])
  );

  public static readonly BSharp: Pitch = new Pitch(
    'C',
    0,
    Accidental.Sharp,
    () => Pitch.C,
    () => Pitch.B,
    () => Pitch.B,
    () => Pitch.C.intervals().sharp()
  );

  public static readonly CFlat: Pitch = new Pitch(
    'Cb',
    11,
    Accidental.Flat,
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

  public static readonly natural = [Pitch.C, Pitch.D, Pitch.E, Pitch.F, Pitch.G, Pitch.A, Pitch.B];
}

interface IntervalToPitch {
  with: Interval;
  to: () => Pitch;
}

class IntervalsToPitches {
  constructor(private readonly intervalsToPitches: IntervalToPitch[]) {}

  sharp = () => {
    return new IntervalsToPitches(
      this.intervalsToPitches.map(
        (it) =>
          ({
            with: it.with,
            to: it.to().sharp,
          }) as IntervalToPitch
      )
    );
  };

  flat = () => {
    return new IntervalsToPitches(
      this.intervalsToPitches.map(
        (it) =>
          ({
            with: it.with,
            to: it.to().flat,
          }) as IntervalToPitch
      )
    );
  };

  transposerFor(interval: Interval): (() => Pitch) | undefined {
    return this.intervalsToPitches.find((it) => it.with === interval)?.to;
  }

  intervalTo(to: Pitch): Interval | undefined {
    return this.intervalsToPitches.find((it) => it.to() === to)?.with;
  }
}

export const enum PitchLineDirection {
  Ascending,
  Descending,
  OctaveDown,
  Neutral,
}

export class PitchLine implements Iterable<Pitch> {
  constructor(
    private readonly line: Pitch[] = [],
    private readonly direction: PitchLineDirection = PitchLineDirection.Neutral
  ) {}

  insertHalfToneBetween(first: Pitch, second: Pitch) {
    const firstIndex = this.line.findIndex((p) => p === first);
    const secondIndex = this.line.findIndex((p) => p === second);

    if (firstIndex !== -1 && secondIndex !== -1) {
      const newLine = this.line;
      newLine.splice(secondIndex, 0, first.flat());

      return new PitchLine(newLine, this.Direction);
    }

    return this;
  }

  get Direction(): PitchLineDirection {
    return this.direction;
  }

  pitchAt(index: number) {
    return this.line[index];
  }

  *[Symbol.iterator](): Iterator<Pitch> {
    for (const pitch of this.line) {
      yield pitch;
    }
  }
}

// const PITCHES: number = 12;
// const NATURAL_PITCHES: number = 7;

// enum Direction {
//     Ascending,
//     Descending,
// }

// enum PitchLetter {
//     C,
//     D,
//     E,
//     F,
//     G,
//     A,
//     B,
// }

// const PITCH_LETTERS: PitchLetter[] = [
//     PitchLetter.C,
//     PitchLetter.D,
//     PitchLetter.E,
//     PitchLetter.F,
//     PitchLetter.G,
//     PitchLetter.A,
//     PitchLetter.B,
// ];

// enum Accidental {
//     Flat,
//     Sharp,
//     None,
// }

// const NO_ACCIDENTALS: Accidental[] = [Accidental.None, Accidental.None, Accidental.None];
// const SHARP: Accidental[] = [Accidental.Sharp, Accidental.None, Accidental.None];
// const FLAT: Accidental[] = [Accidental.Flat, Accidental.None, Accidental.None];

// class Octave {
//     // Implement Octave class here
//     // ...
// }

// class Interval {
//     // Implement Interval class here
//     // ...
// }

// class Pitch {
//     private letter: PitchLetter;
//     private accidentals: Accidental[];
//     private octave: Octave;

//     constructor(letter: PitchLetter, accidentals: Accidental[], octave: Octave) {
//         this.letter = letter;
//         this.accidentals = accidentals;
//         this.octave = octave;
//     }

//     public name(): string {
//         return `${PitchLetter[this.letter]}${this.accidentalsToString()}`;
//     }

//     public midiValue(): number {
//         return this.letterValue() + this.accidentalModifier() + this.octave.midiValue();
//     }

//     public octaveUp(): Pitch {
//         return new Pitch(this.letter, [...this.accidentals], this.octave.up());
//     }

//     public octaveDown(): Pitch {
//         return new Pitch(this.letter, [...this.accidentals], this.octave.down());
//     }

//     public isEnharmonicWith(other: Pitch): boolean {
//         return this.midiValue() === other.midiValue();
//     }

//     public hasSamePitchLetterAs(other: Pitch): boolean {
//         return this.letter === other.letter;
//     }

//     public absoluteDistanceTo(other: Pitch): number {
//         return (this.absoluteDistance(other.letter)
//             + this.accidentalModifier()
//             + other.accidentalModifier()) % PITCHES;
//     }

//     public sharp(): Pitch {
//         if (this.isNaturalCOrBOrHasSharpAccidental()) {
//             return this.transpose(Interval.MinorSecond, Direction.Ascending);
//         } else {
//             return this.sameLetterSharp();
//         }
//     }

//     public flat(): Pitch {
//         if (this.isNaturalCOrFOrHasFlatAccidental()) {
//             return this.transpose(Interval.MinorSecond, Direction.Descending);
//         } else {
//             return this.sameLetterFlat();
//         }
//     }

//     public transpose(interval: Interval, direction: Direction): Pitch {
//         const newPitchLetter = this.transposeLetter(interval, direction);
//         if (newPitchLetter !== null) {
//             const distanceToNewPitchLetter = this.calculateDistanceToNewPitchLetter(newPitchLetter);
//             const remainingDistance = this.calculateRemainingDistance(
//                 interval,
//                 direction,
//                 distanceToNewPitchLetter
//             );
//             const newAccidentals = this.adjustAccidentals(remainingDistance);
//             const newOctave = this.adjustOctave(interval, newPitchLetter, direction);

//             return new Pitch(newPitchLetter, newAccidentals, newOctave);
//         } else {
//             return this.clone();
//         }
//     }

//     // ... implement other methods ...

//     private accidentalsToString(): string {
//         return this.accidentals.map(accidental => Accidental[accidental]).join('');
//     }

//     private sameLetterFlat(): Pitch {
//         return this.transpose(Interval.AugmentedUnison, Direction.Descending);
//     }

//     private sameLetterSharp(): Pitch {
//         return this.transpose(Interval.AugmentedUnison, Direction.Ascending);
//     }

//     private accidentalModifier(): number {
//         return this.accidentals.reduce((sum, acc) => sum + this.accidentalValue(acc), 0);
//     }

//     private accidentalValue(accidental: Accidental): number {
//         switch (accidental) {
//             case Accidental.Flat: return -1;
//             case Accidental.Sharp: return 1;
//             case Accidental.None: return 0;
//         }
//     }

//     private isNaturalCOrBOrHasSharpAccidental(): boolean {
//         return ((this.letter === PitchLetter.B || this.letter === PitchLetter.E)
//                 && this.accidentals.every(acc => acc === Accidental.None))
//             || this.accidentals.includes(Accidental.Sharp);
//     }

//     private isNaturalCOrFOrHasFlatAccidental(): boolean {
//         return ((this.letter === PitchLetter.C || this.letter === PitchLetter.F)
//                 && this.accidentals.every(acc => acc === Accidental.None))
//             || this.accidentals.includes(Accidental.Flat);
//     }

//     // ... implement other private methods ...

//     public static c(octave: Octave): Pitch {
//         return new Pitch(PitchLetter.C, NO_ACCIDENTALS, octave);
//     }

//     public static cSharp(octave: Octave): Pitch {
//         return new Pitch(PitchLetter.C, SHARP, octave);
//     }

//     // ... implement other static factory methods ...
// }

// class Line {
//     private line: Pitch[];

//     constructor(pitches: Pitch[]) {
//         this.line = pitches;
//     }

//     public *[Symbol.iterator](): Iterator<Pitch> {
//         yield* this.line;
//     }

//     public toString(): string {
//         return this.line.map(pitch => pitch.toString()).join(' ');
//     }
// }

// // ... implement other constants and exports ...

// export {
//     Direction,
//     PitchLetter,
//     Accidental,
//     Octave,
//     Interval,
//     Pitch,
//     Line,
// };
