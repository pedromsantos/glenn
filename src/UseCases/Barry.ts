import { BarryHarrisLine } from '../Domain/Barry';
import { GuitarPitchLines, Position, Tab } from '../Domain/Guitar';
import { Pitch } from '../Domain/Pitch';
import { Scale } from '../Domain/Scale';
import { BarryHarrisCommand } from '../primitives/Barry';
import { PositionPrimitives } from '../primitives/Guitar';
import { PitchPrimitives } from '../primitives/Pitch';
import { ScalePrimitives } from '../primitives/Scale';

export class BarryHarrisLineUseCase {
  tabFor(scale: ScalePrimitives, position: PositionPrimitives, commands: BarryHarrisCommand[]) {
    const builder = new BarryHarrisLineBuilder(scale, position);

    this.executeCommands(commands, builder);

    return builder.buildTab();
  }

  pichesFor(scale: ScalePrimitives, commands: BarryHarrisCommand[]) {
    const builder = new BarryHarrisLineBuilder(scale);

    this.executeCommands(commands, builder);

    return builder.buildPitches();
  }

  private executeCommands(commands: BarryHarrisCommand[], builder: BarryHarrisLineBuilder) {
    for (const command of commands) {
      switch (command.command) {
        case 'ArpeggioUpFrom':
          builder.arpeggioUpFrom(command.degree);
          break;
        case 'ArpeggioUpFromLastPitch':
          builder.arpeggioUpFromLastPitch();
          break;
        case 'PivotArpeggioUpFrom':
          builder.pivotArpeggioUpFrom(command.degree);
          break;
        case 'PivotArpeggioUpFromLastPitch':
          builder.pivotArpeggioUpFromLastPitch();
          break;
        case 'ResolveTo':
          builder.resolveTo(command.pitch);
          break;
        case 'ScaleDown':
          builder.scaleDown(command.to, command.from);
          break;
        case 'ScaleDownExtraHalfSteps':
          builder.scaleDownExtraHalfSteps(command.to, command.from);
          break;
        case 'ScaleDownFromLastPitchTo':
          builder.scaleDownFromLastPitchTo(command.to);
          break;
        case 'ScaleDownExtraHalfStepsFromLastPitch':
          builder.scaleDownExtraHalfStepsFromLastPitch(command.to);
      }
    }
  }
}

export class BarryHarrisLineBuilder {
  private readonly line: BarryHarrisLine;
  private readonly position?: Position;

  constructor(scalePrimitives: ScalePrimitives, positionPrimitives?: PositionPrimitives) {
    this.line = new BarryHarrisLine(Scale.From(scalePrimitives));
    if (positionPrimitives) {
      this.position = Position.From(positionPrimitives);
    }
  }

  arpeggioUpFrom(degree: number) {
    this.line.arpeggioUpFrom(degree);
    return this;
  }

  arpeggioUpFromLastPitch() {
    this.line.arpeggioUpFromLastPitch();
    return this;
  }

  pivotArpeggioUpFrom(degree: number) {
    this.line.pivotArpeggioUpFrom(degree);
    return this;
  }

  pivotArpeggioUpFromLastPitch() {
    this.line.pivotArpeggioUpFromLastPitch();
    return this;
  }

  resolveTo(pitch: PitchPrimitives) {
    this.line.resolveTo(Pitch.From(pitch));
    return this;
  }

  scaleDown(to: number, from: number) {
    this.line.scaleDown(to, from);
    return this;
  }

  scaleDownExtraHalfSteps(to: number, from: number) {
    this.line.scaleDownExtraHalfSteps(to, from);
    return this;
  }

  scaleDownFromLastPitchTo(to: number) {
    this.line.scaleDownFromLastPitchTo(to);
    return this;
  }

  scaleDownExtraHalfStepsFromLastPitch(to: number) {
    this.line.scaleDownExtraHalfStepsFromLastPitch(to);
  }

  buildTab() {
    if (this.position) {
      const line = this.line.build();
      const guitarLine = new GuitarPitchLines(line, this.position);
      return Tab.render(guitarLine.toTab());
    }

    return '';
  }

  buildPitches() {
    const line = this.line.build();
    const flatLine = [...line].flatMap((l) => [...l]);
    return flatLine.map((p) => p.To);
  }
}
