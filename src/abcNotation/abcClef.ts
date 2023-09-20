import { Clef } from '../Domain/Clef';

export class AbcClef {
  constructor(private readonly clef: Clef) {}

  toString() {
    return `clef=${this.clef.Type}${this.clef.Line}`;
  }
}
