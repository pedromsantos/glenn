import { Pitch, PitchLine, PitchLineDirection } from './Pitch';
import { Scale, ScaleDegree } from './Scale';

export class PitchLines implements Iterable<PitchLine> {
  constructor(private readonly lines: PitchLine[] = []) {}

  add(line: PitchLine) {
    this.lines.push(line);
  }

  pushLastLine(pitch: Pitch) {
    this.lines[this.lines.length - 1]?.push(pitch);
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

export class BarryHarrisLine {
  private readonly line: PitchLines;

  constructor(private readonly scale: Scale) {
    this.line = new PitchLines();
  }

  arpeggioUpFrom(degree: ScaleDegree) {
    const arpeggio = new PitchLine(
      this.scale.thirdsFrom(degree).slice(0, 4),
      PitchLineDirection.Ascending
    );

    this.line.add(arpeggio);

    return this;
  }

  arpeggioUpFromLastPitch() {
    const from = this.lastDegree();

    if (from) {
      const arpeggio = new PitchLine(
        this.scale.thirdsFrom(from).slice(1, 4),
        PitchLineDirection.Ascending
      );

      this.line.add(arpeggio);
    }

    return this;
  }

  pivotArpeggioUpFrom(degree: ScaleDegree) {
    const arpeggio = this.scale.thirdsTo(degree).slice(0, 4);
    this.createPivotArpeggioLine(arpeggio, 0, 1);
    return this;
  }

  pivotArpeggioUpFromLastPitch() {
    const from = this.lastDegree();

    if (from) {
      const arpeggio = this.scale.thirdsTo(from).slice(0, 4);
      this.createPivotArpeggioLine(arpeggio, 1, 2);
    }

    return this;
  }

  resolveTo(pitch: Pitch) {
    this.line.pushLastLine(pitch);
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

  private createPivotArpeggioLine(line: Pitch[], lowCut: number, highCut: number) {
    const arpeggioRoot = new PitchLine(line.slice(lowCut, highCut), PitchLineDirection.OctaveDown);
    this.line.add(arpeggioRoot);
    const pivot = new PitchLine(line.slice(highCut), PitchLineDirection.Ascending);
    this.line.add(pivot);
  }

  private lastDegree() {
    const lastPitch = this.line.lastPitch();
    let from: ScaleDegree | undefined = undefined;

    if (lastPitch) from = this.scale.degreeFor(lastPitch);

    return from;
  }

  private lineStartsAtChordTone(degree: ScaleDegree) {
    return !!(
      degree === ScaleDegree.I ||
      degree === ScaleDegree.III ||
      degree === ScaleDegree.V ||
      degree === ScaleDegree.VII
    );
  }
}
