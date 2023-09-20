import { Key } from '../Domain/Key';

export class AbcKey {
  constructor(private readonly key: Key) {}

  toString() {
    return `K:${this.key.Abbreviation}`;
  }
}
