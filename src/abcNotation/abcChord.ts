import { Duration } from 'src/Domain/Duration';

import { Chord } from '../Domain/Chord';
import { AbcNote } from './abcNote';

export class AbcChord {
  constructor(
    private readonly chord: Chord,
    private readonly defaultDuration: Duration
  ) {}

  toString() {
    const chordNotes = this.chord.Notes;
    const abcNotes = [...chordNotes].map((n) => new AbcNote(n, this.defaultDuration));

    return `[${abcNotes.map((n) => n.toString()).join('')}]`;
  }
}

export class AbcGuitarChord {
  constructor(private readonly chord: Chord) {}

  toString() {
    return `"${this.chord.Abbreviation}"`;
  }
}
