import { ChordPrimitives } from 'src/primitives/Chord';
import { DurationPrimitives } from 'src/primitives/Duration';

import { AbcNote } from './abcNote';

export class AbcChord {
  constructor(
    private readonly chord: ChordPrimitives,
    private readonly defaultDuration: DurationPrimitives
  ) {}

  toString() {
    const chordNotes = this.chord.pitches;
    const abcNotes = chordNotes.map(
      (p) =>
        new AbcNote(
          { pitch: p.pitch, duration: this.chord.duration, octave: this.chord.octave },
          this.defaultDuration
        )
    );

    return `[${abcNotes.map((n) => n.toString()).join('')}]`;
  }
}

export class AbcGuitarChord {
  constructor(private readonly chord: ChordPrimitives) {}

  toString() {
    return `"${this.chord.abbreviation}"`;
  }
}
