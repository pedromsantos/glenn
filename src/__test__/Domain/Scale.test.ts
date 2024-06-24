import * as fc from 'fast-check';

import { ChordPattern } from '../../Domain/Chord';
import { Duration } from '../../Domain/Duration';
import { Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { ScaleDegree, ScalePattern, SeventhHarmonizer, TriadHarmonizer } from '../../Domain/Scale';
import { convertPitchesToDistances } from '../utils';

describe('Scale properties', () => {
  test('Converting to thirds', () => {
    const scaleDegrees = [
      ScaleDegree.I,
      ScaleDegree.II,
      ScaleDegree.III,
      ScaleDegree.IV,
      ScaleDegree.V,
      ScaleDegree.VI,
      ScaleDegree.VII,
    ];
    fc.assert(
      fc.property(fc.constantFrom(...scaleDegrees), (scaleDegree: ScaleDegree) => {
        expect(ScalePattern.Ionian.createScale(Pitch.C).thirdsFrom(scaleDegree)).toHaveLength(7);
      })
    );
  });

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
      })
    );
  });

  test('any Ionian should have same notes as C Ionian transposed by the interval from C to pitch', () => {
    fc.assert(
      fc.property(fc.constantFrom(...Pitch.natural), (pitch) => {
        const scalePitchesC = [Pitch.C, Pitch.D, Pitch.E, Pitch.F, Pitch.G, Pitch.A, Pitch.B];
        const scalePitches = Array.from(ScalePattern.Ionian.createScale(pitch));
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

          expect(scale.To.pattern.name).toStrictEqual(pattern.Name);
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
          const distancesScale = convertPitchesToDistances(Array.from(pattern.createScale(pitch)));
          const distancesCScale = convertPitchesToDistances(
            Array.from(pattern.createScale(Pitch.C))
          );

          expect(distancesScale).toStrictEqual(distancesCScale);
        }
      ),
      { verbose: false }
    );
  });
});

describe('C Scales', () => {
  test('Ionian should have notes C, D, E, F, G, A, B', () => {
    expect(Array.from(ScalePattern.Ionian.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.Dorian.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.Phrygian.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.Lydian.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.Mixolydian.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.Aolian.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.Locrian.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.MajorPentatonic.createScale(Pitch.C))).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.G,
      Pitch.A,
    ]);
  });

  test('Minor Pentatonic should have notes C, Eb, F, G, Bb', () => {
    expect(Array.from(ScalePattern.MinorPentatonic.createScale(Pitch.C))).toStrictEqual([
      Pitch.C,
      Pitch.EFlat,
      Pitch.F,
      Pitch.G,
      Pitch.BFlat,
    ]);
  });

  test('Bebop should have notes C, Eb, F, Gb, G, Bb, B', () => {
    expect(Array.from(ScalePattern.Bebop.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.Blues.createScale(Pitch.C))).toStrictEqual([
      Pitch.C,
      Pitch.EFlat,
      Pitch.F,
      Pitch.GFlat,
      Pitch.G,
      Pitch.BFlat,
    ]);
  });

  test('Harmonic minor should have notes C; D; Eb; F; G; Ab; B', () => {
    expect(Array.from(ScalePattern.HarmonicMinor.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.MelodicMinor.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.Dorianb2.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.NeapolitanMinor.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.LydianAugmented.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.LydianDominant.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.Mixolydianb6.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.LocrianSharp2.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.AlteredDominant.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.HalfWholeDiminished.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.WholeTone.createScale(Pitch.C))).toStrictEqual([
      Pitch.C,
      Pitch.D,
      Pitch.E,
      Pitch.GFlat,
      Pitch.GSharp,
      Pitch.BFlat,
    ]);
  });

  test('MajorSixthDiminishedScale should have notes C D E F G G# A B', () => {
    expect(Array.from(ScalePattern.MajorSixthDiminished.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.MinorSixthDiminished.createScale(Pitch.C))).toStrictEqual([
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
    expect(Array.from(ScalePattern.DominantDiminished.createScale(Pitch.C))).toStrictEqual([
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

  test('Dominantb5Diminished Scale should have notes C D E F Gb G# Bb B', () => {
    expect(Array.from(ScalePattern.Dominantb5Diminished.createScale(Pitch.C))).toStrictEqual([
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

  test('melodic line from scale', () => {
    const line = ScalePattern.Ionian.createScale(Pitch.C).melodicLine(Duration.Eighth, Octave.C4);

    expect(Array.from(line)).toStrictEqual([
      new Note(Pitch.C, Duration.Eighth, Octave.C4),
      new Note(Pitch.D, Duration.Eighth, Octave.C4),
      new Note(Pitch.E, Duration.Eighth, Octave.C4),
      new Note(Pitch.F, Duration.Eighth, Octave.C4),
      new Note(Pitch.G, Duration.Eighth, Octave.C4),
      new Note(Pitch.A, Duration.Eighth, Octave.C4),
      new Note(Pitch.B, Duration.Eighth, Octave.C4),
    ]);
  });

  test('melodic line from scale with octave above', () => {
    const line = ScalePattern.Ionian.createScale(Pitch.C)
      .melodicLine(Duration.Eighth, Octave.C4)
      .appendOctaveAbove();

    expect(Array.from(line)).toStrictEqual([
      new Note(Pitch.C, Duration.Eighth, Octave.C4),
      new Note(Pitch.D, Duration.Eighth, Octave.C4),
      new Note(Pitch.E, Duration.Eighth, Octave.C4),
      new Note(Pitch.F, Duration.Eighth, Octave.C4),
      new Note(Pitch.G, Duration.Eighth, Octave.C4),
      new Note(Pitch.A, Duration.Eighth, Octave.C4),
      new Note(Pitch.B, Duration.Eighth, Octave.C4),
      new Note(Pitch.C, Duration.Eighth, Octave.C5),
      new Note(Pitch.D, Duration.Eighth, Octave.C5),
      new Note(Pitch.E, Duration.Eighth, Octave.C5),
      new Note(Pitch.F, Duration.Eighth, Octave.C5),
      new Note(Pitch.G, Duration.Eighth, Octave.C5),
      new Note(Pitch.A, Duration.Eighth, Octave.C5),
      new Note(Pitch.B, Duration.Eighth, Octave.C5),
    ]);
  });

  test('melodic line from scale with octave bellow', () => {
    const line = ScalePattern.Ionian.createScale(Pitch.C)
      .melodicLine(Duration.Eighth, Octave.C4)
      .prependOctaveDown();

    expect(Array.from(line)).toStrictEqual([
      new Note(Pitch.C, Duration.Eighth, Octave.C3),
      new Note(Pitch.D, Duration.Eighth, Octave.C3),
      new Note(Pitch.E, Duration.Eighth, Octave.C3),
      new Note(Pitch.F, Duration.Eighth, Octave.C3),
      new Note(Pitch.G, Duration.Eighth, Octave.C3),
      new Note(Pitch.A, Duration.Eighth, Octave.C3),
      new Note(Pitch.B, Duration.Eighth, Octave.C3),
      new Note(Pitch.C, Duration.Eighth, Octave.C4),
      new Note(Pitch.D, Duration.Eighth, Octave.C4),
      new Note(Pitch.E, Duration.Eighth, Octave.C4),
      new Note(Pitch.F, Duration.Eighth, Octave.C4),
      new Note(Pitch.G, Duration.Eighth, Octave.C4),
      new Note(Pitch.A, Duration.Eighth, Octave.C4),
      new Note(Pitch.B, Duration.Eighth, Octave.C4),
    ]);
  });
});

describe('Triad harmonizer should', () => {
  const scale = ScalePattern.Ionian.createScale(Pitch.C);
  const harmonizer = new TriadHarmonizer(scale);

  test('Harmonize I degree of Ionian mode as a triad', () => {
    const chord = harmonizer.chordFor(ScaleDegree.I);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major);
    expect(Array.from(chord)).toStrictEqual([Pitch.C, Pitch.E, Pitch.G]);
  });

  test('Harmonize II degree of Ionian mode as a triad', () => {
    const chord = harmonizer.chordFor(ScaleDegree.II);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.D, Pitch.F, Pitch.A].map((p) => p.Name)
    );
  });

  test('Harmonize III degree of Ionian mode as a triad', () => {
    const chord = harmonizer.chordFor(ScaleDegree.III);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.E, Pitch.G, Pitch.B].map((p) => p.Name)
    );
  });

  test('Harmonize IV degree of Ionian mode as a triad', () => {
    const chord = harmonizer.chordFor(ScaleDegree.IV);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.F, Pitch.A, Pitch.C].map((p) => p.Name)
    );
  });

  test('Harmonize V degree of Ionian mode as a triad', () => {
    const chord = harmonizer.chordFor(ScaleDegree.V);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.G, Pitch.B, Pitch.D].map((p) => p.Name)
    );
  });

  test('Harmonize VI degree of Ionian mode as a triad', () => {
    const chord = harmonizer.chordFor(ScaleDegree.VI);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.A, Pitch.C, Pitch.E].map((p) => p.Name)
    );
  });

  test('Harmonize VII degree of Ionian mode as a triad', () => {
    const chord = harmonizer.chordFor(ScaleDegree.VII);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Diminished);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.B, Pitch.D, Pitch.F].map((p) => p.Name)
    );
  });
});

describe('Sevenths harmonizer should', () => {
  const scale = ScalePattern.Ionian.createScale(Pitch.C);
  const harmonizer = new SeventhHarmonizer(scale);

  test('Harmonize I degree of Ionian mode as a seventh chord', () => {
    const chord = harmonizer.chordFor(ScaleDegree.I);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major7);
    expect(Array.from(chord)).toStrictEqual([Pitch.C, Pitch.E, Pitch.G, Pitch.B]);
  });

  test('Harmonize II degree of Ionian mode as a seventh chord', () => {
    const chord = harmonizer.chordFor(ScaleDegree.II);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor7);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.D, Pitch.F, Pitch.A, Pitch.C].map((p) => p.Name)
    );
  });

  test('Harmonize III degree of Ionian mode as a seventh chord', () => {
    const chord = harmonizer.chordFor(ScaleDegree.III);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor7);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.E, Pitch.G, Pitch.B, Pitch.D].map((p) => p.Name)
    );
  });

  test('Harmonize IV degree of Ionian mode as a seventh chord', () => {
    const chord = harmonizer.chordFor(ScaleDegree.IV);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Major7);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.F, Pitch.A, Pitch.C, Pitch.E].map((p) => p.Name)
    );
  });

  test('Harmonize V degree of Ionian mode as a seventh chord', () => {
    const chord = harmonizer.chordFor(ScaleDegree.V);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Dominant7);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.G, Pitch.B, Pitch.D, Pitch.F].map((p) => p.Name)
    );
  });

  test('Harmonize VI degree of Ionian mode as a seventh chord', () => {
    const chord = harmonizer.chordFor(ScaleDegree.VI);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor7);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.A, Pitch.C, Pitch.E, Pitch.G].map((p) => p.Name)
    );
  });

  test('Harmonize VII degree of Ionian mode as a seventh chord', () => {
    const chord = harmonizer.chordFor(ScaleDegree.VII);

    expect(chord.Pattern).toStrictEqual(ChordPattern.Minor7b5);
    expect(Array.from(chord).map((p) => p.Name)).toStrictEqual(
      [Pitch.B, Pitch.D, Pitch.F, Pitch.A].map((p) => p.Name)
    );
  });
});
