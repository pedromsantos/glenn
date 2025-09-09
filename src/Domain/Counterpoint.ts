import { Duration } from './Duration';
import { Voice } from './Instrument';
import { Interval } from './Interval';
import { MelodicLine, Note } from './Note';
import { Pitch } from './Pitch';
import {
  Scale,
  ScaleDegree,
  ScaleHarmonizer,
  ScalePattern,
  SeventhHarmonizer,
  TriadHarmonizer,
} from './Scale';

export interface CounterPointParts {
  counterPoint: {
    phrase: MelodicLine;
    voice: Voice;
  };
  cantusFirmus: MelodicLine;
  cantusFirmusHarmony: CounterPointHarmony;
}

export const createCounterpointParts = (
  counterpoint: MelodicLine,
  cantusFirmus: MelodicLine,
  harmony: ScaleDegree[],
  voice: Voice = Voice.MezzoSoprano
): CounterPointParts => {
  return {
    counterPoint: {
      phrase: counterpoint,
      voice: voice,
    },
    cantusFirmus: cantusFirmus,
    cantusFirmusHarmony: new CounterPointHarmony(harmony),
  };
};

export class CounterPointHarmony implements Iterable<ScaleDegree> {
  constructor(private readonly harmony: ScaleDegree[]) {}

  *[Symbol.iterator](): Iterator<ScaleDegree> {
    for (const degree of this.harmony) {
      yield degree;
    }
  }
}

export class FirstSpecies {
  private rules: CounterPoinRules;

  constructor(
    private readonly parts: CounterPointParts,
    scale: Scale
  ) {
    this.rules = new CounterPoinRules(scale);
  }

  validate(): CounterPointRuleStatus[] {
    return this.rules.apply(this.parts);
  }
}

interface CounterPointRuleStatus {
  isValid: boolean;
  message?: string;
  index?: number;
}

class CounterPoinRules {
  private rules: CounterPointRule[] = [];

  constructor(scale: Scale) {
    this.rules = [
      new OnlyWholeToneNotes(),
      new OnlyNotesInRange(),
      new NoRepeatedNotes(),
      new NoBigLeaps(),
      new NoInvalidIntervals([Interval.MajorSecond, Interval.PerfectFourth, Interval.MajorSeventh]),
      new OnlyChordTones(new SeventhHarmonizer(scale)),
    ];
  }

  apply(parts: CounterPointParts): CounterPointRuleStatus[] {
    return this.rules.flatMap((r) => {
      const status = r.validate(parts);
      return status.isValid ? [] : [status];
    });
  }
}

interface CounterPointRule {
  validate(parts: CounterPointParts): CounterPointRuleStatus;
}

class OnlyChordTones implements CounterPointRule {
  private harmonizer: ScaleHarmonizer = new TriadHarmonizer(
    new Scale(ScalePattern.Ionian, Pitch.C)
  );

  constructor(harmonizer: ScaleHarmonizer) {
    this.harmonizer = harmonizer;
  }

  validate(parts: CounterPointParts): CounterPointRuleStatus {
    const harmony = Array.from(parts.cantusFirmusHarmony).map((sd) => this.harmonizer.chordFor(sd));
    let index = 0;

    for (const note of parts.counterPoint.phrase) {
      const chord = harmony[index];
      const isChordTone = chord ? (note as Note).isChordToneOf(chord) : false;

      if (!isChordTone) {
        return { isValid: false, message: 'not a chord tone', index: index };
      }

      index++;
    }

    return { isValid: true };
  }
}

class OnlyWholeToneNotes implements CounterPointRule {
  validate(parts: CounterPointParts): CounterPointRuleStatus {
    let index = 0;

    for (const note of parts.counterPoint.phrase) {
      if ((note as Note).Duration !== Duration.Whole) {
        return { isValid: false, message: 'not a whole note', index: index };
      }

      index++;
    }

    return { isValid: true };
  }
}

class OnlyNotesInRange implements CounterPointRule {
  validate(parts: CounterPointParts): CounterPointRuleStatus {
    let index = 0;

    for (const note of parts.counterPoint.phrase) {
      if (
        (note as Note).MidiNumbers > parts.counterPoint.voice.Max.MidiNumbers ||
        (note as Note).MidiNumbers < parts.counterPoint.voice.Min.MidiNumbers
      ) {
        return { isValid: false, message: 'not in range', index: index };
      }

      index++;
    }

    return { isValid: true };
  }
}

class NoRepeatedNotes implements CounterPointRule {
  validate(parts: CounterPointParts): CounterPointRuleStatus {
    let index = 0;
    let previous: Note | undefined = undefined;

    for (const note of parts.counterPoint.phrase) {
      if (previous && (note as Note).isSamePitch(previous)) {
        return { isValid: false, message: 'repeated note', index: index };
      }
      previous = note as Note;
      index++;
    }

    return { isValid: true };
  }
}

class NoBigLeaps implements CounterPointRule {
  validate(parts: CounterPointParts): CounterPointRuleStatus {
    let index = 0;
    let previous: Note | undefined = undefined;

    for (const note of parts.counterPoint.phrase) {
      if (previous && (note as Note).intervalTo(previous).isLargarThan(Interval.MajorSixth)) {
        return { isValid: false, message: 'invalid leap', index: index };
      }
      previous = note as Note;
      index++;
    }

    return { isValid: true };
  }
}

class NoInvalidIntervals implements CounterPointRule {
  constructor(private readonly intervals: Interval[]) {}

  validate(parts: CounterPointParts): CounterPointRuleStatus {
    const cantusFirmus = Array.from(parts.cantusFirmus);
    let index = 0;

    for (const note of parts.counterPoint.phrase) {
      const cantusFirmusNote = cantusFirmus[index];

      for (const interval of this.intervals) {
        if (cantusFirmusNote?.intervalTo(note as Note) === interval) {
          return {
            isValid: false,
            message: `invalid interval of a ${interval.Name}`,
            index: index,
          };
        }
      }

      index++;
    }

    return { isValid: true };
  }
}
