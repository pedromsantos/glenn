import { Clef } from 'src/Domain/Clef';

export class abcClef {
  constructor(private readonly clef: Clef) {}

  toString() {
    return `K:${this.clef.Type}${this.clef.Line}`;
  }
}
