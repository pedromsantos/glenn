import {
  MelodicPhrasePrimitives,
  NotePrimitives,
  OctavePrimitives,
  RestPrimitives,
} from '../primitives/Note';
import { PlayablePrimitives } from '../primitives/Playables';
import { Chord } from './Chord';
import { Duration } from './Duration';
import { Interval, IntervalDirection } from './Interval';
import { Pitch } from './Pitch';

export class Octave {
  private static readonly all: Octave[] = [];

  private constructor(
    private readonly name: string,
    private readonly shortName: string,
    private readonly value: number,
    private readonly midiBaseValue: number,
    public readonly up: () => Octave,
    public readonly down: () => Octave
  ) {
    Octave.all.push(this);
  }

  public static readonly C0: Octave = new Octave(
    'Sub contra',
    'C0',
    -16,
    0,
    () => Octave.C1,
    () => Octave.C0
  );
  public static readonly C1: Octave = new Octave(
    'Contra',
    'C1',
    -8,
    12,
    () => Octave.C2,
    () => Octave.C0
  );
  public static readonly C2: Octave = new Octave(
    'Great',
    'C2',
    -4,
    24,
    () => Octave.C3,
    () => Octave.C1
  );
  public static readonly C3: Octave = new Octave(
    'Small',
    'C3',
    -2,
    36,
    () => Octave.C4,
    () => Octave.C2
  );
  public static readonly C4: Octave = new Octave(
    'One line',
    'C4',
    1,
    48,
    () => Octave.C5,
    () => Octave.C3
  );
  public static readonly C5: Octave = new Octave(
    'Two line',
    'C5',
    2,
    60,
    () => Octave.C6,
    () => Octave.C4
  );
  public static readonly C6: Octave = new Octave(
    'Three line',
    'C6',
    4,
    72,
    () => Octave.C7,
    () => Octave.C5
  );
  public static readonly C7: Octave = new Octave(
    'Four line',
    'C7',
    8,
    84,
    () => Octave.C8,
    () => Octave.C6
  );
  public static readonly C8: Octave = new Octave(
    'Five line',
    'C8',
    16,
    96,
    () => Octave.C8,
    () => Octave.C7
  );

  get Name() {
    return this.shortName;
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
      name: this.name,
      shortName: this.shortName,
      value: this.value,
      midi: this.midiBaseValue,
    };
  }

  static From(state: OctavePrimitives): Octave {
    const value = state.value;
    const shortName = state.shortName;
    const octave: Octave | undefined = Octave.all.find(
      (o: Octave) => o.value === value && o.shortName === shortName
    );

    if (!octave) {
      throw new Error('Invalid octave value');
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

  octaveUp() {
    return new Note(this.pitch, this.duration, this.octave.up());
  }

  octaveDown() {
    return new Note(this.pitch, this.duration, this.octave.down());
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

  hasSamePitch(pitch: Pitch) {
    return this.pitch.equal(pitch);
  }

  hasSameOctave(octave: Octave) {
    return this.octave === octave;
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
    const notePrimitives: NotePrimitives = {
      pitch: this.pitch.To,
      duration: this.duration.To,
      octave: this.octave.To,
    };
    return notePrimitives;
  }

  get ToPlayablePrimitives(): PlayablePrimitives {
    const playablePrimitives: PlayablePrimitives = {
      note: this.To,
    };
    return playablePrimitives;
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
    const playablePrimitives: PlayablePrimitives = {
      rest: this.To,
    };
    return playablePrimitives;
  }
}

export class MelodicLine implements Iterable<Note> {
  private phrase: Note[] = [];

  constructor(notes: Note[]) {
    this.phrase = notes;
  }

  slice(start: number, end?: number): MelodicLine {
    return new MelodicLine(this.phrase.slice(start, end));
  }

  concat(melodicLine: MelodicLine): void {
    this.phrase = this.phrase.concat([...melodicLine]);
  }

  appendOctaveAbove(): MelodicLine {
    return new MelodicLine(this.phrase.concat(this.phrase.map((n) => n.octaveUp())));
  }

  prependOctaveDown() {
    return new MelodicLine(this.phrase.map((n) => n.octaveDown()).concat(this.phrase));
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

  get lastNote() {
    return this.phrase[this.phrase.length - 1];
  }

  *[Symbol.iterator](): Iterator<Note> {
    for (const note of this.phrase) {
      yield note;
    }
  }

  get length() {
    return this.phrase.length;
  }

  get To(): MelodicPhrasePrimitives {
    const melodicPhrasePrimitives: MelodicPhrasePrimitives = {
      notes: this.phrase.map((note) => note.To),
    };
    return melodicPhrasePrimitives;
  }
}
