import { Chord } from 'src/Domain/Chord';
import { DurationPrimitives } from 'src/primitives/Duration';

import { Playable, Rest } from '../Domain/Note';
import { Measure } from '../Domain/Song';
import { AbcChord } from './abcChord';
import { AbcNote, AbcRest } from './abcNote';

export class AbcMeasure {
  constructor(
    private readonly measure: Measure,
    private readonly defaultDuration: DurationPrimitives
  ) {}

  toString() {
    return [...this.measure].map((p) => this.map(p)).join('');
  }

  private map(playable: Playable) {
    if (playable.HasPitch) {
      const notes = [...playable.Notes];

      if (notes.length > 1) {
        const chord = playable as Chord;
        if (chord) {
          return new AbcChord(chord.To, this.defaultDuration).toString();
        }
      }

      if (notes[0]) {
        return new AbcNote(notes[0].To, this.defaultDuration).toString();
      }
    }

    return new AbcRest(new Rest(playable.Duration).To, this.defaultDuration).toString();
  }
}
