import { BarryHarrisLine } from '../Domain/Barry';
import { GuitarPitchLines, Position, Tab } from '../Domain/Guitar';
import { Pitch } from '../Domain/Pitch';
import { Scale } from '../Domain/Scale';
import { BarryHarrisCommand } from '../primitives/Barry';
import { PositionPrimitives } from '../primitives/Guitar';
import { ScalePrimitives } from '../primitives/Scale';

export class BarryHarrisLineUseCase {
  tabFor(scale: ScalePrimitives, position: PositionPrimitives, commands: BarryHarrisCommand[]) {
    const builder = new BarryHarrisLineBuilder(scale, position);

    for (const command of commands) {
      builder.executeCommand(command);
    }

    return builder.buildTab();
  }

  pichesFor(scale: ScalePrimitives, commands: BarryHarrisCommand[]) {
    const builder = new BarryHarrisLineBuilder(scale);

    for (const command of commands) {
      builder.executeCommand(command);
    }

    return builder.buildPitches();
  }
}

class BarryHarrisLineBuilder {
  private readonly line: BarryHarrisLine;
  private readonly position?: Position;

  constructor(scalePrimitives: ScalePrimitives, positionPrimitives?: PositionPrimitives) {
    this.line = new BarryHarrisLine(Scale.From(scalePrimitives));
    if (positionPrimitives) {
      this.position = Position.From(positionPrimitives);
    }
  }

  executeCommand(command: BarryHarrisCommand) {
    switch (command.command) {
      case 'ArpeggioUpFrom':
        this.line.arpeggioUpFrom(command.degree);
        break;
      case 'ArpeggioUpFromLastPitch':
        this.line.arpeggioUpFromLastPitch();
        break;
      case 'PivotArpeggioUpFrom':
        this.line.pivotArpeggioUpFrom(command.degree);
        break;
      case 'PivotArpeggioUpFromLastPitch':
        this.line.pivotArpeggioUpFromLastPitch();
        break;
      case 'ResolveTo':
        this.line.resolveTo(Pitch.From(command.pitch));
        break;
      case 'ScaleDown':
        this.line.scaleDown(command.to, command.from);
        break;
      case 'ScaleDownExtraHalfSteps':
        this.line.scaleDownExtraHalfSteps(command.to, command.from);
        break;
      case 'ScaleDownFromLastPitchTo':
        this.line.scaleDownFromLastPitchTo(command.to);
        break;
      case 'ScaleDownExtraHalfStepsFromLastPitch':
        this.line.scaleDownExtraHalfStepsFromLastPitch(command.to);
    }
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
