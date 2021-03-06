import * as fc from 'fast-check';

import { ChordPattern } from '../../Domain/Chord';
import Pitch from '../../Domain/Pitch';
import { ScaleDegree, ScalePattern, SeventhHarmonizer, TriadHarmonizer } from '../../Domain/Scale';
import { convertPitchesToDistances } from '../utils';

describe('Scale properties', () => {
  test('any Dorian should have same notes as C Dorian transposed by the interval from C to pitch', () => {
    fc.assert(
      fc.property(fc.constantFrom(...Pitch.natural), (pitch) => {
        const scalePitchesC = [
          Pitch.C,
          Pitch.D,
          Pitch.EFlat,
          Pitch.F,
          Pitch.G,
          Pitch.A,
          Pitch.BFlat,
        ];
        const scalePitches = ScalePattern.Dorian.createScalePitches(pitch);
        const intervalToC = Pitch.C.intervalTo(pitch);
        const transposedCScale = scalePitchesC.map((pitch) => pitch.transpose(intervalToC));

        expect(scalePitches).toStrictEqual(transposedCScale);
      }),
      { verbose: true }
    );
  });

  test('any Ionian should have same notes as C Ionian transposed by the interval from C to pitch', () => {
    fc.assert(
      fc.property(fc.constantFrom(...Pitch.natural), (pitch) => {
        const scalePitchesC = [Pitch.C, Pitch.D, Pitch.E, Pitch.F, Pitch.G, Pitch.A, Pitch.B];
        const scalePitches = ScalePattern.Ionian.createScale(pitch).Pitches;
        const intervalToC = Pitch.C.intervalTo(pitch);
        const transposedCScale = scalePitchesC.map((pitch) => pitch.transpose(intervalToC));

        expect(scalePitches).toStrictEqual(transposedCScale);
      }),
      { verbose: true }
    );
  });

  test('scale primitive has same name as pattern', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.natural),
        fc.constantFrom(...ScalePattern.ScalePatterns),
        (pitch, pattern) => {
          const scale = pattern.createScale(pitch);

          expect(scale.To.pattern).toStrictEqual(pattern.Name);
        }
      ),
      { verbose: true }
    );
  });

  test('any Major Scale Mode should have same note distances as the corresponding C Major Scale Mode', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.natural),
        fc.constantFrom(
          ...[
            ScalePattern.Ionian,
            ScalePattern.Dorian,
            ScalePattern.Lydian,
            ScalePattern.Mixolydian,
          ]
        ),
        (pitch, pattern) => {
          const distancesScale = convertPitchesToDistances(pattern.createScale(pitch).Pitches);
          const distancesCScale = convertPitchesToDistances(pattern.createScale(Pitch.C).Pitches);

          expect(distancesScale).toStrictEqual(distancesCScale);
        }
      ),
      { verbose: false }
    );
  });
});

describe('C Scales', () => {
  test('Ionian should have notes C, D, E, F, G, A, B', () => {
    expect(ScalePattern.Ionian.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.F,
      Pitch.G,
      Pitch.A,
      Pitch.B,
    ]);
  });

  test('Dorian should have notes C, D, Eb, F, G, A, Bb', () => {
    expect(ScalePattern.Dorian.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.A,
      Pitch.BFlat,
    ]);
  });

  test('Phrygian should have notes C, Db, Eb, F, G, Ab, Bb', () => {
    expect(ScalePattern.Phrygian.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.DFlat,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.AFlat,
      Pitch.BFlat,
    ]);
  });

  test('Lydian should have notes C, D, E, F#, G, A, B', () => {
    expect(ScalePattern.Lydian.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.FSharp,
      Pitch.G,
      Pitch.A,
      Pitch.B,
    ]);
  });
  test('Mixolydian should have notes C, D, E, F, G, A, Bb', () => {
    expect(ScalePattern.Mixolydian.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.F,
      Pitch.G,
      Pitch.A,
      Pitch.BFlat,
    ]);
  });

  test('Aolian should have notes C, D, Eb, F, G, Ab, Bb', () => {
    expect(ScalePattern.Aolian.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.AFlat,
      Pitch.BFlat,
    ]);
  });

  test('Locrian should have notes C, Db, Eb, F, Gb, Ab, Bb', () => {
    expect(ScalePattern.Locrian.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.DFlat,
      Pitch.EFlat,
      Pitch.F,
      Pitch.GFlat,
      Pitch.AFlat,
      Pitch.BFlat,
    ]);
  });

  test('Major Pentatonic should have notes C, D, E, G, A', () => {
    expect(ScalePattern.MajorPentatonic.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.G,
      Pitch.A,
    ]);
  });

  test('Minor Pentatonic should have notes C, Eb, F, G, Bb', () => {
    expect(ScalePattern.MinorPentatonic.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.BFlat,
    ]);
  });

  test('Bebop should have notes C, Eb, F, Gb, G, Bb, B', () => {
    expect(ScalePattern.Bebop.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.F,
      Pitch.G,
      Pitch.A,
      Pitch.BFlat,
      Pitch.B,
    ]);
  });

  test('Bebop should have notes C, Eb, F, Gb, G, Bb', () => {
    expect(ScalePattern.Blues.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.EFlat,
      Pitch.F,
      Pitch.GFlat,
      Pitch.G,
      Pitch.BFlat,
    ]);
  });

  test('Harmonic minor should have notes C; D; Eb; F; G; Ab; B', () => {
    expect(ScalePattern.HarmonicMinor.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.AFlat,
      Pitch.B,
    ]);
  });

  test('Melodic minor should have notes C; D; Eb; F; G; A; B', () => {
    expect(ScalePattern.MelodicMinor.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.A,
      Pitch.B,
    ]);
  });

  test('Dorianb2 should have notes C; Db; Eb; F; G; A; Bb', () => {
    expect(ScalePattern.Dorianb2.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.DFlat,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.A,
      Pitch.BFlat,
    ]);
  });

  test('NeapolitanMinor should have notes C; Db; Eb; F; G; Ab; B', () => {
    expect(ScalePattern.NeapolitanMinor.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.DFlat,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.AFlat,
      Pitch.B,
    ]);
  });

  test('LydianAugmented should have notes C; D; E; F#; G#; A; B', () => {
    expect(ScalePattern.LydianAugmented.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.FSharp,
      Pitch.GSharp,
      Pitch.A,
      Pitch.B,
    ]);
  });

  test('LydianDominant should have notes C; D; E; F#; G; A; Bb', () => {
    expect(ScalePattern.LydianDominant.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.FSharp,
      Pitch.G,
      Pitch.A,
      Pitch.BFlat,
    ]);
  });

  test('Mixolydianb6 should have notes C; D; E; F; G; Ab; Bb', () => {
    expect(ScalePattern.Mixolydianb6.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.F,
      Pitch.G,
      Pitch.AFlat,
      Pitch.BFlat,
    ]);
  });

  test('LocrianSharp2 should have notes C; D; Eb; F; Gb; Ab; Bb', () => {
    expect(ScalePattern.LocrianSharp2.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.EFlat,
      Pitch.F,
      Pitch.GFlat,
      Pitch.AFlat,
      Pitch.BFlat,
    ]);
  });

  test('AlteredDominant should have notes C; Db; D#, Eb; Gb; G#; Bb', () => {
    expect(ScalePattern.AlteredDominant.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.DFlat,
      Pitch.DSharp,
      Pitch.E,
      Pitch.GFlat,
      Pitch.GSharp,
      Pitch.BFlat,
    ]);
  });

  test('HalfWholeDiminished should have notes C; Db; Eb; E; F#; G; A, Bb', () => {
    expect(ScalePattern.HalfWholeDiminished.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.DFlat,
      Pitch.EFlat,
      Pitch.E,
      Pitch.FSharp,
      Pitch.G,
      Pitch.A,
      Pitch.BFlat,
    ]);
  });

  test('WholeTone should have notes C D E Gb G# Bb', () => {
    expect(ScalePattern.WholeTone.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.GFlat,
      Pitch.GSharp,
      Pitch.BFlat,
    ]);
  });

  test('MajorSixthDiminishedScale should have notes C D E F G G# A B', () => {
    expect(ScalePattern.MajorSixthDiminished.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.F,
      Pitch.G,
      Pitch.GSharp,
      Pitch.A,
      Pitch.B,
    ]);
  });

  test('MinorSixthDiminishedScale should have notes C D Eb F G G# A B', () => {
    expect(ScalePattern.MinorSixthDiminished.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.GSharp,
      Pitch.A,
      Pitch.B,
    ]);
  });

  test('DominantDiminishedScale should have notes C D E F G G# Bb B', () => {
    expect(ScalePattern.DominantDiminished.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.F,
      Pitch.G,
      Pitch.GSharp,
      Pitch.BFlat,
      Pitch.B,
    ]);
  });

  test('Dominantb5DiminishedScale should have notes C D E F Gb G# Bb B', () => {
    expect(ScalePattern.Dominantb5Diminished.createScale(Pitch.C).Pitches).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.F,
      Pitch.GFlat,
      Pitch.GSharp,
      Pitch.BFlat,
      Pitch.B,
    ]);
  });
});

describe('Triad harmonizer should', () => {
  test('Harmonize I degree of Ionian mode as a triad', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new TriadHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.I);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major);
    expect(chord.Pitches).toStrictEqual([Pitch.C, Pitch.E, Pitch.G]);
  });

  test('Harmonize II degree of Ionian mode as a triad', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new TriadHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.II);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.D, Pitch.F, Pitch.A].map((p) => p.Name)
    );
  });

  test('Harmonize III degree of Ionian mode as a triad', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new TriadHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.III);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.E, Pitch.G, Pitch.B].map((p) => p.Name)
    );
  });

  test('Harmonize IV degree of Ionian mode as a triad', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new TriadHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.IV);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.F, Pitch.A, Pitch.C].map((p) => p.Name)
    );
  });

  test('Harmonize V degree of Ionian mode as a triad', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new TriadHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.V);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.G, Pitch.B, Pitch.D].map((p) => p.Name)
    );
  });

  test('Harmonize VI degree of Ionian mode as a triad', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new TriadHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.VI);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.A, Pitch.C, Pitch.E].map((p) => p.Name)
    );
  });

  test('Harmonize VII degree of Ionian mode as a triad', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new TriadHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.VII);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Diminished);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.B, Pitch.D, Pitch.F].map((p) => p.Name)
    );
  });
});

describe('Sevenths harmonizer should', () => {
  test('Harmonize I degree of Ionian mode as a seventh chord', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new SeventhHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.I);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major7);
    expect(chord.Pitches).toStrictEqual([Pitch.C, Pitch.E, Pitch.G, Pitch.B]);
  });

  test('Harmonize II degree of Ionian mode as a seventh chord', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new SeventhHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.II);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor7);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.D, Pitch.F, Pitch.A, Pitch.C].map((p) => p.Name)
    );
  });

  test('Harmonize III degree of Ionian mode as a seventh chord', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new SeventhHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.III);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor7);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.E, Pitch.G, Pitch.B, Pitch.D].map((p) => p.Name)
    );
  });

  test('Harmonize IV degree of Ionian mode as a seventh chord', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new SeventhHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.IV);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major7);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.F, Pitch.A, Pitch.C, Pitch.E].map((p) => p.Name)
    );
  });

  test('Harmonize V degree of Ionian mode as a seventh chord', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new SeventhHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.V);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Dominant7);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.G, Pitch.B, Pitch.D, Pitch.F].map((p) => p.Name)
    );
  });

  test('Harmonize VI degree of Ionian mode as a seventh chord', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new SeventhHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.VI);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor7);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.A, Pitch.C, Pitch.E, Pitch.G].map((p) => p.Name)
    );
  });

  test('Harmonize VII degree of Ionian mode as a seventh chord', () => {
    const scale = ScalePattern.Ionian.createScale(Pitch.C);
    const harmonizer = new SeventhHarmonizer(scale);
    const chord = harmonizer.chordFor(ScaleDegree.VII);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor7b5);
    expect(chord.Pitches.map((p) => p.Name)).toStrictEqual(
      [Pitch.B, Pitch.D, Pitch.F, Pitch.A].map((p) => p.Name)
    );
  });
});
