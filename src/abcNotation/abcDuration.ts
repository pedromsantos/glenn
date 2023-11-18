import { DurationPrimitives } from 'src/primitives/Duration';

export class AbcDuration {
  constructor(private readonly duration: DurationPrimitives) {}

  toString() {
    return `L:${this.duration.fraction}`;
  }
}
