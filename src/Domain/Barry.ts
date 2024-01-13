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
    let rawLine = this.scale.down(from, to);

    if (this.lineStartAtChordTone(from)) {
      rawLine = rawLine.insertHalfToneBetween(
        this.scale.pitchFor(ScaleDegree.I),
        this.scale.pitchFor(ScaleDegree.VII)
      );
    }

    this.line.add(rawLine);

    return this;
  }

  scaleDownExtra(from: ScaleDegree, to: ScaleDegree) {
    let rawLine = this.scale.down(from, to);

    if (this.lineStartAtChordTone(from)) {
      rawLine = rawLine.insertHalfToneBetween(
        this.scale.pitchFor(ScaleDegree.III),
        this.scale.pitchFor(ScaleDegree.II)
      );
      rawLine = rawLine.insertHalfToneBetween(
        this.scale.pitchFor(ScaleDegree.II),
        this.scale.pitchFor(ScaleDegree.I)
      );
      rawLine = rawLine.insertHalfToneBetween(
        this.scale.pitchFor(ScaleDegree.I),
        this.scale.pitchFor(ScaleDegree.VII)
      );
    }

    this.line.add(rawLine);

    return this;
  }

  build(): PitchLines {
    return this.line;
  }

  private lineStartAtChordTone(from: ScaleDegree) {
    return !!(
      from === ScaleDegree.I ||
      from === ScaleDegree.III ||
      from === ScaleDegree.V ||
      from === ScaleDegree.VII
    );
  }
}
