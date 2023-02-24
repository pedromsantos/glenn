import { Duration } from '../Domain/Duration';

export class abcDuration {
  constructor(private readonly duration: Duration) {}

  toString() {
    return `L:${this.duration.toString()}`;
  }
}
