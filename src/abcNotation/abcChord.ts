import { Chord } from '../Domain/Chord';
import { abcPitch } from './abcNote';

export class abcChord {
  constructor(private readonly chord: Chord) {}

  toString() {
    return `[${[...this.chord].map((p) => new abcPitch(p).toString()).join('')}]`;
  }
}
