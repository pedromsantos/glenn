import { BarryHarrisLine } from '../Domain/Barry';
import { Duration } from '../Domain/Duration';
import { GuitarStrings, Position, PositionFrets, Tab } from '../Domain/Guitar';
import { Octave } from '../Domain/Note';
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

    return builder.build();
  }
}

class BarryHarrisLineBuilder {
  private readonly line: BarryHarrisLine;

  constructor(scalePrimitives: ScalePrimitives) {
    this.line = new BarryHarrisLine(Scale.From(scalePrimitives), Octave.C3, Duration.Eighth);
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
      case 'ResolveDownTo':
        this.line.resolveDownTo(Pitch.From(command.pitch));
        break;
      case 'ResolveUpTo':
        this.line.resolveUpTo(Pitch.From(command.pitch));
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

    const line = this.line.build();
    const guitarLine = new PositionFrets(position, new GuitarStrings()).mapMelodicLine(line);
    return Tab.render(guitarLine.toTab(new GuitarStrings()));
  }

  build() {
    return this.line.build();
  }
}
