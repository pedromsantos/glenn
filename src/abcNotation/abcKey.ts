import { KeyPrimitives } from '../primitives/Key';

export class AbcKey {
  constructor(private readonly key: KeyPrimitives) {}

  toString() {
    return `K:${this.key.abbreviation}`;
  }
}
