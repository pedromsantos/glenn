import { ClefPrimitives } from 'src/primitives/Clef';

export class AbcClef {
  constructor(private readonly clef: ClefPrimitives) {}

  toString() {
    return `clef=${this.clef.type}${this.clef.line}`;
  }
}
