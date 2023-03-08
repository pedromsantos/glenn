import { CompoundTimeSignature, Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { Note, Octave } from '../../Domain/Note';
import Pitch from '../../Domain/Pitch';
import { FullMeasure, Measure, Song } from '../../Domain/Song';

describe('Measure', () => {
  describe('in 4/4', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);

    // eslint-disable-next-line sonarjs/no-duplicate-string
    test('cannot fit double', () => {
      const measure = new Measure(timeSignature);

      expect(() => measure.add(new Note(Pitch.C, Duration.Double, Octave.C4))).toThrow(
        `cannot fit -${Duration.Double.Name} note in measure`
      );
    });

    test('whole note fills it', () => {
      const measure = new Measure(timeSignature);

      expect(measure.add(new Note(Pitch.C, Duration.Whole, Octave.C4))).toBeInstanceOf(FullMeasure);
    });

    test('2 half notes notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.Half, Octave.C4))
          .add(new Note(Pitch.C, Duration.Half, Octave.C4))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('4 quarter notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('2 dotted quarter notes and a quarter note fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('8 eighth notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('cannot add half note to 3 quarter notes', () => {
      const measure = new Measure(timeSignature);

      expect(() =>
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Half, Octave.C4))
      ).toThrow(`cannot fit -${Duration.Half.Name} note in measure`);
    });
  });

  describe('in 3/4', () => {
    const timeSignature = new SimpleTimeSignature(3, Duration.Quarter);

    test('cannot fit double', () => {
      const measure = new Measure(timeSignature);

      expect(() => measure.add(new Note(Pitch.C, Duration.Double, Octave.C4))).toThrow(
        `cannot fit -${Duration.Double.Name} note in measure`
      );
    });

    test('dotted half note fills it', () => {
      const measure = new Measure(timeSignature);

      expect(measure.add(new Note(Pitch.C, Duration.DottedHalf, Octave.C4))).toBeInstanceOf(
        FullMeasure
      );
    });

    test('2 dotted quarter notes notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('3 quarter notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('2 dotted quarter notes and a quarter note fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.SixtyFourth, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('6 eighth notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('cannot add dotted quarter to 2 quarter notes', () => {
      const measure = new Measure(timeSignature);

      expect(() =>
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
      ).toThrow(`cannot fit -${Duration.DottedQuarter.Name} note in measure`);
    });
  });

  describe('in 12/8', () => {
    const timeSignature = new CompoundTimeSignature(12, Duration.Eighth);

    test('cannot fit double', () => {
      const measure = new Measure(timeSignature);

      expect(() => measure.add(new Note(Pitch.C, Duration.Double, Octave.C4))).toThrow(
        `cannot fit -${Duration.Double.Name} note in measure`
      );
    });

    test('2 dotted half note fills it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedHalf, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedHalf, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('4 dotted quarter notes notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('6 quarter notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('12 eighth notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('cannot add dotted quarter to 5 quarter notes', () => {
      const measure = new Measure(timeSignature);

      expect(() =>
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
      ).toThrow(`cannot fit -${Duration.DottedQuarter.Name} note in measure`);
    });
  });

  describe('in 6/8', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth);

    test('cannot fit whole', () => {
      const measure = new Measure(timeSignature);

      expect(() => measure.add(new Note(Pitch.C, Duration.Whole, Octave.C4))).toThrow(
        `cannot fit -${Duration.Whole.Name} note in measure`
      );
    });

    test('dotted half note fills it', () => {
      const measure = new Measure(timeSignature);

      expect(measure.add(new Note(Pitch.C, Duration.DottedHalf, Octave.C4))).toBeInstanceOf(
        FullMeasure
      );
    });

    test('2 dotted quarter notes notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('3 quarter notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('6 eighth notes fill it', () => {
      const measure = new Measure(timeSignature);

      expect(
        measure
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
          .add(new Note(Pitch.C, Duration.Eighth, Octave.C4))
      ).toBeInstanceOf(FullMeasure);
    });

    test('cannot add dotted quarter to 2 quarter notes', () => {
      const measure = new Measure(timeSignature);

      expect(() =>
        measure
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.Quarter, Octave.C4))
          .add(new Note(Pitch.C, Duration.DottedQuarter, Octave.C4))
      ).toThrow(`cannot fit -${Duration.DottedQuarter.Name} note in measure`);
    });
  });
});

describe('Song should', () => {
  test('allow adding measures to itself', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const song = new Song(timeSignature);
    const initialMeasureCount = [...song].length;

    song.addMeasure(new Measure(timeSignature));

    const finalMeasureCount = [...song].length;

    expect(initialMeasureCount).toBeLessThan(finalMeasureCount);
  });

  test('allow adding notes to last measure', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const song = new Song(timeSignature);
    const initialMeasureCount = [...song].length;

    song.addNote(new Note(Pitch.C, Duration.Quarter, Octave.C4));

    const finalMeasureCount = [...song].length;

    expect(initialMeasureCount).toBeLessThan(finalMeasureCount);
  });
});
