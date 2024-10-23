import { CompoundTimeSignature, Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { Key } from '../../Domain/Key';
import { Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { FullMeasure, Measure, Song } from '../../Domain/Song';

describe('Measure', () => {
  describe('in 4/4', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    let measure = new Measure(timeSignature);

    beforeEach(() => {
      measure = new Measure(timeSignature);
    });

    test('cannot fit double', () => {
      expect(() => measure.add(new Note(Pitch.C, Duration.Double, Octave.C4))).toThrow(
        `cannot fit -${Duration.Double.Name} note in measure`
      );
    });

    test('whole note fills it', () => {
      expect(measure.add(new Note(Pitch.C, Duration.Whole, Octave.C4))).toBeInstanceOf(FullMeasure);
    });

    test('2 half notes notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.Half, Octave.C1))
          .add(new Note(Pitch.C, Duration.Half, Octave.C2))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C3))
      ).toBeInstanceOf(FullMeasure);

      expect([...measure]).toHaveLength(2);
    });

    test('4 quarter notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C1))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C2))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C3))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      ).toBeInstanceOf(FullMeasure);

      expect([...measure]).toHaveLength(4);
    });

    test('2 dotted quarter notes and a quarter note fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C1))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C2))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C3))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C4))
      ).toBeInstanceOf(FullMeasure);

      expect([...measure]).toHaveLength(3);
    });

    test('8 eighth notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C1))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C2))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C3))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C5))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C6))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C7))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C8))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C0))
      ).toBeInstanceOf(FullMeasure);

      expect([...measure]).toHaveLength(8);
    });

    test('cannot add half note to 3 quarter notes', () => {
      expect(() =>
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C1))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C2))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C3))
          .add(new Note(Pitch.C, Duration.Half, Octave.C4))
      ).toThrow(`cannot fit -${Duration.Half.Name} note in measure`);
    });
  });

  describe('in 3/4', () => {
    const timeSignature = new SimpleTimeSignature(3, Duration.Quarter);
    let measure = new Measure(timeSignature);

    beforeEach(() => {
      measure = new Measure(timeSignature);
    });

    test('cannot fit double', () => {
      expect(() => measure.add(new Note(Pitch.C, Duration.Double, Octave.C4))).toThrow(
        `cannot fit -${Duration.Double.Name} note in measure`
      );
    });

    test('dotted half note fills it', () => {
      expect(measure.add(new Note(Pitch.C, Duration.DottedHalf, Octave.C4))).toBeInstanceOf(
        FullMeasure
      );
    });

    test('2 dotted quarter notes notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C0))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C1))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C2))
      ).toBeInstanceOf(FullMeasure);
    });

    test('3 quarter notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C5))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C6))
      ).toBeInstanceOf(FullMeasure);
    });

    test('2 dotted quarter notes and a quarter note fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C0))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C1))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C2))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C5))
      ).toBeInstanceOf(FullMeasure);
    });

    test('6 eighth notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C6))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C5))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C3))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C2))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C1))
      ).toBeInstanceOf(FullMeasure);
    });

    test('cannot add dotted quarter to 2 quarter notes', () => {
      expect(() =>
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C1))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C2))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C3))
      ).toThrow(`cannot fit -${Duration.DottedQuarter.Name} note in measure`);
    });
  });

  describe('in 12/8', () => {
    const timeSignature = new CompoundTimeSignature(12, Duration.Eighth);
    let measure = new Measure(timeSignature);

    beforeEach(() => {
      measure = new Measure(timeSignature);
    });

    test('cannot fit double', () => {
      expect(() => measure.add(new Note(Pitch.C, Duration.Double, Octave.C4))).toThrow(
        `cannot fit -${Duration.Double.Name} note in measure`
      );
    });

    test('2 dotted half note fills it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedHalf, Octave.C5))
          .add(new Note(Pitch.C, Duration.DottedHalf, Octave.C6))
      ).toBeInstanceOf(FullMeasure);
    });

    test('4 dotted quarter notes notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C3))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C2))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C0))
      ).toBeInstanceOf(FullMeasure);
    });

    test('6 quarter notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C5))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C3))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C6))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C2))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C1))
      ).toBeInstanceOf(FullMeasure);
    });

    test('12 eighth notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C0))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C1))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C2))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C3))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C5))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C6))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C7))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C8))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C0))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C1))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C2))
      ).toBeInstanceOf(FullMeasure);
    });

    test('cannot add dotted quarter to 5 quarter notes', () => {
      expect(() =>
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C1))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C2))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C3))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C5))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
      ).toThrow(`cannot fit -${Duration.DottedQuarter.Name} note in measure`);
    });
  });

  describe('in 6/8', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth);
    let measure = new Measure(timeSignature);

    beforeEach(() => {
      measure = new Measure(timeSignature);
    });

    test('cannot fit whole', () => {
      expect(() => measure.add(new Note(Pitch.C, Duration.Whole, Octave.C4))).toThrow(
        `cannot fit -${Duration.Whole.Name} note in measure`
      );
    });

    test('dotted half note fills it', () => {
      expect(measure.add(new Note(Pitch.C, Duration.DottedHalf, Octave.C4))).toBeInstanceOf(
        FullMeasure
      );
    });

    test('2 dotted quarter notes notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C0))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C1))
      ).toBeInstanceOf(FullMeasure);
    });

    test('3 quarter notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C3))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C2))
      ).toBeInstanceOf(FullMeasure);
    });

    test('6 eighth notes fill it', () => {
      expect(
        measure
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C3))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C5))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C6))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C7))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C8))
      ).toBeInstanceOf(FullMeasure);
    });

    test('cannot add dotted quarter to 2 quarter notes', () => {
      expect(() =>
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C6))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C5))
      ).toThrow(`cannot fit -${Duration.DottedQuarter.Name} note in measure`);
    });
  });
});

describe('Song should', () => {
  test('allow adding measures to itself', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const song = new Song(timeSignature, Key.CMajor);
    const initialMeasureCount = [...song].length;

    song.addMeasure(new Measure(timeSignature));

    const finalMeasureCount = [...song].length;

    expect(initialMeasureCount).toBeLessThan(finalMeasureCount);
  });

  test('allow adding notes to last measure', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const song = new Song(timeSignature, Key.CMajor);
    const initialMeasureCount = [...song].length;

    song.add(new Note(Pitch.C, Duration.Quarter, Octave.C4));

    const finalMeasureCount = [...song].length;

    expect(initialMeasureCount).toBeLessThan(finalMeasureCount);
  });

  test('allow adding notes and when measure is full add a new measure', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const song = new Song(timeSignature, Key.CMajor);

    song.add(new Note(Pitch.C, Duration.Quarter, Octave.C4));
    song.add(new Note(Pitch.C, Duration.Quarter, Octave.C4));
    song.add(new Note(Pitch.C, Duration.Quarter, Octave.C4));
    song.add(new Note(Pitch.C, Duration.Quarter, Octave.C4));
    song.add(new Note(Pitch.C, Duration.Quarter, Octave.C4));

    const finalMeasureCount = [...song].length;

    expect(finalMeasureCount).toBe(2);
  });
});
