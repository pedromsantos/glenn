import { DurationPrimitives } from '../primitives/Duration';
import { NotePrimitives, RestPrimitives } from '../primitives/Note';
import { PitchPrimitives } from '../primitives/Pitch';

export class AbcPitch {
  constructor(private readonly pitch: PitchPrimitives) {}

  toString() {
    return this.toAccidental();
  }

  private toAccidental() {
    if (this.pitch.accidental === 1) {
      return `^${this.pitch.naturalName}`;
    }
    if (this.pitch.accidental === -1) {
      return `_${this.pitch.naturalName}`;
    }

    return this.pitch.naturalName;
  }
}

export class AbcNote {
  octaveTransformations: Map<number, string> = new Map<number, string>([
    [16, "''''"],
    [8, "'''"],
    [4, "''"],
    [-2, ','],
    [-4, ',,'],
    [-8, ',,,'],
    [-16, ',,,,'],
  ]);

  constructor(
    private readonly note: NotePrimitives,
    private readonly defaultDuration: DurationPrimitives
  ) {}

  toString() {
    return (
      this.toOctave(new AbcPitch(this.note.pitch).toString()) +
      new AbcDuration(this.note.duration, this.defaultDuration).toString()
    );
  }

  private toOctave(note: string) {
    const octaveTransformation = this.octaveTransformations.get(this.note.octave.value);

    if (octaveTransformation) {
      return note + octaveTransformation;
    }

    if (this.note.octave.value === 2) {
      return note.toLowerCase();
    }

    return note;
  }
}

export class AbcRest {
  constructor(
    private readonly rest: RestPrimitives,
    private readonly defaultDuration: DurationPrimitives
  ) {}

  toString() {
    return 'z' + new AbcDuration(this.rest.duration, this.defaultDuration).toString();
  }
}

class AbcDuration {
  constructor(
    private readonly duration: DurationPrimitives,
    private readonly defaultDuration: DurationPrimitives
  ) {}

  toString() {
    const multiplierOrDivisor = this.duration.value < this.defaultDuration.value ? '/' : '';

    return (
      multiplierOrDivisor +
      (this.equivalentDurations() > 1 ? this.equivalentDurations().toString() : '')
    );
  }

  private equivalentDurations() {
    if (this.defaultDuration.value >= this.duration.value) {
      return this.defaultDuration.value / this.duration.value;
    }

    return this.duration.value / this.defaultDuration.value;
  }
}
