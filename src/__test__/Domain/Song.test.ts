import { Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { Note, Octave } from '../../Domain/Note';
import Pitch from '../../Domain/Pitch';
import { FullMeasure, Measure } from '../../Domain/Song';

describe('Measure in 4/4', () => {
  const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);

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
