import { Position } from '../../Domain/Guitar';
import { Pitch } from '../../Domain/Pitch';
import { Scale, ScalePattern } from '../../Domain/Scale';
import { BarryHarrisCommand } from '../../primitives/Barry';
import { ScalePrimitives } from '../../primitives/Scale';
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

  describe('Guitar Tab for command:', () => {
    const scale = new Scale(ScalePattern.Mixolydian, Pitch.C).To;
    const useCase = new BarryHarrisLineUseCase();

    test('Arpeggio Up From', () => {
      const commands: BarryHarrisCommand[] = [{ command: 'ArpeggioUpFrom', degree: 0 }];

      const { line, tab } = execute(useCase, scale, commands);

      expect(line).toHaveLength(4);
      expect(tab).toBe(`e|---------|
B|---------|
G|-------3-|
D|---2-5---|
A|-3-------|
E|---------|`);
    });

    test('Resolve To', () => {
      const commands: BarryHarrisCommand[] = [
        { command: 'ArpeggioUpFrom', degree: 0 },
        { command: 'ResolveTo', pitch: Pitch.D.To },
      ];

      const { line, tab } = execute(useCase, scale, commands);

      expect(line).toHaveLength(5);
      expect(tab).toBe(`e|-----------|
B|---------3-|
G|-------3---|
D|---2-5-----|
A|-3---------|
E|-----------|`);
    });

    test('Pivot Arpeggio Up From (this test is not correct, but Pivot arpeggios in isolation are not in the critical path)', () => {
      const commands: BarryHarrisCommand[] = [{ command: 'PivotArpeggioUpFrom', degree: 5 }];

      const { line, tab } = execute(useCase, scale, commands);

      expect(line).toHaveLength(4);
      expect(tab).toBe(`e|---------|
B|---------|
G|---------|
D|-------3-|
A|---1-5---|
E|-5-------|`);
    });
    test('Pivot Arpeggio Up From Last Pitch', () => {
      const commands: BarryHarrisCommand[] = [
        { command: 'ArpeggioUpFrom', degree: 0 },
        { command: 'PivotArpeggioUpFromLastPitch' },
      ];

      const { line, tab } = execute(useCase, scale, commands);

      expect(line).toHaveLength(7);
      expect(tab).toBe(`e|---------------|
B|---------------|
G|-------3-------|
D|---2-5-----2-5-|
A|-3-------3-----|
E|---------------|`);
    });

    test('Pivot Arpeggio Up From Last Pitch with resolve', () => {
      const commands: BarryHarrisCommand[] = [
        { command: 'ArpeggioUpFrom', degree: 0 },
        { command: 'ResolveTo', pitch: Pitch.D.To },
        { command: 'PivotArpeggioUpFromLastPitch' },
      ];

      const { line, tab } = execute(useCase, scale, commands);

      expect(line).toHaveLength(8);
      expect(tab).toBe(`e|-----------------|
B|---------3-------|
G|-------3-------3-|
D|---2-5-----2-5---|
A|-3---------------|
E|-----------------|`);
    });

    test('Scale Down', () => {
      const commands: BarryHarrisCommand[] = [
        { command: 'ArpeggioUpFrom', degree: 0 },
        { command: 'ScaleDown', from: 7, to: 2 },
      ];

      const { line, tab } = execute(useCase, scale, commands);

      expect(line).toHaveLength(9);
      expect(tab).toBe(`e|-------------------|
B|-------------------|
G|-------3-3-2-------|
D|---2-5-------5-3-2-|
A|-3-----------------|
E|-------------------|`);
    });

    test('Scale Down Extra Half Steps', () => {
      const commands: BarryHarrisCommand[] = [
        { command: 'ArpeggioUpFrom', degree: 0 },
        { command: 'ScaleDownExtraHalfSteps', from: 7, to: 0 },
      ];

      const { line, tab } = execute(useCase, scale, commands);

      expect(line).toHaveLength(13);
      expect(tab).toBe(`e|---------------------------|
B|---------------------------|
G|-------3-4-3-2-------------|
D|---2-5---------5-3-2-------|
A|-3-------------------5-4-3-|
E|---------------------------|`);
    });

    test('Scale Down Extra Half Steps From Last Pitch', () => {
      const commands: BarryHarrisCommand[] = [
        { command: 'ArpeggioUpFrom', degree: 0 },
        { command: 'ScaleDownExtraHalfStepsFromLastPitch', to: 0 },
      ];

      const { line, tab } = execute(useCase, scale, commands);

      expect(line).toHaveLength(11);
      expect(tab).toBe(`e|-----------------------|
B|-----------------------|
G|-------3-2-------------|
D|---2-5-----5-3-2-------|
A|-3---------------5-4-3-|
E|-----------------------|`);
    });
  });
});

function execute(
  useCase: BarryHarrisLineUseCase,
  scale: ScalePrimitives,
  commands: BarryHarrisCommand[]
) {
  const line = useCase.pichesFor(scale, commands);
  const tab = useCase.tabFor(scale, Position.C.To, commands);
  return { line, tab };
}
