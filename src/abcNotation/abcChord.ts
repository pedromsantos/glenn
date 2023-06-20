import { Chord } from '../Domain/Chord';
import { AbcPitch } from './abcNote';

export class AbcChord {
  constructor(private readonly chord: Chord) {}

  toString() {
    return `[${[...this.chord].map((p) => new AbcPitch(p).toString()).join('')}]`;
  }
}

export class AbcGuitarChord {
  constructor(private readonly chord: Chord) {}

  toString() {
    return `"${this.chord.Abbreviation}"`;
  }
}
