import { Duration } from '../Domain/Duration';
import { Note, Rest } from '../Domain/Note';
import { Measure, Unit } from '../Domain/Song';
import { AbcNote, AbcRest } from './abcNote';

export class AbcMeasure {
  constructor(private readonly measure: Measure, private readonly defaultDuration: Duration) {}

  toString() {
    return [...this.measure].map((n) => this.map(n)).join('');
  }

  private map(unit: Unit) {
    if (unit instanceof Note) {
      return new AbcNote(unit, this.defaultDuration).toString();
    } else {
      return new AbcRest(unit as Rest, this.defaultDuration).toString();
    }
  }
}
