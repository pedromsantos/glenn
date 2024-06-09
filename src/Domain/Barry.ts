import { Duration } from './Duration';
import { MelodicLine, Octave } from './Note';
import { Pitch, PitchLine, PitchLineDirection } from './Pitch';
import { Scale, ScaleDegree, ScalePattern } from './Scale';

export class PitchLines implements Iterable<PitchLine> {
  constructor(private readonly lines: PitchLine[] = []) {}

  add(line: PitchLine) {
    this.lines.push(line);
  }

  addPitch(pitch: Pitch) {
    this.lines[this.lines.length - 1]?.push(pitch);
  }

  lastPitch() {
    const lastLine = this.lines[this.lines.length - 1];

    if (lastLine) {
      return lastLine.lastPitch();
    }

    return undefined;
  }

  melodicLine(startingOctave: Octave, pitchDurations: Duration) {
    let octave = startingOctave;
    const melodicLine = new MelodicLine([]);

    for (const line of this.lines) {
      octave = melodicLine.lastOctave() ?? startingOctave;
      melodicLine.concat(line.melodicLine(octave, pitchDurations));
    }

    return melodicLine;
  }

  flatPitches() {
    return this.lines.flatMap((l) => [...l]);
  }

  *[Symbol.iterator](): Iterator<PitchLine> {
    for (const line of this.lines) {
      yield line;
    }
  }
}

class BarryHalfStepRule {
  private constructor(
    private readonly startDegree: ScaleDegree,
    private readonly endDegree: ScaleDegree
  ) {}

  public static readonly RootAndSeventh = new BarryHalfStepRule(ScaleDegree.I, ScaleDegree.VII);
  public static readonly SecondAndRoot = new BarryHalfStepRule(ScaleDegree.II, ScaleDegree.I);
  public static readonly ThirdAndSecond = new BarryHalfStepRule(ScaleDegree.III, ScaleDegree.II);
  public static readonly SixthAndFifth = new BarryHalfStepRule(ScaleDegree.VI, ScaleDegree.V);

  apply(line: PitchLine, scale: Scale) {
    line.insertHalfToneBetween(scale.pitchFor(this.startDegree), scale.pitchFor(this.endDegree));
  }
}

class BarryHalfStepRules {
  private static readonly all: BarryHalfStepRules[] = [];

  private constructor(
    private chordTonesMin: BarryHalfStepRule[],
    private noChordTonesMin: BarryHalfStepRule[],
    private chordTonesMax: BarryHalfStepRule[],
    private noChordTonesMax: BarryHalfStepRule[],
    private applyesTo: (scale: Scale) => boolean
  ) {
    BarryHalfStepRules.all.push(this);
  }

  public static readonly Dominant: BarryHalfStepRules = new BarryHalfStepRules(
    [BarryHalfStepRule.RootAndSeventh],
    [],
    [
      BarryHalfStepRule.RootAndSeventh,
      BarryHalfStepRule.SecondAndRoot,
      BarryHalfStepRule.ThirdAndSecond,
    ],
    [BarryHalfStepRule.RootAndSeventh, BarryHalfStepRule.SecondAndRoot],
    (scale: Scale) => scale.hasPattern(ScalePattern.Mixolydian)
  );

  public static readonly Major: BarryHalfStepRules = new BarryHalfStepRules(
    [BarryHalfStepRule.SixthAndFifth],
    [],
    [
      BarryHalfStepRule.SecondAndRoot,
      BarryHalfStepRule.ThirdAndSecond,
      BarryHalfStepRule.SixthAndFifth,
    ],
    [BarryHalfStepRule.RootAndSeventh, BarryHalfStepRule.SixthAndFifth],
    (scale: Scale) => scale.hasPattern(ScalePattern.Ionian)
  );

  public static readonly Minor: BarryHalfStepRules = new BarryHalfStepRules(
    [BarryHalfStepRule.SixthAndFifth],
    [],
    [
      BarryHalfStepRule.SecondAndRoot,
      BarryHalfStepRule.ThirdAndSecond,
      BarryHalfStepRule.SixthAndFifth,
    ],
    [BarryHalfStepRule.RootAndSeventh, BarryHalfStepRule.SixthAndFifth],
    (scale: Scale) => scale.hasPattern(ScalePattern.HarmonicMinor)
  );

  public static readonly Default: BarryHalfStepRules = new BarryHalfStepRules(
    [],
    [],
    [],
    [],
    () => false
  );

  static barryRulesFor(scale: Scale) {
    return (
      BarryHalfStepRules.all.find((rule) => rule.applyesTo(scale)) || BarryHalfStepRules.Default
    );
  }

  applyMin(scale: Scale, from: ScaleDegree, to: ScaleDegree) {
    const line = scale.down(from, to);

    if (this.lineStartsAtChordTone(from)) {
      for (const rule of this.chordTonesMin) {
        rule.apply(line, scale);
      }

      return line;
    }

    for (const rule of this.noChordTonesMin) {
      rule.apply(line, scale);
    }

    return line;
  }

  applyMax(scale: Scale, from: ScaleDegree, to: ScaleDegree) {
    const line = scale.down(from, to);

    if (this.lineStartsAtChordTone(from)) {
      for (const rule of this.chordTonesMax) {
        rule.apply(line, scale);
      }

      return line;
    }

    for (const rule of this.noChordTonesMax) {
      rule.apply(line, scale);
    }

    return line;
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
    this.line.addPitch(pitch);
    return this;
  }

  scaleDown(to: ScaleDegree, from: ScaleDegree) {
    this.line.add(BarryHalfStepRules.barryRulesFor(this.scale).applyMin(this.scale, from, to));

    return this;
  }

  scaleDownExtraHalfSteps(to: ScaleDegree, from: ScaleDegree) {
    this.line.add(BarryHalfStepRules.barryRulesFor(this.scale).applyMax(this.scale, from, to));

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

  build(startingOctave: Octave, pitchDurations: Duration) {
    let octave = startingOctave;
    const melodicLine = new MelodicLine([]);

    for (const line of this.line) {
      octave = melodicLine.lastOctave() ?? startingOctave;
      melodicLine.concat(line.melodicLine(octave, pitchDurations));
    }

    return melodicLine;
  }

  buildPitchLines() {
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
}
