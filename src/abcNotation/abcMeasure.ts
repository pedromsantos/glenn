import { Duration } from '../Domain/Duration';
import { Note, Rest } from '../Domain/Note';
import { Measure, Unit } from '../Domain/Song';
import { abcNote, abcRest } from './abcNote';

export class abcMeasure {
  constructor(private readonly measure: Measure, private readonly defaultDuration: Duration) {}

  toString() {
    return [...this.measure].map((n) => this.map(n)).join('');
  }

  private map(unit: Unit) {
    if (unit instanceof Note) {
      return new abcNote(unit, this.defaultDuration).toString();
    } else {
      return new abcRest(unit as Rest, this.defaultDuration).toString();
    }
  }
}
