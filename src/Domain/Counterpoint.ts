import { Duration } from './Duration';
import { MelodicPhrase, Note, Octave } from './Note';
import Pitch from './Pitch';
import Scale, { ScaleDegree, ScaleHarmonizer, ScalePattern, TriadHarmonizer } from './Scale';

export class Voice {
  private static readonly all: Voice[] = [];

  private constructor(private readonly minRange: Note, private readonly maxRange: Note) {
    Voice.all.push(this);
  }

  get Min() {
    return this.minRange;
  }

  get Max() {
    return this.maxRange;
  }

  public static readonly Bass: Voice = new Voice(
    new Note(Pitch.E, Duration.Quarter, Octave.C2),
    new Note(Pitch.E, Duration.Quarter, Octave.C4)
  );

  public static readonly Baritone: Voice = new Voice(
    new Note(Pitch.G, Duration.Quarter, Octave.C2),
    new Note(Pitch.G, Duration.Quarter, Octave.C4)
  );

  public static readonly Tenor: Voice = new Voice(
    new Note(Pitch.C, Duration.Quarter, Octave.C3),
    new Note(Pitch.C, Duration.Quarter, Octave.C5)
  );

  public static readonly Alto: Voice = new Voice(
    new Note(Pitch.F, Duration.Quarter, Octave.C3),
    new Note(Pitch.F, Duration.Quarter, Octave.C5)
  );

  public static readonly MezzoSoprano: Voice = new Voice(
    new Note(Pitch.A, Duration.Quarter, Octave.C3),
    new Note(Pitch.A, Duration.Quarter, Octave.C5)
  );

  public static readonly Soprano: Voice = new Voice(
    new Note(Pitch.C, Duration.Quarter, Octave.C4),
    new Note(Pitch.C, Duration.Quarter, Octave.C5)
  );
}

export interface CounterPointParts {
  counterPoint: {
    phrase: MelodicPhrase;
    voice: Voice;
  };
  cantusFirmus: MelodicPhrase;
  cantusFirmusHarmony: CounterPointHarmony;
}

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

  constructor(private readonly parts: CounterPointParts, scale: Scale) {
    this.rules = new CounterPoinRules(scale);
  }

  validate(): CounterPointRuleStatus {
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
    this.rules = [new OnlyChordTones(scale), new OnlyWholeToneNotes(), new OnlyNotesInRange()];
  }

  apply(parts: CounterPointParts): CounterPointRuleStatus {
    for (const rule of this.rules) {
      const status = rule.validate(parts);
      if (!status.isValid) {
        return status;
      }
    }

    return { isValid: true };
  }
}

interface CounterPointRule {
  validate(parts: CounterPointParts): CounterPointRuleStatus;
}

class OnlyChordTones implements CounterPointRule {
  private harmonizer: ScaleHarmonizer = new TriadHarmonizer(
    new Scale(ScalePattern.Ionian, Pitch.C)
  );

  constructor(scale: Scale = new Scale(ScalePattern.Ionian, Pitch.C)) {
    this.harmonizer = new TriadHarmonizer(scale);
  }

  validate(parts: CounterPointParts): CounterPointRuleStatus {
    const harmony = [...parts.cantusFirmusHarmony].map((sd) => this.harmonizer.chordFor(sd));
    let index = 0;

    for (const note of parts.counterPoint.phrase) {
      const chord = harmony[index];
      const isChordTone = chord ? note.isChordToneOf(chord) : false;

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
      if (note.Duration !== Duration.Whole) {
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
        note.MidiNumber > parts.counterPoint.voice.Max.MidiNumber ||
        note.MidiNumber < parts.counterPoint.voice.Min.MidiNumber
      ) {
        return { isValid: false, message: 'not in range', index: index };
      }

      index++;
    }

    return { isValid: true };
  }
}
