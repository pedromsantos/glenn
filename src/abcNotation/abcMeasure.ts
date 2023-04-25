import { Duration } from 'src/Domain/Duration';

import { Measure } from '../Domain/Song';
import { abcNote } from './abcNote';

export class abcMeasure {
  constructor(private readonly measure: Measure, private readonly defaultDuration: Duration) {}

  toString() {
    return [...this.measure].map((n) => new abcNote(n, this.defaultDuration)).join('');
  }
}
