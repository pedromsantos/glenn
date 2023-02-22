import { Duration } from '../Domain/Duration';
import { Note, Octave } from '../Domain/Note';
import Pitch, { Accidental } from '../Domain/Pitch';

export class abcPitch {
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

export class abcNote {
  octaveTransformations: Map<string, string> = new Map<string, string>([
    [Octave.C8.Name, "''''"],
    [Octave.C7.Name, "'''"],
    [Octave.C6.Name, "''"],
    [Octave.C3.Name, ','],
    [Octave.C2.Name, ',,'],
    [Octave.C1.Name, ',,,'],
    [Octave.C0.Name, ',,,,'],
  ]);

  constructor(private readonly note: Note, private readonly defaultDuration: Duration) {}

  toString() {
    return this.toDuration(this.toOctave(new abcPitch(this.note.Pitch).toString()));
  }

  private toDuration(note: string) {
    const durationMultiplier = this.defaultDuration.equivalentTo(this.note.Duration);
    const multiplierOrDivisor = this.note.DurationValue < this.defaultDuration.value ? '/' : '';

    return (
      note + multiplierOrDivisor + (durationMultiplier > 1 ? durationMultiplier.toString() : '')
    );
  }

  private toOctave(note: string) {
    const octaveTransformation = this.octaveTransformations.get(this.note.OctaveName);

    if (octaveTransformation) {
      return note + octaveTransformation;
    }

    if (this.note.Octave === Octave.C5) {
      return note.toLowerCase();
    }

    return note;
  }
}
