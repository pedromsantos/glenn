import { BarryHarrisLine } from '../../Domain/Barry';
import { Duration } from '../../Domain/Duration';
import { GuitarStrings, Position, PositionFrets, Tab } from '../../Domain/Guitar';
import { Octave } from '../../Domain/Note';
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
        const line = new BarryHarrisLine(scale, Octave.C4, Duration.Eighth)
          .arpeggioUpFrom(degree)
          .build();

        expect(line.pitches()).toStrictEqual(expected);
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
        const line = new BarryHarrisLine(scale, Octave.C4, Duration.Eighth)
          .pivotArpeggioUpFrom(degree)
          .build();

        expect(line.pitches()).toStrictEqual(expected);
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
        const line = new BarryHarrisLine(scale, Octave.C4, Duration.Eighth)
          .scaleDown(to, from)
          .build();

        expect(line.pitches()).toStrictEqual(expected);
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
        const line = new BarryHarrisLine(scale, Octave.C4, Duration.Eighth)
          .scaleDownExtraHalfSteps(to, from)
          .build();

        expect(line.pitches()).toStrictEqual(expected);
      });
    });

    describe('combined lines', () => {
      test('Empty lines have no last pitch', () => {
        const line = new BarryHarrisLine(scale, Octave.C4, Duration.Eighth)
          .arpeggioUpFromLastPitch()
          .build();

        expect(line.pitches()).toHaveLength(0);
      });

      test('Arpeggio up, scale down', () => {
        const line = new BarryHarrisLine(scale, Octave.C4, Duration.Eighth)
          .arpeggioUpFrom(ScaleDegree.I)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .build();

        const pitchesInLine = line.pitches();

        expect(pitchesInLine).toHaveLength(8);
        expect(pitchesInLine[0]).toBe(Pitch.C);
        expect(pitchesInLine[3]).toBe(Pitch.BFlat);
        expect(pitchesInLine[4]).toBe(Pitch.A);
        expect(pitchesInLine[pitchesInLine.length - 1]).toBe(Pitch.E);
      });

      test('Arpeggio up, resolve, scale down', () => {
        const line = new BarryHarrisLine(scale, Octave.C4, Duration.Eighth)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveDownTo(Pitch.A)
          .scaleDownFromLastPitchTo(ScaleDegree.II)
          .build();

        const pitchesInLine = line.pitches();
        expect(pitchesInLine).toHaveLength(9);
        expect(pitchesInLine[pitchesInLine.length - 1]).toBe(Pitch.D);
      });

      test('Arpeggio up, resolve, scale down, arpeggio up', () => {
        const line = new BarryHarrisLine(scale, Octave.C4, Duration.Eighth)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveDownTo(Pitch.A)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .arpeggioUpFromLastPitch()
          .build();

        const pitchesInLine = line.pitches();

        expect(pitchesInLine).toHaveLength(11);
        expect(pitchesInLine[pitchesInLine.length - 4]).toBe(Pitch.E);
        expect(pitchesInLine[pitchesInLine.length - 3]).toBe(Pitch.G);
        expect(pitchesInLine[pitchesInLine.length - 2]).toBe(Pitch.BFlat);
        expect(pitchesInLine[pitchesInLine.length - 1]).toBe(Pitch.D);
      });

      test('Arpeggio up, resolve, scale down, arpeggio up to correct octaves', () => {
        const line = new BarryHarrisLine(scale, Octave.C3, Duration.Eighth)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveDownTo(Pitch.A)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .arpeggioUpFromLastPitch()
          .resolveUpTo(Pitch.E)
          .pivotArpeggioUpFromLastPitch()
          .build();

        expect([...line].map((n) => n.Pitch.Name + ' ' + n.Octaves[0].Name)).toStrictEqual([
          'C C3',
          'E C3',
          'G C3',
          'Bb C3',
          'A C3',
          'G C3',
          'F C3',
          'E C3',
          'G C3',
          'Bb C3',
          'D C4',
          'E C4',
          'F C3',
          'A C3',
          'C C4',
        ]);
      });

      test('Guitar Tab for: Arpeggio up, resolve to, scale down, arpeggio up', () => {
        const line = new BarryHarrisLine(scale, Octave.C3, Duration.Eighth)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveDownTo(Pitch.A)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .arpeggioUpFromLastPitch()
          .build();

        const guitarLine = new PositionFrets(Position.C, new GuitarStrings()).mapMelodicLine(line);
        const tab = Tab.render(guitarLine.toTab(new GuitarStrings()));

        expect(tab).toBe(`e|-----------------------|
B|---------------------3-|
G|-------3-2---------3---|
D|---2-5-----5-3-2-5-----|
A|-3---------------------|
E|-----------------------|`);
      });

      test('Guitar Tab for: Arpeggio up, resolve to, scale down, arpeggio up, resolve and pivot', () => {
        const line = new BarryHarrisLine(scale, Octave.C3, Duration.Eighth)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveDownTo(Pitch.A)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .arpeggioUpFromLastPitch()
          .resolveUpTo(Pitch.E)
          .pivotArpeggioUpFromLastPitch()
          .build();

        const guitarLine = new PositionFrets(Position.C, new GuitarStrings()).mapMelodicLine(line);
        const tab = Tab.render(guitarLine.toTab(new GuitarStrings()));

        expect(tab).toBe(`e|-------------------------------|
B|---------------------3-5-------|
G|-------3-2---------3-------2-5-|
D|---2-5-----5-3-2-5-------3-----|
A|-3-----------------------------|
E|-------------------------------|`);
      });

      test('Guitar Tab for: Arpeggio up, resolve to, scale down, arpeggio up, resolve and pivot, alternate version', () => {
        const line = new BarryHarrisLine(scale, Octave.C3, Duration.Eighth)
          .arpeggioUpFrom(ScaleDegree.I)
          .resolveUpTo(Pitch.D)
          .scaleDownFromLastPitchTo(ScaleDegree.III)
          .arpeggioUpFromLastPitch()
          .resolveUpTo(Pitch.E)
          .pivotArpeggioUpFromLastPitch()
          .resolveDownTo(Pitch.BFlat)
          .build();

        const guitarLine = new PositionFrets(Position.C, new GuitarStrings()).mapMelodicLine(line);
        const tab = Tab.render(guitarLine.toTab(new GuitarStrings()));

        expect(tab).toBe(`e|-----------------------------------------|
B|---------3-1-----------------3-5---------|
G|-------3-----4-3-2---------3-------2-5-3-|
D|---2-5-------------5-3-2-5-------3-------|
A|-3---------------------------------------|
E|-----------------------------------------|`);
      });
    });
  });

  describe('transform combined lines into melodic line', () => {
    const scale = new Scale(ScalePattern.Mixolydian, Pitch.C);

    test('Arpeggio up, scale down', () => {
      const melodicLine = new BarryHarrisLine(scale, Octave.C3, Duration.Eighth)
        .arpeggioUpFrom(ScaleDegree.I)
        .resolveUpTo(Pitch.D)
        .scaleDownFromLastPitchTo(ScaleDegree.III)
        .arpeggioUpFromLastPitch()
        .resolveUpTo(Pitch.E)
        .pivotArpeggioUpFromLastPitch()
        .resolveDownTo(Pitch.BFlat)
        .build();

      expect(melodicLine.lowestOctave()).toBe(Octave.C3);
      expect(melodicLine.highestOctave()).toBe(Octave.C4);
    });
  });
});
