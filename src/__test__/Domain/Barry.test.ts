import { Barry } from '../../Domain/Barry';
import { Pitch } from '../../Domain/Pitch';
import { Scale, ScaleDegree, ScalePattern } from '../../Domain/Scale';

describe('Barry  Harrys lines', () => {
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
        const line = new Barry(scale);

        line.arpeggioUp(degree);
        const lines = line.build();
        const flatLine = [...[...lines][0]!];

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
        const line = new Barry(scale);

        line.scaleDown(from, to);
        const lines = line.build();
        const flatLine = [...[...lines][0]!];

        expect(flatLine).toStrictEqual(expected);
      });
    });

    describe('Extra half steps scale down to', () => {
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
        const line = new Barry(scale);

        line.scaleDownExtra(from, to);
        const lines = line.build();
        const flatLine = [...[...lines][0]!];

        expect(flatLine).toStrictEqual(expected);
      });
    });
  });
});
