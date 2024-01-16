import { BarryHarrisLine } from '../../Domain/Barry';
import { GuitarPitchLines, Position, Tab } from '../../Domain/Guitar';
import { Pitch } from '../../Domain/Pitch';
import { Scale, ScaleDegree, ScalePattern } from '../../Domain/Scale';

describe('Barry Harrys lines', () => {
  describe('from C7 scale', () => {
    const scale = new Scale(ScalePattern.Mixolydian, Pitch.C);

    describe('Arpeggio up', () => {
      type TestTuple = [ScaleDegree, Pitch[]];

      test.each<TestTuple>([
        [ScaleDegree.I, [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat]],
        [ScaleDegree.II, [Pitch.D, Pitch.F, Pitch.A, Pitch.C]],
        [ScaleDegree.III, [Pitch.E, Pitch.G, Pitch.BFlat, Pitch.D]],
        [ScaleDegree.IV, [Pitch.F, Pitch.A, Pitch.C, Pitch.E]],
        [ScaleDegree.V, [Pitch.G, Pitch.BFlat, Pitch.D, Pitch.F]],
        [ScaleDegree.VI, [Pitch.A, Pitch.C, Pitch.E, Pitch.G]],
        [ScaleDegree.VII, [Pitch.BFlat, Pitch.D, Pitch.F, Pitch.A]],
      ])('From', (degree, expected) => {
        const lines = new BarryHarrisLine(scale).arpeggioUpFrom(degree).build();
        const flatLine = [...lines].flatMap((l) => [...l]);

        expect(flatLine).toStrictEqual(expected);
      });
    });

    describe('Pivot', () => {
      type TestTuple = [ScaleDegree, Pitch[]];

      test.each<TestTuple>([
        [ScaleDegree.VII, [Pitch.BFlat, Pitch.C, Pitch.E, Pitch.G]],
        [ScaleDegree.VI, [Pitch.A, Pitch.BFlat, Pitch.D, Pitch.F]],
        [ScaleDegree.V, [Pitch.G, Pitch.A, Pitch.C, Pitch.E]],
        [ScaleDegree.IV, [Pitch.F, Pitch.G, Pitch.BFlat, Pitch.D]],
        [ScaleDegree.III, [Pitch.E, Pitch.F, Pitch.A, Pitch.C]],
        [ScaleDegree.II, [Pitch.D, Pitch.E, Pitch.G, Pitch.BFlat]],
        [ScaleDegree.I, [Pitch.C, Pitch.D, Pitch.F, Pitch.A]],
      ])('From', (degree, expected) => {
        const lines = new BarryHarrisLine(scale).pivotArpeggioUpFrom(degree).build();
        const flatLine = [...lines].flatMap((l) => [...l]);

        expect(flatLine).toStrictEqual(expected);
      });
    });

    describe('Scale down to', () => {
      type TestTuple = [ScaleDegree, ScaleDegree, Pitch[]];
      test.each<TestTuple>([
        [ScaleDegree.VII, ScaleDegree.III, [Pitch.BFlat, Pitch.A, Pitch.G, Pitch.F, Pitch.E]],
        [ScaleDegree.VI, ScaleDegree.III, [Pitch.A, Pitch.G, Pitch.F, Pitch.E]],
        [ScaleDegree.V, ScaleDegree.III, [Pitch.G, Pitch.F, Pitch.E]],
        [ScaleDegree.IV, ScaleDegree.I, [Pitch.F, Pitch.E, Pitch.D, Pitch.C]],
        [ScaleDegree.III, ScaleDegree.I, [Pitch.E, Pitch.D, Pitch.C]],
        [ScaleDegree.II, ScaleDegree.I, [Pitch.D, Pitch.C]],
        [ScaleDegree.III, ScaleDegree.VII, [Pitch.E, Pitch.D, Pitch.C, Pitch.B, Pitch.BFlat]],
        [
          ScaleDegree.III,
          ScaleDegree.VI,
          [Pitch.E, Pitch.D, Pitch.C, Pitch.B, Pitch.BFlat, Pitch.A],
        ],
        [
          ScaleDegree.III,
          ScaleDegree.V,
          [Pitch.E, Pitch.D, Pitch.C, Pitch.B, Pitch.BFlat, Pitch.A, Pitch.G],
        ],
        [
          ScaleDegree.III,
          ScaleDegree.IV,
          [Pitch.E, Pitch.D, Pitch.C, Pitch.B, Pitch.BFlat, Pitch.A, Pitch.G, Pitch.F],
        ],
        [
          ScaleDegree.III,
          ScaleDegree.III,
          [Pitch.E, Pitch.D, Pitch.C, Pitch.B, Pitch.BFlat, Pitch.A, Pitch.G, Pitch.F, Pitch.E],
        ],
      ])('From', (from, to, expected) => {
        const line = new BarryHarrisLine(scale);

        line.scaleDown(to, from);
        const flatLine = [...[...line.build()][0]!];

        expect(flatLine).toStrictEqual(expected);
      });
    });

    describe('scale down with extra half steps', () => {
      type TestTuple = [ScaleDegree, ScaleDegree, Pitch[]];
      test.each<TestTuple>([
        [ScaleDegree.VII, ScaleDegree.III, [Pitch.BFlat, Pitch.A, Pitch.G, Pitch.F, Pitch.E]],
        [ScaleDegree.VI, ScaleDegree.III, [Pitch.A, Pitch.G, Pitch.F, Pitch.E]],
        [ScaleDegree.V, ScaleDegree.III, [Pitch.G, Pitch.F, Pitch.E]],
        [ScaleDegree.II, ScaleDegree.I, [Pitch.D, Pitch.DFlat, Pitch.C]],
        [ScaleDegree.II, ScaleDegree.VII, [Pitch.D, Pitch.DFlat, Pitch.C, Pitch.B, Pitch.BFlat]],
        [
          ScaleDegree.II,
          ScaleDegree.V,
          [Pitch.D, Pitch.DFlat, Pitch.C, Pitch.B, Pitch.BFlat, Pitch.A, Pitch.G],
        ],
        [ScaleDegree.III, ScaleDegree.I, [Pitch.E, Pitch.EFlat, Pitch.D, Pitch.DFlat, Pitch.C]],
        [
          ScaleDegree.III,
          ScaleDegree.VII,
          [Pitch.E, Pitch.EFlat, Pitch.D, Pitch.DFlat, Pitch.C, Pitch.B, Pitch.BFlat],
        ],
        [
          ScaleDegree.III,
          ScaleDegree.VI,
          [Pitch.E, Pitch.EFlat, Pitch.D, Pitch.DFlat, Pitch.C, Pitch.B, Pitch.BFlat, Pitch.A],
        ],
        [
          ScaleDegree.III,
          ScaleDegree.V,
          [
            Pitch.E,
            Pitch.EFlat,
            Pitch.D,
            Pitch.DFlat,
            Pitch.C,
            Pitch.B,
            Pitch.BFlat,
            Pitch.A,
            Pitch.G,
          ],
        ],
        [
          ScaleDegree.III,
          ScaleDegree.IV,
          [
            Pitch.E,
            Pitch.EFlat,
            Pitch.D,
            Pitch.DFlat,
            Pitch.C,
            Pitch.B,
            Pitch.BFlat,
            Pitch.A,
            Pitch.G,
            Pitch.F,
          ],
        ],
        [
          ScaleDegree.III,
          ScaleDegree.III,
          [
            Pitch.E,
            Pitch.EFlat,
            Pitch.D,
            Pitch.DFlat,
            Pitch.C,
            Pitch.B,
            Pitch.BFlat,
            Pitch.A,
            Pitch.G,
            Pitch.F,
            Pitch.E,
          ],
        ],
      ])('From', (from, to, expected) => {
        const line = new BarryHarrisLine(scale);

        line.scaleDownExtraHalfSteps(to, from);
        const flatLine = [...[...line.build()][0]!];

        expect(flatLine).toStrictEqual(expected);
      });
    });

    describe('combined lines', () => {
      test('Arpeggio up, scale down', () => {
        const lines = new BarryHarrisLine(scale)
          .arpeggioUpFrom(ScaleDegree.I)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .build();

        const flatLine = [...lines].flatMap((l) => [...l]);
        expect(flatLine).toHaveLength(8);
        expect(flatLine[0]).toBe(Pitch.C);
        expect(flatLine[3]).toBe(Pitch.BFlat);
        expect(flatLine[4]).toBe(Pitch.A);
        expect(flatLine[flatLine.length - 1]).toBe(Pitch.E);
      });

      test('Arpeggio up with resolution, scale down', () => {
        const lines = new BarryHarrisLine(scale)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveTo(Pitch.A)
          .scaleDownFromLastPitchTo(ScaleDegree.II)
          .build();

        const flatLine = [...lines].flatMap((l) => [...l]);
        expect(flatLine).toHaveLength(9);
        expect(flatLine[flatLine.length - 1]).toBe(Pitch.D);
      });

      test('Arpeggio up with resolution, scale down, arpeggio up', () => {
        const lines = new BarryHarrisLine(scale)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveTo(Pitch.A)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .arpeggioUpFromLastPitch()
          .build();

        const flatLine = [...lines].flatMap((l) => [...l]);

        expect(flatLine).toHaveLength(11);
        expect(flatLine[flatLine.length - 4]).toBe(Pitch.E);
        expect(flatLine[flatLine.length - 3]).toBe(Pitch.G);
        expect(flatLine[flatLine.length - 2]).toBe(Pitch.BFlat);
        expect(flatLine[flatLine.length - 1]).toBe(Pitch.D);
      });

      test('Guitar Tab for: Arpeggio up, resolve to, scale down, arpeggio up', () => {
        const line = new BarryHarrisLine(scale)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveTo(Pitch.A)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .arpeggioUpFromLastPitch()
          .build();

        const guitarLine = new GuitarPitchLines(line, Position.C);
        const tab = Tab.render(guitarLine.toTab());

        expect(tab).toBe(`e|-----------------------|
B|---------------------3-|
G|-------3-2---------3---|
D|---2-5-----5-3-2-5-----|
A|-3---------------------|
E|-----------------------|`);
      });

      test('Guitar Tab for: Arpeggio up, resolve to, scale down, arpeggio up, pivot', () => {
        const line = new BarryHarrisLine(scale)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveTo(Pitch.A)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .arpeggioUpFromLastPitch()
          .pivotArpeggioUpFromLastPitch()
          .build();

        const guitarLine = new GuitarPitchLines(line, Position.C);
        const tab = Tab.render(guitarLine.toTab());

        expect(tab).toBe(`e|---------------------------3-|
B|---------------------3-3-5---|
G|-------3-2---------3---------|
D|---2-5-----5-3-2-5-----------|
A|-3---------------------------|
E|-----------------------------|`);
      });
    });
  });
});
