import { TimeSignature } from '../Domain/Duration';

export class AbcMeter {
  constructor(private readonly timeSignature: TimeSignature) {}

  toString() {
    return `M:${this.timeSignature.toString()}`;
  }
}
