import { Duration, SimpleTimeSignature } from '../../Domain/Duration';
import { FullMeasure, Measure } from '../../Domain/Song';

describe('Measure in 4/4', () => {
  const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);

  test('cannot fit double', () => {
    const measure = new Measure(timeSignature);

    expect(() => measure.add(Duration.Double)).toThrow(
      `cannot fit -${Duration.Double.Name} note in measure`
    );
  });

  test('whole note fills it', () => {
    const measure = new Measure(timeSignature);

    expect(measure.add(Duration.Whole)).toBeInstanceOf(FullMeasure);
  });

  test('2 half notes notes fill it', () => {
    const measure = new Measure(timeSignature);

    expect(measure.add(Duration.Half).add(Duration.Half).add(Duration.SixtyFourth)).toBeInstanceOf(
      FullMeasure
    );
  });

  test('4 quarter notes fill it', () => {
    const measure = new Measure(timeSignature);

    expect(
      measure
        .add(Duration.Quarter)
        .add(Duration.Quarter)
        .add(Duration.Quarter)
        .add(Duration.Quarter)
    ).toBeInstanceOf(FullMeasure);
  });

  test('2 dotted quarter notes and a quarter note fill it', () => {
    const measure = new Measure(timeSignature);

    expect(
      measure
        .add(Duration.DottedQuarter)
        .add(Duration.DottedQuarter)
        .add(Duration.Quarter)
        .add(Duration.SixtyFourth)
    ).toBeInstanceOf(FullMeasure);
  });

  test('8 eighth notes fill it', () => {
    const measure = new Measure(timeSignature);

    expect(
      measure
        .add(Duration.Eighth)
        .add(Duration.Eighth)
        .add(Duration.Eighth)
        .add(Duration.Eighth)
        .add(Duration.Eighth)
        .add(Duration.Eighth)
        .add(Duration.Eighth)
        .add(Duration.Eighth)
        .add(Duration.SixtyFourth)
    ).toBeInstanceOf(FullMeasure);
  });

  test('cannot add half note to 3 quarter notes', () => {
    const measure = new Measure(timeSignature);

    expect(() =>
      measure.add(Duration.Quarter).add(Duration.Quarter).add(Duration.Quarter).add(Duration.Half)
    ).toThrow(`cannot fit -${Duration.Half.Name} note in measure`);
  });
});
