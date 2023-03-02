import { TimeSignature } from './Duration';
import { Note } from './Note';

export class NoteFragment implements Iterable<Note> {
  private readonly notes: Note[] = [];

  push(note: Note): void {
    this.notes.push(note);
  }

  get ticks(): number {
    return this.notes.reduce((total, current) => total + current.tick, 0);
  }

  *[Symbol.iterator](): Iterator<Note> {
    for (const note of this.notes) {
      yield note;
    }
  }
}

export class Measure implements Iterable<Note> {
  protected fragment: NoteFragment;
  private readonly timeSignature: TimeSignature;

  constructor(timeSignature: TimeSignature) {
    this.fragment = new NoteFragment();
    this.timeSignature = timeSignature;
  }

  add(note: Note): Measure {
    if (this.fragment.ticks + note.tick > this.timeSignature.ticksPerMeasure) {
      throw new RangeError(`cannot fit -${note.DurationName} note in measure`);
    }

    this.fragment.push(note);

    if (this.fragment.ticks === this.timeSignature.ticksPerMeasure) {
      return new FullMeasure(this.timeSignature, this.fragment);
    }

    return this;
  }

  *[Symbol.iterator](): Iterator<Note> {
    for (const note of this.fragment) {
      yield note;
    }
  }
}

export class FullMeasure extends Measure {
  constructor(timeSignature: TimeSignature, fragment: NoteFragment) {
    super(timeSignature);
    this.fragment = fragment;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override add(_: Note): Measure {
    return this;
  }
}
