import { Pitch, PitchLine, PitchLineDirection } from './Pitch';
import { Scale, ScaleDegree } from './Scale';

export class PitchLines implements Iterable<PitchLine> {
  constructor(private readonly lines: PitchLine[] = []) {}

  add(line: PitchLine) {
    this.lines.push(line);
  }

  *[Symbol.iterator](): Iterator<PitchLine> {
    for (const line of this.lines) {
      yield line;
    }
  }
}

export class Barry {
  private readonly line: PitchLines;

  constructor(private readonly scale: Scale) {
    this.line = new PitchLines();
  }

  arpeggioUp(degree: ScaleDegree, resolveTo?: Pitch) {
    const arpeggio = new PitchLine(
      this.scale.thirdsFrom(degree).slice(0, 4),
      PitchLineDirection.Ascending
    );

    this.line.add(arpeggio);

    if (resolveTo) {
      this.line.add(new PitchLine([resolveTo], PitchLineDirection.Ascending));
    }
  }

  scaleDown(from: ScaleDegree, to: ScaleDegree) {
    this.line.add(this.scale.down(from, to));
    return this;
  }

  build(): PitchLines {
    return this.line;
  }
}
