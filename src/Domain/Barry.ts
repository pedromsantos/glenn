import { Pitch, PitchLine, PitchLineDirection } from './Pitch';
import { Scale, ScaleDegree } from './Scale';

export class PitchLines implements Iterable<PitchLine> {
  constructor(private readonly lines: PitchLine[] = []) {}

  add(line: PitchLine) {
    this.lines.push(line);
  }

  lastPitch() {
    const lastLine = this.lines[this.lines.length - 1];

    if (lastLine) {
      return lastLine.lastPitch();
    }

    return undefined;
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

  arpeggioUpFrom(degree: ScaleDegree, resolveTo?: Pitch) {
    const arpeggio = new PitchLine(
      this.scale.thirdsFrom(degree).slice(0, 4),
      PitchLineDirection.Ascending
    );

    this.line.add(arpeggio);

    if (resolveTo) {
      this.line.add(new PitchLine([resolveTo], PitchLineDirection.Ascending));
    }

    return this;
  }

  scaleDown(to: ScaleDegree, from: ScaleDegree) {
    let rawLine = new PitchLine();

    rawLine = this.scale.down(from, to);

    if (this.lineStartsAtChordTone(from)) {
      rawLine = rawLine.insertHalfToneBetween(
        this.scale.pitchFor(ScaleDegree.I),
        this.scale.pitchFor(ScaleDegree.VII)
      );
    }

    this.line.add(rawLine);

    return this;
  }

  scaleDownExtraHalfSteps(to: ScaleDegree, from: ScaleDegree) {
    let rawLine = this.scale.down(from, to);

    if (this.lineStartsAtChordTone(from)) {
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
    } else {
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

  arpeggioUpFromLastPitch(resolveTo?: Pitch) {
    const from = this.lastDegree();

    if (from) {
      this.arpeggioUpFrom(from, resolveTo);
    }

    return this;
  }

  scaleDownFromLastPitchTo(to: ScaleDegree) {
    const from = this.lastDegree();

    if (from) {
      this.scaleDown(to, from - 1);
    }

    return this;
  }

  scaleDownExtraHalfStepsFromLastPitch(to: ScaleDegree) {
    const from = this.lastDegree();

    if (from) {
      this.scaleDownExtraHalfSteps(to, from - 1);
    }

    return this;
  }

  build(): PitchLines {
    return this.line;
  }

  private lastDegree() {
    const lastPitch = this.line.lastPitch();
    let from: ScaleDegree | undefined = undefined;

    if (lastPitch) from = this.scale.degreeFor(lastPitch);

    return from;
  }

  private lineStartsAtChordTone(from: ScaleDegree) {
    return !!(
      from === ScaleDegree.I ||
      from === ScaleDegree.III ||
      from === ScaleDegree.V ||
      from === ScaleDegree.VII
    );
  }
}
