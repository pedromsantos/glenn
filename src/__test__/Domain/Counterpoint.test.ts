import { createCounterpointParts, FirstSpecies } from '../../Domain/Counterpoint';
import { Duration } from '../../Domain/Duration';
import { Voice } from '../../Domain/Instrument';
import { MelodicPhrase, Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { Scale, ScaleDegree, ScalePattern } from '../../Domain/Scale';

describe('First species counterpoint', () => {
  test('valid', () => {
    const counterPoint = new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]);
    const cantusFirmus = new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]);
    const parts = createCounterpointParts(counterPoint, cantusFirmus, [ScaleDegree.I]);

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));
    expect(species.validate()).toStrictEqual([]);
  });

  test('invalid note (only whole notes)', () => {
    const counterPoint = new MelodicPhrase([new Note(Pitch.C, Duration.Half, Octave.C5)]);
    const cantusFirmus = new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C5)]);
    const parts = createCounterpointParts(counterPoint, cantusFirmus, [ScaleDegree.I]);

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'not a whole note',
    });
  });

  test('invalid note (not a chord tone)', () => {
    const counterPoint = new MelodicPhrase([new Note(Pitch.D, Duration.Whole, Octave.C3)]);
    const cantusFirmus = new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C3)]);
    const parts = createCounterpointParts(counterPoint, cantusFirmus, [ScaleDegree.I]);

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'not a chord tone',
    });
  });

  test('invalid note (not in range)', () => {
    const counterPoint = new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C5)]);
    const cantusFirmus = new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]);
    const parts = createCounterpointParts(counterPoint, cantusFirmus, [ScaleDegree.I], Voice.Bass);

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'not in range',
    });
  });

  test('invalid note (repeated)', () => {
    const counterPoint = new MelodicPhrase([
      new Note(Pitch.C, Duration.Whole, Octave.C3),
      new Note(Pitch.C, Duration.Whole, Octave.C3),
    ]);
    const cantusFirmus = new MelodicPhrase([
      new Note(Pitch.C, Duration.Whole, Octave.C3),
      new Note(Pitch.A, Duration.Whole, Octave.C3),
    ]);
    const parts = createCounterpointParts(
      counterPoint,
      cantusFirmus,
      [ScaleDegree.I, ScaleDegree.VI],
      Voice.Bass
    );

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 1,
      message: 'repeated note',
    });
  });

  test('invalid note (leap to big)', () => {
    const counterPoint = new MelodicPhrase([
      new Note(Pitch.B, Duration.Whole, Octave.C5),
      new Note(Pitch.C, Duration.Whole, Octave.C5),
    ]);
    const cantusFirmus = new MelodicPhrase([
      new Note(Pitch.C, Duration.Whole, Octave.C5),
      new Note(Pitch.C, Duration.Whole, Octave.C5),
    ]);
    const parts = createCounterpointParts(
      counterPoint,
      cantusFirmus,
      [ScaleDegree.I, ScaleDegree.I],
      Voice.ContrAlto
    );

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 1,
      message: 'invalid leap',
    });
  });

  test('invalid interval (Major Second)', () => {
    const counterPoint = new MelodicPhrase([new Note(Pitch.D, Duration.Whole, Octave.C4)]);
    const cantusFirmus = new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]);
    const parts = createCounterpointParts(counterPoint, cantusFirmus, [ScaleDegree.I], Voice.Bass);

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'invalid interval of a Major Second',
    });
  });

  test('invalid interval (Perfect Fourth)', () => {
    const counterPoint = new MelodicPhrase([new Note(Pitch.F, Duration.Whole, Octave.C5)]);
    const cantusFirmus = new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C5)]);
    const parts = createCounterpointParts(counterPoint, cantusFirmus, [ScaleDegree.I], Voice.Tenor);

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'invalid interval of a Perfect Fourth',
    });
  });

  test('invalid interval (Major Seventh)', () => {
    const counterPoint = new MelodicPhrase([new Note(Pitch.B, Duration.Whole, Octave.C2)]);
    const cantusFirmus = new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C2)]);
    const parts = createCounterpointParts(
      counterPoint,
      cantusFirmus,
      [ScaleDegree.I],
      Voice.ContrAlto
    );

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'invalid interval of a Major Seventh',
    });
  });
});
