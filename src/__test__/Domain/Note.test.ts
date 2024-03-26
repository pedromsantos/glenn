import * as fc from 'fast-check';

import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import { Duration } from '../../Domain/Duration';
import { Interval, IntervalDirection } from '../../Domain/Interval';
import { MelodicLine, Note, Octave, Rest } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';

describe('Rest', () => {
  test('has a duration', () => {
    const rest = new Rest(Duration.Quarter);

    expect(rest.Duration).toBe(Duration.Quarter);
    expect(rest.DurationName).toBe(Duration.Quarter.Name);
    expect(rest.tick).toBe(Duration.Quarter.tick);
  });

  test('does not have a pitch', () => {
    const rest = new Rest(Duration.Quarter);

    expect([...rest.Pitches]).toHaveLength(0);
  });

  test('does not have an octave', () => {
    const rest = new Rest(Duration.Quarter);

    expect([...rest.Octaves]).toHaveLength(0);
    expect([...rest.OctaveNames]).toHaveLength(0);
  });

  test('does not have a note', () => {
    const rest = new Rest(Duration.Quarter);

    expect([...rest.Notes]).toHaveLength(0);
    expect([...rest.MidiNumbers]).toHaveLength(0);
  });
});

describe('Note', () => {
  describe('transpose using a', () => {
    const note = new Note(Pitch.C, Duration.Quarter, Octave.C1);

    test('Unison from C to C', () => {
      expect(note.transpose(Interval.Unison).Pitch).toBe(Pitch.C);
    });

    test('MinorSecond from C to D flat', () => {
      expect(note.transpose(Interval.MinorSecond).Pitch).toBe(Pitch.DFlat);
    });

    test('MajorSecond from C to D', () => {
      expect(note.transpose(Interval.MajorSecond).Pitch).toBe(Pitch.D);
    });

    test('AugmentedSecond from C to D sharp', () => {
      expect(note.transpose(Interval.AugmentedSecond).Pitch).toBe(Pitch.DSharp);
    });

    test('MinorThird from C to E flat', () => {
      expect(note.transpose(Interval.MinorThird).Pitch).toBe(Pitch.EFlat);
    });

    test('MajorThird from C to E', () => {
      expect(note.transpose(Interval.MajorThird).Pitch).toBe(Pitch.E);
    });

    test('PerfectFourth from C to F', () => {
      expect(note.transpose(Interval.PerfectFourth).Pitch).toBe(Pitch.F);
    });

    test('AugmentedFourth from C to F sharp', () => {
      expect(note.transpose(Interval.AugmentedFourth).Pitch).toBe(Pitch.FSharp);
    });

    test('DiminishedFifth from C to G flat', () => {
      expect(note.transpose(Interval.DiminishedFifth).Pitch).toBe(Pitch.GFlat);
    });

    test('PerfectFifth from C to G', () => {
      expect(note.transpose(Interval.PerfectFifth).Pitch).toBe(Pitch.G);
    });

    test('AugmentedFifth from C to G sharp', () => {
      expect(note.transpose(Interval.AugmentedFifth).Pitch).toBe(Pitch.GSharp);
    });

    test('MinorSixth from C to A flat', () => {
      expect(note.transpose(Interval.MinorSixth).Pitch).toBe(Pitch.AFlat);
    });

    test('MajorSixth from C to A', () => {
      expect(note.transpose(Interval.MajorSixth).Pitch).toBe(Pitch.A);
    });

    test('diminished seventh from C to B flat flat', () => {
      expect(note.transpose(Interval.DiminishedSeventh).Pitch).toBe(Pitch.A);
    });

    test('minor seventh from C to B flat', () => {
      expect(note.transpose(Interval.MinorSeventh).Pitch).toBe(Pitch.BFlat);
    });

    test('MajorSeventh from C to B', () => {
      expect(note.transpose(Interval.MajorSeventh).Pitch).toBe(Pitch.B);
    });
  });

  describe('measure intervals between', () => {
    const note = new Note(Pitch.C, Duration.Quarter, Octave.C1);

    test('C and Db to minor second', () => {
      expect(note.intervalTo(new Note(Pitch.DFlat, Duration.Quarter, Octave.C1))).toBe(
        Interval.MinorSecond
      );
    });

    test('C and D as MajorSecond', () => {
      expect(note.intervalTo(new Note(Pitch.D, Duration.Quarter, Octave.C1))).toBe(
        Interval.MajorSecond
      );
    });

    test('C and E flat as MinorThird', () => {
      expect(note.intervalTo(new Note(Pitch.EFlat, Duration.Quarter, Octave.C1))).toBe(
        Interval.MinorThird
      );
    });

    test('C and E as MajorThird', () => {
      expect(note.intervalTo(new Note(Pitch.E, Duration.Quarter, Octave.C1))).toBe(
        Interval.MajorThird
      );
    });

    test('C and F as PerfectFourth', () => {
      expect(note.intervalTo(new Note(Pitch.F, Duration.Quarter, Octave.C1))).toBe(
        Interval.PerfectFourth
      );
    });

    test('C and F sharp as AugmentedFourth', () => {
      expect(note.intervalTo(new Note(Pitch.FSharp, Duration.Quarter, Octave.C1))).toBe(
        Interval.AugmentedFourth
      );
    });

    test('C and G flat as DiminishedFifth', () => {
      expect(note.intervalTo(new Note(Pitch.GFlat, Duration.Quarter, Octave.C1))).toBe(
        Interval.DiminishedFifth
      );
    });

    test('C and G as PerfectFifth', () => {
      expect(note.intervalTo(new Note(Pitch.G, Duration.Quarter, Octave.C1))).toBe(
        Interval.PerfectFifth
      );
    });

    test('C and G sharp as AugmentedFifth', () => {
      expect(note.intervalTo(new Note(Pitch.GSharp, Duration.Quarter, Octave.C1))).toBe(
        Interval.AugmentedFifth
      );
    });

    test('C and A flat as MinorSixth', () => {
      expect(note.intervalTo(new Note(Pitch.AFlat, Duration.Quarter, Octave.C1))).toBe(
        Interval.MinorSixth
      );
    });

    test('C and A as MajorSixth', () => {
      expect(note.intervalTo(new Note(Pitch.A, Duration.Quarter, Octave.C1))).toBe(
        Interval.MajorSixth
      );
    });

    test('C and B flat as MinorSeventh', () => {
      expect(note.intervalTo(new Note(Pitch.BFlat, Duration.Quarter, Octave.C1))).toBe(
        Interval.MinorSeventh
      );
    });

    test('C and B as MajorSeventh', () => {
      expect(note.intervalTo(new Note(Pitch.B, Duration.Quarter, Octave.C1))).toBe(
        Interval.MajorSeventh
      );
    });
  });

  describe('interval direction between G and', () => {
    const note = new Note(Pitch.G, Duration.Quarter, Octave.C1);

    test('C to be descending', () => {
      expect(note.intervalDirection(new Note(Pitch.C, Duration.Quarter, Octave.C1))).toBe(
        IntervalDirection.Descending
      );
    });

    test('D to be descending', () => {
      expect(note.intervalDirection(new Note(Pitch.D, Duration.Quarter, Octave.C1))).toBe(
        IntervalDirection.Descending
      );
    });

    test('E to be descending', () => {
      expect(note.intervalDirection(new Note(Pitch.E, Duration.Quarter, Octave.C1))).toBe(
        IntervalDirection.Descending
      );
    });

    test('F to be descending', () => {
      expect(note.intervalDirection(new Note(Pitch.F, Duration.Quarter, Octave.C1))).toBe(
        IntervalDirection.Descending
      );
    });

    test('Gb to be descending', () => {
      expect(note.intervalDirection(new Note(Pitch.GFlat, Duration.Quarter, Octave.C1))).toBe(
        IntervalDirection.Descending
      );
    });

    test('G to be level', () => {
      expect(note.intervalDirection(new Note(Pitch.G, Duration.Quarter, Octave.C1))).toBe(
        IntervalDirection.Level
      );
    });

    test('G# to be ascending', () => {
      expect(note.intervalDirection(new Note(Pitch.GSharp, Duration.Quarter, Octave.C1))).toBe(
        IntervalDirection.Ascending
      );
    });

    test('A to be ascending', () => {
      expect(note.intervalDirection(new Note(Pitch.A, Duration.Quarter, Octave.C1))).toBe(
        IntervalDirection.Ascending
      );
    });

    test('B to be ascending', () => {
      expect(note.intervalDirection(new Note(Pitch.A, Duration.Quarter, Octave.C1))).toBe(
        IntervalDirection.Ascending
      );
    });
  });

  test('convert to primitive note', () => {
    const note = new Note(Pitch.C, Duration.Quarter, Octave.C1);

    const notePrimitive = note.To;

    expect(notePrimitive).toStrictEqual({
      duration: { value: 0.25, name: 'Quarter', fraction: '1/4' },
      pitch: { name: 'C', naturalName: 'C', value: 0, accidental: 0 },
      octave: { midi: 12, name: 'Contra', value: -8 },
    });
  });

  test('midi values for notes start at 0 and go to 128', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Pitch.pitches),
        fc.constantFrom(...Octave.octaves),
        (pitch: Pitch, octave: Octave) => {
          const note = new Note(pitch, Duration.Quarter, octave);

          expect(note.MidiNumbers.pop()).toBe(octave.MidiBaseValue + pitch.NumericValue);
        }
      ),
      { verbose: true }
    );
  });

  test('Has a single pitch, octave and note', () => {
    const note = new Note(Pitch.C, Duration.Quarter, Octave.C1);

    expect(note.Pitch).toBe(Pitch.C);
    expect([...note.Pitches][0]).toBe(Pitch.C);
    expect([...note.Pitches]).toHaveLength(1);
    expect([...note.Notes][0]).toBe(note);
    expect([...note.Notes]).toHaveLength(1);
    expect([...note.Octaves][0]).toBe(Octave.C1);
    expect([...note.Octaves]).toHaveLength(1);
    expect(note.OctaveNames).toBe(Octave.C1.Name);
  });

  describe('C is chord tone of', () => {
    const note = new Note(Pitch.C, Duration.Quarter, Octave.C1);

    test('C Major', () => {
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major, Duration.Quarter, Octave.C4);

      expect(note.isChordToneOf(chord)).toBeTruthy();
    });

    test('A minor 6', () => {
      const chord = new ClosedChord(Pitch.A, ChordPattern.Minor6, Duration.Quarter, Octave.C4);

      expect(note.isChordToneOf(chord)).toBeTruthy();
    });

    test('D minor 7', () => {
      const chord = new ClosedChord(Pitch.D, ChordPattern.Minor7, Duration.Quarter, Octave.C4);

      expect(note.isChordToneOf(chord)).toBeTruthy();
    });
  });

  describe('C is not chord tone of', () => {
    const note = new Note(Pitch.C, Duration.Quarter, Octave.C1);

    test('D minor', () => {
      const chord = new ClosedChord(Pitch.D, ChordPattern.Minor, Duration.Quarter, Octave.C4);

      expect(note.isChordToneOf(chord)).toBeFalsy();
    });
  });
});

describe('calculate interval between C1 and', () => {
  const firstNote = new Note(Pitch.C, Duration.Quarter, Octave.C1);

  test('D1 to be a major second', () => {
    const secondNote = new Note(Pitch.D, Duration.Quarter, Octave.C1);

    expect(firstNote.intervalTo(secondNote)).toStrictEqual(Interval.MajorSecond);
  });

  test('Eb1 to be a minor third', () => {
    const secondNote = new Note(Pitch.EFlat, Duration.Quarter, Octave.C1);

    expect(firstNote.intervalTo(secondNote)).toStrictEqual(Interval.MinorThird);
  });

  test('C1 to be a unison', () => {
    const secondNote = new Note(Pitch.C, Duration.Quarter, Octave.C1);

    expect(firstNote.intervalTo(secondNote)).toStrictEqual(Interval.Unison);
  });

  test('C2 to be an octave', () => {
    const secondNote = new Note(Pitch.C, Duration.Quarter, Octave.C2);

    expect(firstNote.intervalTo(secondNote)).toStrictEqual(Interval.PerfectOctave);
  });

  test('F2 to be an eleventh', () => {
    const secondNote = new Note(Pitch.F, Duration.Quarter, Octave.C2);

    expect(firstNote.intervalTo(secondNote)).toStrictEqual(Interval.PerfectEleventh);
  });

  test('F#2 to be a sharp eleventh', () => {
    const secondNote = new Note(Pitch.FSharp, Duration.Quarter, Octave.C2);

    expect(firstNote.intervalTo(secondNote)).toStrictEqual(Interval.AugmentedEleventh);
  });
});

describe('Octave', () => {
  test('convert to primitive octave', () => {
    expect(Octave.C1.To).toStrictEqual({
      midi: 12,
      name: 'Contra',
      value: -8,
    });
  });
});

describe('Melodic line', () => {
  test('convert to primitive phrase', () => {
    const phrase = new MelodicLine([new Note(Pitch.C, Duration.Quarter, Octave.C1)]);
    const phrasePrimitive = phrase.To;

    expect(phrasePrimitive).toStrictEqual({
      notes: [
        {
          duration: { value: 0.25, name: 'Quarter', fraction: '1/4' },
          pitch: { name: 'C', value: 0, naturalName: 'C', accidental: 0 },
          octave: { midi: 12, name: 'Contra', value: -8 },
        },
      ],
    });
  });
});
