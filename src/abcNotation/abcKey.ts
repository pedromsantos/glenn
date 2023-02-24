import Key from 'src/Domain/Key';

export class abcKey {
  constructor(private readonly key: Key) {}

  toString() {
    return `K:${this.key.Name}`;
  }
}
