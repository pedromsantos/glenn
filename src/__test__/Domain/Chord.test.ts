import * as fc from 'fast-check';

import { ChordFunction, ChordPattern, ClosedChord } from '../../Domain/Chord';
import { Duration } from '../../Domain/Duration';
import { Octave } from '../../Domain/Note';
import { Accidental, Pitch } from '../../Domain/Pitch';

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
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Major));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 6 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.A];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Major6));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 6 add 9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.A, Pitch.D];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Major6Add9));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 7 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Major7));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B, Pitch.D];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Major9));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 11 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B, Pitch.F];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Major11));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 13#11 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B, Pitch.FSharp, Pitch.A];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Major13Sharp11));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C Major 9#11 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B, Pitch.D, Pitch.FSharp];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Major9Sharp11));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for CMaj7#5 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.GSharp, Pitch.B];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Augmented7));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for CAug chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.GSharp];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Augmented));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });
});

describe('Dominant Chords should', () => {
  test('Have expected pitches for C7 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Dominant7));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat, Pitch.D];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Dominant9));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C7b5b9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.GFlat, Pitch.BFlat, Pitch.DFlat];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Dominant7Flat5Flat9));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C7b5#9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.GFlat, Pitch.BFlat, Pitch.DSharp];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Dominant7Flat5Sharp9));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C11 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat, Pitch.D, Pitch.F];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Dominant11));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C13 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat, Pitch.D, Pitch.F, Pitch.A];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Dominant13));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  test('Have expected pitches for C7#9 chord', () => {
    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.BFlat, Pitch.DSharp];
    const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Dominant7Sharp9));
    expect(chordPitches).toStrictEqual(expectedPitches);
  });

  describe('Minor Chords should', () => {
    test('Have expected pitches for C- chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Minor));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-6 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.A];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Minor6));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-6add9 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.A, Pitch.D];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Minor6Add9));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-7 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.BFlat];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Minor7));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-Maj7 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.B];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.MinorMaj7));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-9 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.BFlat, Pitch.D];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Minor9));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-Maj9 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.G, Pitch.B, Pitch.D];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.MinorMaj9));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for C-7b5 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.GFlat, Pitch.BFlat];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Minor7b5));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });
  });

  describe('Diminished Chords should', () => {
    test('Have expected pitches for Cdim chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.GFlat];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Diminished));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for Cdim7 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.GFlat, Pitch.A];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Diminished7));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });
  });

  describe('Sus Chords should', () => {
    test('Have expected pitches for CSus2 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.D, Pitch.G];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Sus2));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus2dim chord', () => {
      const expectedPitches = [Pitch.C, Pitch.D, Pitch.GFlat];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Sus2Diminished));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus2aug chord', () => {
      const expectedPitches = [Pitch.C, Pitch.D, Pitch.GSharp];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Sus2Augmented));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus4 chord', () => {
      const expectedPitches = [Pitch.C, Pitch.F, Pitch.G];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Sus4));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus4dim chord', () => {
      const expectedPitches = [Pitch.C, Pitch.F, Pitch.GFlat];
      const chordPitches = Array.from(new ClosedChord(Pitch.C, ChordPattern.Sus4Diminished));
      expect(chordPitches).toStrictEqual(expectedPitches);
    });

    test('Have expected pitches for CSus4aug chord', () => {
      const expectedPitches = [Pitch.C, Pitch.F, Pitch.GSharp];
      const chord = new ClosedChord(Pitch.C, ChordPattern.Sus4Augmented);

      expect(Array.from(chord)).toStrictEqual(expectedPitches);
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

  test('be named after the root note and the abbreviated quality', () => {
    const name = new ClosedChord(Pitch.C, ChordPattern.Diminished7).Abbreviation;
    expect(name).toBe('Cdim7');
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
    expect(Array.from(chord)).toStrictEqual(expectedPitches);
  });

  test('be able to remove Pitch for fifth on drop 2 chord', () => {
    const baseChord = new ClosedChord(Pitch.C, ChordPattern.Major7).drop2();

    const chord = baseChord.remove(ChordFunction.Fifth);

    const expectedPitches = [Pitch.C, Pitch.B, Pitch.E];
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(expectedPitches.map((p) => p.Name));
  });

  test('be able to remove Pitch for fifth on drop 3 chord', () => {
    const baseChord = new ClosedChord(Pitch.C, ChordPattern.Major7).drop3();

    const chord = baseChord.remove(ChordFunction.Fifth);

    const expectedPitches = [Pitch.C, Pitch.B, Pitch.E];
    expect(Array.from(chord)).toStrictEqual(expectedPitches);
  });

  test('be able to remove Pitch for seventh', () => {
    const baseChord = new ClosedChord(Pitch.C, ChordPattern.Diminished7);

    const chord = baseChord.remove(ChordFunction.Seventh);

    const expectedPitches = [Pitch.C, Pitch.EFlat, Pitch.GFlat];
    expect(Array.from(chord)).toStrictEqual(expectedPitches);
  });

  test('be able to be inverted to first inversion', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

    const expectedPitches = [Pitch.E, Pitch.G, Pitch.C];
    expect(Array.from(chord.invert())).toStrictEqual(expectedPitches);
  });

  test('be able to be inverted to second inversion', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

    const expectedPitches = [Pitch.G, Pitch.C, Pitch.E];
    expect(Array.from(chord.invert().invert())).toStrictEqual(expectedPitches);
  });

  test('be able to be inverted to third inversion', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.B, Pitch.C, Pitch.E, Pitch.G];
    expect(Array.from(chord.invert().invert().invert())).toStrictEqual(expectedPitches);
  });

  test('be able to be transformed into drop 2 chords', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.C, Pitch.G, Pitch.B, Pitch.E];
    expect(Array.from(chord.drop2())).toStrictEqual(expectedPitches);
  });

  test('not be able to be transformed into drop 2 chords when its a 3 note chord', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G];
    expect(Array.from(chord.drop2())).toStrictEqual(expectedPitches);
  });

  test('be able to be transformed drop 2 chords to closed chords', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7).drop2();

    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B];
    expect(Array.from(chord.closed())).toStrictEqual(expectedPitches);
  });

  test('be able to be transformed into drop 3 chords', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.C, Pitch.B, Pitch.E, Pitch.G];
    expect(Array.from(chord.drop3())).toStrictEqual(expectedPitches);
  });

  test('not be able to be transformed into drop 3 chords when its a 3 note chord', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G];
    expect(Array.from(chord.drop3())).toStrictEqual(expectedPitches);
  });

  test('be able to be transformed drop 3 chords to closed chords', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7).drop3();

    const expectedPitches = [Pitch.C, Pitch.E, Pitch.G, Pitch.B];
    expect(Array.from(chord.closed())).toStrictEqual(expectedPitches);
  });

  test('be able to be inverted to first inversion when in drop2 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.E, Pitch.B, Pitch.C, Pitch.G];
    expect(Array.from(chord.drop2().invert()).map((p) => p.Name)).toStrictEqual(
      expectedPitches.map((p) => p.Name)
    );
  });

  test('be able to be inverted to second inversion when in drop2 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.G, Pitch.C, Pitch.E, Pitch.B];
    expect(Array.from(chord.drop2().invert().invert()).map((p) => p.Name)).toStrictEqual(
      expectedPitches.map((p) => p.Name)
    );
  });

  test('be able to be inverted to third inversion when in drop2 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.B, Pitch.E, Pitch.G, Pitch.C];
    expect(Array.from(chord.drop2().invert().invert().invert()).map((p) => p.Name)).toStrictEqual(
      expectedPitches.map((p) => p.Name)
    );
  });

  test('be able to be inverted to first inversion when in drop3 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.E, Pitch.C, Pitch.G, Pitch.B];
    expect(Array.from(chord.drop3().invert()).map((p) => p.Name)).toStrictEqual(
      expectedPitches.map((p) => p.Name)
    );
  });

  test('be able to be inverted to second inversion when in drop3 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.G, Pitch.E, Pitch.B, Pitch.C];
    expect(Array.from(chord.drop3().invert().invert()).map((p) => p.Name)).toStrictEqual(
      expectedPitches.map((p) => p.Name)
    );
  });

  test('be able to be inverted to third inversion when in drop3 format', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

    const expectedPitches = [Pitch.B, Pitch.G, Pitch.C, Pitch.E];
    expect(Array.from(chord.drop3().invert().invert().invert()).map((p) => p.Name)).toStrictEqual(
      expectedPitches.map((p) => p.Name)
    );
  });

  test('be able to create chord from primitive types', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Augmented);
    const from = ClosedChord.From(chord.To);

    expect(chord.Name).toBe(from?.Name);
  });

  test('not be able to create chord from invalid primitive types', () => {
    const chordPrimitives = {
      name: 'invalid',
      abbreviation: 'invalid',
      root: Pitch.C.To,
      pitches: [{ pitch: Pitch.C.To, function: ChordFunction.Root.To }],
      pattern: 'invalid',
      bass: Pitch.C.To,
      lead: Pitch.C.To,
      duration: Duration.Whole.To,
      octave: Octave.C0.To,
    };

    expect(() => ClosedChord.From(chordPrimitives)).toThrow();
  });

  test('Converting a drop 2 chord to drop 2 returns same chord', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);
    const drop = chord.drop2();
    const other = drop.drop2();

    expect(drop).toBe(other);
  });

  test('Converting a drop 3 chord to drop 3 returns same chord', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);
    const drop = chord.drop3();
    const other = drop.drop3();

    expect(drop).toBe(other);
  });

  test('Converting a closed chord to closed returns same chord', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7);
    const other = chord.closed();

    expect(chord).toBe(other);
  });

  test('not be able to create chord from invalid primitive types', () => {
    const chordPrimitives = {
      name: 'C Major',
      abbreviation: 'CM',
      root: { name: 'V', naturalName: 'V', value: 0, accidental: Accidental.Natural },
      pitches: [],
      pattern: 'Major',
      bass: { name: 'H', naturalName: 'H', value: 0, accidental: Accidental.Natural },
      lead: { name: 'Z', naturalName: 'Z', value: 0, accidental: Accidental.Natural },
      duration: Duration.Quarter.To,
      octave: Octave.C4.To,
    };

    expect(() => ClosedChord.From(chordPrimitives)).toThrow();
  });

  test('has a duration', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7, Duration.Quarter);

    expect(chord.Duration).toBe(Duration.Quarter);
    expect(chord.DurationName).toBe(Duration.Quarter.Name);
    expect(chord.DurationValue).toBe(Duration.Quarter.value);
    expect(chord.tick).toBe(Duration.Quarter.tick);
  });

  test('to have pitches', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7, Duration.Quarter);

    expect([...chord.Pitches]).toHaveLength(4);
  });

  test('does have an octave', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7, Duration.Quarter, Octave.C3);

    expect([...chord.Octaves].pop()).toBe(Octave.C3);
    expect([...chord.OctaveNames].pop()).toBe(Octave.C3.Name);
  });

  test('does have a note', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major7, Duration.Quarter);

    expect([...chord.Notes]).toHaveLength(4);
    expect([...chord.MidiNumbers]).toHaveLength(4);
  });
});

describe('Chord properties', () => {
  test('chords inverted by the number of pitches become base root chords', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.pitches),
        fc.constantFrom(...ChordPattern.patterns),
        (root: Pitch, pattern: ChordPattern) => {
          const chord = new ClosedChord(root, pattern);
          const expectedChordPitches = Array.from(chord);
          const inversions = expectedChordPitches.length;
          let invertedChord = chord.invert();

          [...Array<ClosedChord>(inversions - 1)].forEach(() => {
            invertedChord = invertedChord.invert();
          });

          expect(Array.from(invertedChord)).toStrictEqual(expectedChordPitches);
        }
      ),
      { verbose: true }
    );
  });

  test('drop 2 chords inverted by the number of pitches become base root chords', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.pitches),
        fc.constantFrom(...ChordPattern.patterns),
        (root: Pitch, pattern: ChordPattern) => {
          const chord = new ClosedChord(root, pattern).drop2();
          const expectedChordPitches = Array.from(chord);
          const inversions = expectedChordPitches.length;

          if (inversions > 3) return;

          let invertedChord = chord.invert();

          [...Array<ClosedChord>(inversions - 1)].forEach(() => {
            invertedChord = invertedChord.invert();
          });

          expect(Array.from(invertedChord).map((p) => p.Name)).toStrictEqual(
            expectedChordPitches.map((p) => p.Name)
          );
        }
      ),
      { verbose: true }
    );
  });

  test('drop 3 chords inverted by the number of pitches become base root chords', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.pitches),
        fc.constantFrom(...ChordPattern.patterns),
        (root: Pitch, pattern: ChordPattern) => {
          const chord = new ClosedChord(root, pattern).drop3();
          const expectedChordPitches = Array.from(chord);
          const inversions = expectedChordPitches.length;

          if (inversions > 3) return;

          let invertedChord = chord.invert();

          [...Array<ClosedChord>(inversions - 1)].forEach(() => {
            invertedChord = invertedChord.invert();
          });

          expect(Array.from(invertedChord).map((p) => p.Name)).toStrictEqual(
            expectedChordPitches.map((p) => p.Name)
          );
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
        (root: Pitch, pattern: ChordPattern) => {
          const chord = new ClosedChord(root, pattern);
          const primitivesChord = chord.To;
          const from = ClosedChord.From(primitivesChord);

          expect(chord.Name).toBe(from?.Name);
          expect(Array.from(chord).map((p) => p.To)).toStrictEqual(
            primitivesChord.pitches.map((p) => p.pitch)
          );
        }
      ),
      { verbose: true }
    );
  });
});
