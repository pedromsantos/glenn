import { CounterPointHarmony, CounterPointParts, FirstSpecies } from '../../Domain/Counterpoint';
import { Duration } from '../../Domain/Duration';
import { MelodicPhrase, Note, Octave } from '../../Domain/Note';
import Pitch from '../../Domain/Pitch';
import Scale, { ScaleDegree, ScalePattern } from '../../Domain/Scale';

describe('First species counterpoint', () => {
  test('valid', () => {
    const parts: CounterPointParts = {
      counterPoint: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C7)]),
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C7)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));
    expect(species.validate()).toStrictEqual({ isValid: true });
  });

  test('invalid note (only whole notes)', () => {
    const parts: CounterPointParts = {
      counterPoint: new MelodicPhrase([new Note(Pitch.C, Duration.Quarter, Octave.C7)]),
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C7)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toStrictEqual({
      isValid: false,
      index: 0,
      message: 'not a whole note',
    });
  });

  test('invalid note (not a chord tone)', () => {
    const parts: CounterPointParts = {
      counterPoint: new MelodicPhrase([new Note(Pitch.F, Duration.Whole, Octave.C7)]),
      cantusFirmus: new MelodicPhrase([new Note(Pitch.C, Duration.Whole, Octave.C7)]),
      cantusFirmusHarmony: new CounterPointHarmony([ScaleDegree.I]),
    };

    const species = new FirstSpecies(parts, new Scale(ScalePattern.Ionian, Pitch.C));

    expect(species.validate()).toStrictEqual({
      isValid: false,
      index: 0,
      message: 'not a chord tone',
    });
  });
});
