import {
  MelodicPhrasePrimitives,
  NotePrimitives,
  OctavePrimitives,
  RestPrimitives,
} from 'src/primitives/Note';

import { PlayablePrimitives } from '../primitives/Playables';
import { Chord } from './Chord';
import { Duration } from './Duration';
import { Interval, IntervalDirection } from './Interval';
import { Pitch } from './Pitch';

export class Octave {
  private static readonly all: Octave[] = [];

  private constructor(
    private readonly octaveName: string,
    private readonly value: number,
    private readonly midiBaseValue: number,
    public readonly up: () => Octave,
    public readonly down: () => Octave
  ) {
    Octave.all.push(this);
  }

  public static readonly C0: Octave = new Octave(
    'Sub contra',
    -16,
    0,
    () => Octave.C1,
    () => Octave.C0
  );
  public static readonly C1: Octave = new Octave(
    'Contra',
    -8,
    12,
    () => Octave.C2,
    () => Octave.C0
  );
  public static readonly C2: Octave = new Octave(
    'Great',
    -4,
    24,
    () => Octave.C3,
    () => Octave.C1
  );
  public static readonly C3: Octave = new Octave(
    'Small',
    -2,
    36,
    () => Octave.C4,
    () => Octave.C2
  );
  public static readonly C4: Octave = new Octave(
    'One line',
    1,
    48,
    () => Octave.C5,
    () => Octave.C3
  );
  public static readonly C5: Octave = new Octave(
    'Two line',
    2,
    60,
    () => Octave.C6,
    () => Octave.C4
  );
  public static readonly C6: Octave = new Octave(
    'Three line',
    4,
    72,
    () => Octave.C7,
    () => Octave.C5
  );
  public static readonly C7: Octave = new Octave(
    'Four line',
    8,
    84,
    () => Octave.C8,
    () => Octave.C6
  );
  public static readonly C8: Octave = new Octave(
    'Five line',
    16,
    96,
    () => Octave.C8,
    () => Octave.C7
  );

  get Name() {
    return this.octaveName;
  }

  get MidiBaseValue() {
    return this.midiBaseValue;
  }

  lowerThan(other: Octave) {
    return this.value < other.value;
  }

  higherThan(other: Octave) {
    return this.value > other.value;
  }

  get To(): OctavePrimitives {
    return {
      name: this.octaveName,
      value: this.value,
      midi: this.midiBaseValue,
    };
  }

  static From(state: OctavePrimitives) {
    const octave = Octave.all.find((o) => o.value === state.value && o.Name === state.name);

    if (!octave) {
      throw 'Invalid octave value';
    }

    return octave;
  }

  public static get octaves() {
    return Octave.all;
  }
}

export interface Playable {
  get Duration(): Duration;
  get DurationName(): string;
  get tick(): number;
  get Pitches(): Iterable<Pitch>;
  get Octaves(): Iterable<Octave>;
  get OctaveNames(): Iterable<string>;
  get MidiNumbers(): Iterable<number>;
  get Notes(): Iterable<Note>;
  get ToPlayablePrimitives(): PlayablePrimitives;
}

export class Note implements Playable {
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
    if (this.MidiNumbers < other.MidiNumbers) {
      return IntervalDirection.Ascending;
    }

    if (this.MidiNumbers > other.MidiNumbers) {
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
    return this.MidiNumbers.pop() === other.MidiNumbers.pop();
  }

  get Pitches() {
    return [this.pitch];
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

  get Octaves() {
    return [this.octave];
  }

  get OctaveNames() {
    return this.octave.Name;
  }

  get tick() {
    return this.Duration.tick;
  }

  get MidiNumbers() {
    return [this.octave.MidiBaseValue + this.pitch.NumericValue];
  }

  get Notes(): Iterable<Note> {
    return [this];
  }

  get To(): NotePrimitives {
    return {
      pitch: this.pitch.To,
      duration: this.duration.To,
      octave: this.octave.To,
    };
  }

  get ToPlayablePrimitives(): PlayablePrimitives {
    return {
      note: this.To,
    };
  }
}

export class Rest implements Playable {
  constructor(private readonly duration: Duration) {}

  get Pitches(): Iterable<Pitch> {
    return [];
  }

  get Octaves(): Iterable<Octave> {
    return [];
  }

  get OctaveNames(): Iterable<string> {
    return [];
  }

  get MidiNumbers(): Iterable<number> {
    return [];
  }

  get Notes(): Iterable<Note> {
    return [];
  }

  get Duration() {
    return this.duration;
  }

  get DurationName() {
    return this.duration.Name;
  }

  get tick() {
    return this.Duration.tick;
  }

  get To(): RestPrimitives {
    return {
      duration: this.duration.To,
    };
  }

  get ToPlayablePrimitives(): PlayablePrimitives {
    return {
      rest: this.To,
    };
  }
}

export class MelodicLine implements Iterable<Note> {
  private phrase: Note[] = [];

  constructor(notes: Note[]) {
    this.phrase = notes;
  }

  concat(melodicLine: MelodicLine) {
    this.phrase = this.phrase.concat([...melodicLine]);
  }

  lastOctave() {
    const last = this.phrase[this.phrase.length - 1];

    if (last) {
      return last.Octaves[0];
    }

    return undefined;
  }

  highestOctave() {
    let highesOctaveInLine = Octave.C0;

    for (const note of this.phrase) {
      if (note.Octaves[0]?.higherThan(highesOctaveInLine)) {
        highesOctaveInLine = note.Octaves[0];
      }
    }

    return highesOctaveInLine;
  }

  lowestOctave() {
    let lowestOctaveInLine = Octave.C8;

    for (const note of this.phrase) {
      if (note.Octaves[0]?.lowerThan(lowestOctaveInLine)) {
        lowestOctaveInLine = note.Octaves[0];
      }
    }

    return lowestOctaveInLine;
  }

  pitches() {
    return this.phrase.map((n) => n.Pitch);
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
