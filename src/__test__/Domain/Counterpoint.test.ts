import { CounterPointHarmony, CounterPointParts, FirstSpecies } from '../../Domain/Counterpoint';
import { Duration } from '../../Domain/Duration';
import { Voice } from '../../Domain/Instrument';
import { MelodicPhrase, Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { Scale, ScaleDegree, ScalePattern } from '../../Domain/Scale';

describe('First species counterpoint', () => {
  test('valid', () => {
    const parts: CounterPointParts = {
      counterPoint: {
        phrase: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]),
        voice: Voice.Soprano,
      },
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));
    expect(species.validate()).toStrictEqual([]);
  });

  test('invalid note (only whole notes)', () => {
    const parts: CounterPointParts = {
      counterPoint: {
        phrase: new MelodicPhrase([new Note(Pitch.C, Duration.Quarter, Octave.C4)]),
        voice: Voice.Soprano,
      },
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'not a whole note',
    });
  });

  test('invalid note (not a chord tone)', () => {
    const parts: CounterPointParts = {
      counterPoint: {
        phrase: new MelodicPhrase([new Note(Pitch.D, Duration.Whole, Octave.C4)]),
        voice: Voice.Soprano,
      },
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'not a chord tone',
    });
  });

  test('invalid note (not in range)', () => {
    const parts: CounterPointParts = {
      counterPoint: {
        phrase: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C5)]),
        voice: Voice.Bass,
      },
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'not in range',
    });
  });

  test('invalid note (repeated)', () => {
    const parts: CounterPointParts = {
      counterPoint: {
        phrase: new MelodicPhrase([
          new Note(Pitch.C, Duration.Whole, Octave.C4),
          new Note(Pitch.C, Duration.Whole, Octave.C4),
        ]),
        voice: Voice.Bass,
      },
      cantusFirmus: new MelodicPhrase([
        new Note(Pitch.C, Duration.Whole, Octave.C4),
        new Note(Pitch.A, Duration.Whole, Octave.C4),
      ]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I, ScaleDegree.VI]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 1,
      message: 'repeated note',
    });
  });

  test('invalid note (leap to big)', () => {
    const parts: CounterPointParts = {
      counterPoint: {
        phrase: new MelodicPhrase([
          new Note(Pitch.B, Duration.Whole, Octave.C4),
          new Note(Pitch.C, Duration.Whole, Octave.C4),
        ]),
        voice: Voice.ContrAlto,
      },
      cantusFirmus: new MelodicPhrase([
        new Note(Pitch.C, Duration.Whole, Octave.C4),
        new Note(Pitch.C, Duration.Whole, Octave.C4),
      ]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I, ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 1,
      message: 'invalid leap',
    });
  });

  test('invalid interval (Major Second)', () => {
    const parts: CounterPointParts = {
      counterPoint: {
        phrase: new MelodicPhrase([new Note(Pitch.D, Duration.Whole, Octave.C4)]),
        voice: Voice.Bass,
      },
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'invalid interval of a Major Second',
    });
  });

  test('invalid interval (Perfect Fourth)', () => {
    const parts: CounterPointParts = {
      counterPoint: {
        phrase: new MelodicPhrase([new Note(Pitch.F, Duration.Whole, Octave.C4)]),
        voice: Voice.Tenor,
      },
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'invalid interval of a Perfect Fourth',
    });
  });

  test('invalid interval (Major Seventh)', () => {
    const parts: CounterPointParts = {
      counterPoint: {
        phrase: new MelodicPhrase([new Note(Pitch.B, Duration.Whole, Octave.C4)]),
        voice: Voice.ContrAlto,
      },
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C4)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toContainEqual({
      isValid: false,
      index: 0,
      message: 'invalid interval of a Major Seventh',
    });
  });
});
