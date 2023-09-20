import { Duration } from '../Domain/Duration';
import { Note, Octave, Rest } from '../Domain/Note';
import { Accidental, Pitch } from '../Domain/Pitch';

export class AbcPitch {
  constructor(private readonly pitch: Pitch) {}

  toString() {
    return this.toAccidental(this.pitch.natural().Name);
  }

  private toAccidental(pitch: string) {
    return this.pitch.Accidental === Accidental.Sharp
      ? `^${pitch}`
      : this.pitch.Accidental === Accidental.Flat
      ? `_${pitch}`
      : pitch;
  }
}

export class AbcNote {
  octaveTransformations: Map<string, string> = new Map<string, string>([
    [Octave.C8.Name, "''''"],
    [Octave.C7.Name, "'''"],
    [Octave.C6.Name, "''"],
    [Octave.C3.Name, ','],
    [Octave.C2.Name, ',,'],
    [Octave.C1.Name, ',,,'],
    [Octave.C0.Name, ',,,,'],
  ]);

  constructor(
    private readonly note: Note,
    private readonly defaultDuration: Duration
  ) {}

  toString() {
    return (
      this.toOctave(new AbcPitch(this.note.Pitch.pop()!).toString()) +
      new AbcDuration(this.note.Duration, this.defaultDuration).toString()
    );
  }

  private toOctave(note: string) {
    const octaveTransformation = this.octaveTransformations.get(this.note.OctaveName);

    if (octaveTransformation) {
      return note + octaveTransformation;
    }

    if (this.note.Octave.pop() === Octave.C5) {
      return note.toLowerCase();
    }

    return note;
  }
}

export class AbcRest {
  constructor(
    private readonly rest: Rest,
    private readonly defaultDuration: Duration
  ) {}

  toString() {
    return 'z' + new AbcDuration(this.rest.Duration, this.defaultDuration).toString();
  }
}

class AbcDuration {
  constructor(
    private readonly duration: Duration,
    private readonly defaultDuration: Duration
  ) {}

  toString() {
    const durationMultiplier = this.defaultDuration.equivalentTo(this.duration);
    const multiplierOrDivisor = this.duration.value < this.defaultDuration.value ? '/' : '';

    return multiplierOrDivisor + (durationMultiplier > 1 ? durationMultiplier.toString() : '');
  }
}
