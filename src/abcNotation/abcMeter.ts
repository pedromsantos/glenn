import { TimeSignaturePrimitives } from 'src/primitives/Duration';

export class AbcMeter {
  constructor(private readonly timeSignature: TimeSignaturePrimitives) {}

  toString() {
    return `M:${this.timeSignature.signature}`;
  }
}
