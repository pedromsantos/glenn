import { KeyPrimitives } from 'src/primitives/Key';

export class AbcKey {
  constructor(private readonly key: KeyPrimitives) {}

  toString() {
    return `K:${this.key.abbreviation}`;
  }
}
