import { TimeSignature } from './Duration';
import { Note } from './Note';

export class NoteFragment {
  private readonly fragment: Note[] = [];

  push(note: Note): void {
    this.fragment.push(note);
  }

  get ticks(): number {
    return this.fragment.reduce((total, current) => total + current.tick, 0);
  }
}

export class Measure {
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
