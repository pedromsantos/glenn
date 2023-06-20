import { Duration } from '../Domain/Duration';

export class AbcDuration {
  constructor(private readonly duration: Duration) {}

  toString() {
    return `L:${this.duration.toString()}`;
  }
}
