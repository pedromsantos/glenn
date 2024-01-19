import { Position } from '../../Domain/Guitar';
import { Pitch } from '../../Domain/Pitch';
import { Scale, ScalePattern } from '../../Domain/Scale';
import { BarryHarrisCommand } from '../../primitives/Barry';
import { BarryHarrisLineBuilder, BarryHarrisLineUseCase } from '../../UseCases/Barry';

describe('Barry Harrys builder', () => {
  describe('from C7 scale', () => {
    test('Guitar Tab for: Arpeggio up, resolve to, scale down, arpeggio', () => {
      const scale = new Scale(ScalePattern.Mixolydian, Pitch.C).To;
      const builder = new BarryHarrisLineBuilder(scale, Position.C.To)
        .arpeggioUpFrom(0)
        .resolveTo(Pitch.D.To)
        .scaleDownFromLastPitchTo(2)
        .arpeggioUpFromLastPitch()
        .resolveTo(Pitch.E.To)
        .pivotArpeggioUpFromLastPitch()
        .resolveTo(Pitch.BFlat.To);

      const line = builder.buildPitches();
      expect(line).toHaveLength(20);

      const tab = builder.buildTab();
      expect(tab).toBe(`e|-----------------------------------------|
B|---------3-1-----------------3-5---------|
G|-------3-----4-3-2---------3-------2-5-3-|
D|---2-5-------------5-3-2-5-------3-------|
A|-3---------------------------------------|
E|-----------------------------------------|`);
    });
  });
});

describe('Barry Harrys use case', () => {
  describe('from C7 scale', () => {
    test('Guitar Tab for: commands', () => {
      const commands: BarryHarrisCommand[] = [
        { command: 'ArpeggioUpFrom', degree: 0 },
        { command: 'ResolveTo', pitch: Pitch.D.To },
        { command: 'ScaleDownFromLastPitchTo', to: 2 },
        { command: 'ArpeggioUpFromLastPitch' },
        { command: 'ResolveTo', pitch: Pitch.E.To },
        { command: 'PivotArpeggioUpFromLastPitch' },
        { command: 'ResolveTo', pitch: Pitch.BFlat.To },
      ];

      const scale = new Scale(ScalePattern.Mixolydian, Pitch.C).To;
      const useCase = new BarryHarrisLineUseCase();

      const line = useCase.pichesFor(scale, commands);
      expect(line).toHaveLength(20);

      const tab = useCase.tabFor(scale, Position.C.To, commands);
      expect(tab).toBe(`e|-----------------------------------------|
B|---------3-1-----------------3-5---------|
G|-------3-----4-3-2---------3-------2-5-3-|
D|---2-5-------------5-3-2-5-------3-------|
A|-3---------------------------------------|
E|-----------------------------------------|`);
    });
  });
});
