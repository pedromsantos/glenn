import * as fc from 'fast-check';

import { ChordFunction, ChordPattern, ClosedChord } from '../../Domain/Chord';
import Pitch from '../../Domain/Pitch';

describe('Major Chords should', () => {
  test('have a name', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
    expect(chord.Name).toBe('CMajor');
  });

  test('have a root', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
    expect(chord.pitchForFunction(ChordFunction.Root)).toBe(Pitch.C);
  });

  test('have a third', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
    expect(chord.pitchForFunction(ChordFunction.Third)).toBe(Pitch.E);
  });

  test('have a fifth', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
    expect(chord.pitchForFunction(ChordFunction.Fifth)).toBe(Pitch.G);
  });

  test('have a seventh', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);
    expect(chord.pitchForFunction(ChordFunction.Seventh)).toBe(Pitch.B);
  });

  test('have a ninth', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major9);
    expect(chord.pitchForFunction(ChordFunction.Ninth)).toBe(Pitch.D);
  });

  test('have an eleventh', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major11);
    expect(chord.pitchForFunction(ChordFunction.Eleventh)).toBe(Pitch.F);
  });

  test('have a thirteenth', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major13);
    expect(chord.pitchForFunction(ChordFunction.Thirteenth)).toBe(Pitch.A);
  });

  test('Have expected pitches for C Major chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Major).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 6 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.A];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Major6).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 6 add 9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.A, Pitch.D];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Major6Add9).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 7 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Major7).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B, Pitch.D];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Major9).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 11 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B, Pitch.F];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Major11).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 13#11 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B, Pitch.FSharp, Pitch.A];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Major13Sharp11).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 9#11 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B, Pitch.D, Pitch.FSharp];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Major9Sharp11).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for CMaj7#5 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.GSharp, Pitch.B];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Augmented7).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for CAug chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.GSharp];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Augmented).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });
});

describe('Dominant Chords should', () => {
  test('Have expected pitches for C7 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Dominant7).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat, Pitch.D];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Dominant9).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C7b5b9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.GFlat, Pitch.BFlat, Pitch.DFlat];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Dominant7Flat5Flat9).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C7b5#9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.GFlat, Pitch.BFlat, Pitch.DSharp];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Dominant7Flat5Sharp9).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C11 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat, Pitch.D, Pitch.F];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Dominant11).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C13 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat, Pitch.D, Pitch.F, Pitch.A];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Dominant13).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C7#9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat, Pitch.DSharp];
    const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Dominant7Sharp9).Pitches;
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  describe('Minor Chords should', () => {
    test('Have expected pitches for C- chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Minor).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-6 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.A];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Minor6).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-6add9 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.A, Pitch.D];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Minor6Add9).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-7 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.BFlat];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Minor7).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-Maj7 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.B];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.MinorMaj7).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-9 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.BFlat, Pitch.D];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Minor9).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-Maj9 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.B, Pitch.D];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.MinorMaj9).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-7b5 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.GFlat, Pitch.BFlat];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Minor7b5).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });
  });

  describe('Diminished Chords should', () => {
    test('Have expected pitches for Cdim chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.GFlat];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Diminished).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for Cdim7 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.GFlat, Pitch.A];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Diminished7).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });
  });

  describe('Sus Chords should', () => {
    test('Have expected pitches for CSus2 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.D, Pitch.G];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Sus2).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus2dim chord', () => {
      const expectedPitches = [Pitch.C, Pitch.D, Pitch.GFlat];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Sus2Diminished).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus2aug chord', () => {
      const expectedPitches = [Pitch.C, Pitch.D, Pitch.GSharp];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Sus2Augmented).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus4 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.F, Pitch.G];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Sus4).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus4dim chord', () => {
      const expectedPitches = [Pitch.C, Pitch.F, Pitch.GFlat];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Sus4Diminished).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus4aug chord', () => {
      const expectedPitches = [Pitch.C, Pitch.F, Pitch.GSharp];
      const chordPitches = new ClosedChord(Pitch.C, ChordPattern.Sus4Augmented).Pitches;
      expect(chordPitches).toStrictEqual(expectedPitches);
    });
  });
});

describe('Chords should', () => {
  test('be named after the root note', () => {
    const name = new ClosedChord(Pitch.C, ChordPattern.Diminished).Name;
    expect(name[0]).toBe('C');
  });

  test('be named after the root note and the quality', () => {
    const name = new ClosedChord(Pitch.C, ChordPattern.Minor7b5).Name;
    expect(name).toBe('CMinor 7 b5');
  });

  test('be named after the root note and the abreviated quality', () => {
    const name = new ClosedChord(Pitch.C, ChordPattern.Diminished7).Abbreviation;
    expect(name).toBe('Cdim 7');
  });

  test('have bass note equal to root when not inverted', () => {
    const expectedPitch = Pitch.C;
    const pitch = new ClosedChord(Pitch.C, ChordPattern.Diminished).Bass;
    expect(pitch).toStrictEqual(expectedPitch);
  });

  test('Have lead note equal to fifth for triads when not inverted', () => {
    const expectedPitch = Pitch.GFlat;
    const pitch = new ClosedChord(Pitch.C, ChordPattern.Diminished).Lead;
    expect(pitch).toStrictEqual(expectedPitch);
  });

  test('be able to identify Pitch for root', () => {
    const expectedPitch = Pitch.C;
    const pitch = new ClosedChord(Pitch.C, ChordPattern.Diminished).pitchForFunction(
      ChordFunction.Root
    );
    expect(pitch).toStrictEqual(expectedPitch);
  });

  test('be able to identify Pitch for third', () => {
    const expectedPitch = Pitch.EFlat;
    const pitch = new ClosedChord(Pitch.C, ChordPattern.Diminished).pitchForFunction(
      ChordFunction.Third
    );
    expect(pitch).toStrictEqual(expectedPitch);
  });

  test('be able to identify Pitch for third on sus2 chords', () => {
    const expectedPitch = Pitch.D;
    const pitch = new ClosedChord(Pitch.C, ChordPattern.Sus2).pitchForFunction(ChordFunction.Third);
    expect(pitch).toStrictEqual(expectedPitch);
  });

  test('be able to identify Pitch for third on sus4 chords', () => {
    const expectedPitch = Pitch.F;
    const pitch = new ClosedChord(Pitch.C, ChordPattern.Sus4).pitchForFunction(ChordFunction.Third);
    expect(pitch).toStrictEqual(expectedPitch);
  });

  test('be able to identify Pitch for fifth', () => {
    const expectedPitch = Pitch.GFlat;
    const pitch = new ClosedChord(Pitch.C, ChordPattern.Diminished).pitchForFunction(
      ChordFunction.Fifth
    );
    expect(pitch).toStrictEqual(expectedPitch);
  });

  test('be able to remove Pitch for fifth', () => {
    const baseChord = new ClosedChord(Pitch.C, ChordPattern.Diminished7);

    const chord = baseChord.remove(ChordFunction.Fifth);

    const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.A];
    expect(chord.Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to remove Pitch for fifth on drop 2 chord', () => {
    const baseChord = new ClosedChord(Pitch.C, ChordPattern.Major7).drop2();

    const chord = baseChord.remove(ChordFunction.Fifth);

    const expectedPitches = [Pitch.C, Pitch.B, Pitch.E];
    expect(chord.Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to remove Pitch for fifth on drop 3 chord', () => {
    const baseChord = new ClosedChord(Pitch.C, ChordPattern.Major7).drop3();

    const chord = baseChord.remove(ChordFunction.Fifth);

    const expectedPitches = [Pitch.C, Pitch.B, Pitch.E];
    expect(chord.Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to remove Pitch for seventh', () => {
    const baseChord = new ClosedChord(Pitch.C, ChordPattern.Diminished7);

    const chord = baseChord.remove(ChordFunction.Seventh);

    const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.GFlat];
    expect(chord.Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to be inverted to first inversion', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

    const expectedPitches = [Pitch.E, Pitch.G, Pitch.C];
    expect(chord.invert().Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to be inverted to second inversion', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

    const expectedPitches = [Pitch.G, Pitch.C, Pitch.E];
    expect(chord.invert().invert().Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to be inverted to third inversion', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.B, Pitch.C, Pitch.E, Pitch.G];
    expect(chord.invert().invert().invert().Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to be transformed into drop 2 chords', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.C, Pitch.G, Pitch.B, Pitch.E];
    expect(chord.drop2().Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to be transformed drop 2 chords to closed chords', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7).drop2();

    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B];
    expect(chord.closed().Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to be transformed into drop 3 chords', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.C, Pitch.B, Pitch.E, Pitch.G];
    expect(chord.drop3().Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to be transformed drop 3 chords to closed chords', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7).drop3();

    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B];
    expect(chord.closed().Pitches).toStrictEqual(expectedPitches);
  });

  test('be able to be inverted to first inversion when in drop2 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.E, Pitch.B, Pitch.C, Pitch.G];
    expect(
      chord
        .drop2()
        .invert()
        .Pitches.map((p) => p.Name)
    ).toStrictEqual(expectedPitches.map((p) => p.Name));
  });

  test('be able to be inverted to second inversion when in drop2 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.G, Pitch.C, Pitch.E, Pitch.B];
    expect(
      chord
        .drop2()
        .invert()
        .invert()
        .Pitches.map((p) => p.Name)
    ).toStrictEqual(expectedPitches.map((p) => p.Name));
  });

  test('be able to be inverted to third inversion when in drop2 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.B, Pitch.E, Pitch.G, Pitch.C];
    expect(
      chord
        .drop2()
        .invert()
        .invert()
        .invert()
        .Pitches.map((p) => p.Name)
    ).toStrictEqual(expectedPitches.map((p) => p.Name));
  });

  test('be able to be inverted to first inversion when in drop3 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.E, Pitch.C, Pitch.G, Pitch.B];
    expect(
      chord
        .drop3()
        .invert()
        .Pitches.map((p) => p.Name)
    ).toStrictEqual(expectedPitches.map((p) => p.Name));
  });

  test('be able to be inverted to second inversion when in drop3 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.G, Pitch.E, Pitch.B, Pitch.C];
    expect(
      chord
        .drop3()
        .invert()
        .invert()
        .Pitches.map((p) => p.Name)
    ).toStrictEqual(expectedPitches.map((p) => p.Name));
  });

  test('be able to be inverted to third inversion when in drop3 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.B, Pitch.G, Pitch.C, Pitch.E];
    expect(
      chord
        .drop3()
        .invert()
        .invert()
        .invert()
        .Pitches.map((p) => p.Name)
    ).toStrictEqual(expectedPitches.map((p) => p.Name));
  });
});

describe('Chord properties', () => {
  test('chords inverted by the number of pitches become base root chords', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.pitches),
        fc.constantFrom(...ChordPattern.patterns),
        (root, pattern) => {
          const chord = new ClosedChord(root, pattern);

          const inversions = chord.Pitches.length;
          let invertedChord = chord.invert();

          [...Array(inversions - 1)].forEach(() => {
            invertedChord = invertedChord.invert();
          });

          expect(invertedChord.Pitches).toStrictEqual(chord.Pitches);
        }
      ),
      { verbose: true }
    );
  });

  test('chord can be converted to and from ChordPrimitives', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.pitches),
        fc.constantFrom(...ChordPattern.patterns),
        (root, pattern) => {
          const chord = new ClosedChord(root, pattern);
          const from = ClosedChord.From(chord.To);

          expect(chord.Name).toBe(from?.Name);
        }
      ),
      { verbose: true }
    );
  });
});
