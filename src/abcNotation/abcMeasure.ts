import { Duration } from '../Domain/Duration';
import { Playable, Rest } from '../Domain/Note';
import { Measure } from '../Domain/Song';
import { AbcNote, AbcRest } from './abcNote';

export class AbcMeasure {
  constructor(
    private readonly measure: Measure,
    private readonly defaultDuration: Duration
  ) {}

  toString() {
    return [...this.measure].map((p) => this.map(p)).join('');
  }

  private map(playable: Playable) {
    if (playable.HasPitch) {
      const notes = [...playable.Notes];

      if (notes[0]) {
        return new AbcNote(notes[0], this.defaultDuration).toString();
      }

      return new AbcRest(new Rest(playable.Duration), this.defaultDuration).toString();
    }

    return new AbcRest(new Rest(playable.Duration), this.defaultDuration).toString();
  }
}
