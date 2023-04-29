import { Chord } from './Chord';
import { Duration, DurationPrimitives } from './Duration';
import { Interval, IntervalDirection } from './Interval';
import { Pitch, PitchPrimitives } from './Pitch';

export type OctavePrimitives = {
  name: string;
  value: number;
  midi: number;
};

export class Octave {
  private static readonly all: Octave[] = [];

  private constructor(
    private readonly octaveName: string,
    private readonly value: number,
    private readonly midiBaseValue: number
  ) {
    Octave.all.push(this);
  }

  public static readonly C0: Octave = new Octave('Sub contra', -16, 0);
  public static readonly C1: Octave = new Octave('Contra', -8, 12);
  public static readonly C2: Octave = new Octave('Great', -4, 24);
  public static readonly C3: Octave = new Octave('Small', -2, 36);
  public static readonly C4: Octave = new Octave('One line', 1, 48);
  public static readonly C5: Octave = new Octave('Two line', 2, 60);
  public static readonly C6: Octave = new Octave('Three line', 4, 72);
  public static readonly C7: Octave = new Octave('Four line', 8, 84);
  public static readonly C8: Octave = new Octave('Five line', 16, 96);

  get Name() {
    return this.octaveName;
  }

  get MidiBaseValue() {
    return this.midiBaseValue;
  }

  get To(): OctavePrimitives {
    return {
      name: this.octaveName,
      value: this.value,
      midi: this.midiBaseValue,
    };
  }

  public static get octaves() {
    return Octave.all;
  }
}

export interface RhythmElement {
  get Duration(): Duration;
  get DurationName(): string;
  get DurationValue(): number;
}

export type NotePrimitives = {
  pitch: PitchPrimitives;
  duration: DurationPrimitives;
};

export class Note implements RhythmElement {
  constructor(
    private readonly pitch: Pitch,
    private readonly duration: Duration,
    private readonly octave: Octave
  ) {}

  transpose(interval: Interval) {
    return new Note(this.pitch.transpose(interval), this.duration, this.octave);
  }

  intervalTo(to: Note) {
    if (this.octave === to.octave) {
      return this.pitch.intervalTo(to.pitch);
    }

    return this.pitch.intervalTo(to.pitch).raiseOctave();
  }

  intervalDirection(other: Note): IntervalDirection {
    if (this.MidiNumber < other.MidiNumber) {
      return IntervalDirection.Ascending;
    }

    if (this.MidiNumber > other.MidiNumber) {
      return IntervalDirection.Descending;
    }

    return IntervalDirection.Level;
  }

  isChordToneOf(chord: Chord) {
    for (const chordTone of chord) {
      if (this.pitch === chordTone) {
        return true;
      }
    }

    return false;
  }

  isSamePitch(other: Note) {
    return this.MidiNumber === other.MidiNumber;
  }

  get Pitch() {
    return this.pitch;
  }

  get Duration() {
    return this.duration;
  }

  get DurationName() {
    return this.duration.Name;
  }

  get DurationValue() {
    return this.duration.value;
  }

  get Octave() {
    return this.octave;
  }

  get OctaveName() {
    return this.octave.Name;
  }

  get tick() {
    return this.Duration.tick;
  }

  get MidiNumber() {
    return this.octave.MidiBaseValue + this.pitch.NumericValue;
  }

  get To(): NotePrimitives {
    return {
      pitch: this.pitch.To,
      duration: this.duration.To,
    };
  }
}

export class Rest implements RhythmElement {
  constructor(private readonly duration: Duration) {}

  get Duration() {
    return this.duration;
  }

  get DurationName() {
    return this.duration.Name;
  }

  get DurationValue() {
    return this.duration.value;
  }
}

export type MelodicPhrasePrimitives = {
  notes: NotePrimitives[];
};

export class MelodicPhrase implements Iterable<Note> {
  private readonly phrase: Note[] = [];

  constructor(notes: Note[]) {
    this.phrase = notes;
  }

  *[Symbol.iterator](): Iterator<Note> {
    for (const note of this.phrase) {
      yield note;
    }
  }

  get To(): MelodicPhrasePrimitives {
    return {
      notes: this.phrase.map((note) => note.To),
    };
  }
}
