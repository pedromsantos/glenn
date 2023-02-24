import { TimeSignature } from '../Domain/Duration';

export class abcMeter {
  constructor(private readonly timeSignature: TimeSignature) {}

  toString() {
    return `M:${this.timeSignature.toString()}`;
  }
}
