import { Clef } from 'src/Domain/Clef';

export class abcClef {
  constructor(private readonly clef: Clef) {}

  toString() {
    return `clef=${this.clef.Type}${this.clef.Line}`;
  }
}
