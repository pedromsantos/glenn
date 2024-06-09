import { BarryHarrisLine } from '../Domain/Barry';
import { GuitarPitchLines, Position, Tab } from '../Domain/Guitar';
import { Pitch } from '../Domain/Pitch';
import { Scale } from '../Domain/Scale';
import { BarryHarrisCommand } from '../primitives/Barry';
import { PositionPrimitives } from '../primitives/Guitar';
import { ScalePrimitives } from '../primitives/Scale';

export class BarryHarrisLineUseCase {
  tabFor(scale: ScalePrimitives, position: PositionPrimitives, commands: BarryHarrisCommand[]) {
    const builder = new BarryHarrisLineBuilder(scale);

    for (const command of commands) {
      builder.executeCommand(command);
    }

    return builder.buildTab(position);
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

  constructor(scalePrimitives: ScalePrimitives) {
    this.line = new BarryHarrisLine(Scale.From(scalePrimitives));
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

  buildTab(positionPrimitives: PositionPrimitives) {
    const position = Position.From(positionPrimitives);

    const line = this.line.buildPitchLines();
    const guitarLine = new GuitarPitchLines(line, position);
    return Tab.render(guitarLine.toTab());
  }

  buildPitches() {
    const line = this.line.buildPitchLines();
    const flatLine = [...line].flatMap((l) => [...l]);
    return flatLine.map((p) => p.To);
  }
}
