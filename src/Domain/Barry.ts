import { Duration } from './Duration';
import { MelodicLine, Note, Octave } from './Note';
import { Pitch, PitchLine } from './Pitch';
import { Scale, ScaleDegree, ScalePattern } from './Scale';

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
    const startPitch = scale.pitchFor(this.startDegree);
    const endPitch = scale.pitchFor(this.endDegree);

    if (startPitch && endPitch) {
      line.insertHalfToneBetween(startPitch, endPitch);
    }
  }
}

class BarryHalfStepRules {
  private static readonly all: BarryHalfStepRules[] = [];

  private constructor(
    private rootChordTonesMin: BarryHalfStepRule[],
    private noRootChordTonesMin: BarryHalfStepRule[],
    private rootChordTonesMax: BarryHalfStepRule[],
    private noRootChordTonesMax: BarryHalfStepRule[],
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

  applyMin(scale: Scale, from: ScaleDegree, to: ScaleDegree): PitchLine {
    const line = scale.down(from, to);

    if (this.lineStartsAtRootChordTone(from)) {
      for (const rule of this.rootChordTonesMin) {
        rule.apply(line, scale);
      }

      return line;
    }

    for (const rule of this.noRootChordTonesMin) {
      rule.apply(line, scale);
    }

    return line;
  }

  applyMax(scale: Scale, from: ScaleDegree, to: ScaleDegree): PitchLine {
    const line = scale.down(from, to);

    if (this.lineStartsAtRootChordTone(from)) {
      for (const rule of this.rootChordTonesMax) {
        rule.apply(line, scale);
      }

      return line;
    }

    for (const rule of this.noRootChordTonesMax) {
      rule.apply(line, scale);
    }

    return line;
  }

  private lineStartsAtRootChordTone(degree: ScaleDegree) {
    return (
      degree === ScaleDegree.I ||
      degree === ScaleDegree.III ||
      degree === ScaleDegree.V ||
      degree === ScaleDegree.VII
    );
  }
}

export class BarryHarrisLine {
  private readonly line: MelodicLine;

  constructor(
    private readonly scale: Scale,
    private octave: Octave,
    private pitchDurations: Duration
  ) {
    this.line = new MelodicLine([]);
  }

  arpeggioUpFrom(from: ScaleDegree) {
    this.line.concat(
      this.scale.melodicThirdsFrom(from, this.pitchDurations, this.octave).slice(0, 4)
    );
    this.updateOctave();

    return this;
  }

  arpeggioUpFromLastPitch() {
    const from = this.lastDegree();

    if (from) {
      this.line.concat(
        this.scale.melodicThirdsFrom(from, this.pitchDurations, this.octave).slice(1, 4)
      );
    }

    this.updateOctave();

    return this;
  }

  pivotArpeggioUpFrom(degree: ScaleDegree) {
    const arpeggio = this.scale
      .melodicThirdsTo(degree, this.pitchDurations, this.octave)
      .slice(0, 4);
    const arpeggioArray = Array.from(arpeggio);
    this.createPivotArpeggioLine(arpeggioArray, 0, 1);
    this.updateOctave();
    return this;
  }

  pivotArpeggioUpFromLastPitch() {
    const from = this.lastDegree();

    if (from) {
      const arpeggio = this.scale
        .melodicThirdsTo(from, this.pitchDurations, this.octave)
        .slice(0, 4);
      const arpeggioArray = Array.from(arpeggio);
      this.createPivotArpeggioLine(arpeggioArray, 1, 2);
    }

    return this;
  }

  resolveUpTo(pitch: Pitch) {
    const octave = this.line.lastNote?.Pitch.isHiger(pitch) ? this.octave.up() : this.octave;
    this.line.concat(new MelodicLine([new Note(pitch, this.pitchDurations, octave)]));

    this.updateOctave();

    return this;
  }

  resolveDownTo(pitch: Pitch) {
    this.line.concat(
      new MelodicLine([
        new Note(
          pitch,
          this.pitchDurations,
          this.line.lastNote?.Pitch.isLower(pitch) ? this.octave.down() : this.octave
        ),
      ])
    );

    this.updateOctave();

    return this;
  }

  scaleDown(to: ScaleDegree, from: ScaleDegree) {
    const scaleDown: Pitch[] = Array.from(
      BarryHalfStepRules.barryRulesFor(this.scale).applyMin(this.scale, from, to)
    );

    const line = new MelodicLine(
      scaleDown.map(
        (p, i) =>
          new Note(
            p,
            this.pitchDurations,
            this.neddOctaveDown(p, i, scaleDown) ? this.shiftOctaveDown() : this.octave
          )
      )
    );

    this.line.concat(line);

    this.updateOctave();

    return this;
  }

  scaleDownExtraHalfSteps(to: ScaleDegree, from: ScaleDegree) {
    const scaleDown: Pitch[] = Array.from(
      BarryHalfStepRules.barryRulesFor(this.scale).applyMax(this.scale, from, to)
    );

    this.line.concat(
      new MelodicLine(
        scaleDown.map(
          (p, i) =>
            new Note(
              p,
              this.pitchDurations,
              this.neddOctaveDown(p, i, scaleDown) ? this.shiftOctaveDown() : this.octave
            )
        )
      )
    );

    this.updateOctave();

    return this;
  }

  scaleDownFromLastPitchTo(to: ScaleDegree) {
    const from = this.lastDegree();

    if (from) {
      this.scaleDown(to, from - 1);
    }

    this.updateOctave();

    return this;
  }

  scaleDownExtraHalfStepsFromLastPitch(to: ScaleDegree) {
    const from = this.lastDegree();

    if (from) {
      this.scaleDownExtraHalfSteps(to, from - 1);
    }

    this.updateOctave();

    return this;
  }

  build() {
    return this.line;
  }

  private createPivotArpeggioLine(line: Note[], lowCut: number, highCut: number) {
    const arpeggioRoot = new MelodicLine(
      line.slice(lowCut, highCut).map((note) => note.octaveDown())
    );
    this.line.concat(arpeggioRoot);
    this.updateOctave();

    const pivot = new MelodicLine(line.slice(highCut).map((note) => note.octaveDown()));
    this.line.concat(pivot);
    this.updateOctave();
  }

  private lastDegree() {
    const lastPitch = this.line.lastNote?.Pitch;
    let from: ScaleDegree | undefined = undefined;

    if (lastPitch) from = this.scale.degreeFor(lastPitch);

    return from;
  }

  private updateOctave() {
    this.octave = this.line.lastOctave() || this.octave;
  }

  private shiftOctaveDown() {
    this.octave = this.octave.down();
    return this.octave;
  }

  private neddOctaveDown(p: Pitch, i: number, line: Pitch[]) {
    return (p === Pitch.C && i !== 0) || (i !== 0 && line && line[i - 1] === Pitch.C);
  }
}
