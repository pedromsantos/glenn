import * as fc from 'fast-check';

import {
  BlankFret,
  Fret,
  GuitarString,
  GuitarStrings,
  GuitarTuning,
  Position,
} from '../../Domain/Guitar';
import { Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';

describe('Fret should', () => {
  test('convert to primitive', () => {
    expect(new Fret(GuitarString.First, 1).To).toStrictEqual({
      string: {
        index: 1,
        name: 'First',
      },
      fret: 1,
    });
  });

  test('raise by an octave', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...GuitarString.standardTunning),
        fc.nat({ max: 11 }),
        (guitarString, fretNumber) => {
          const octaveFret = new Fret(guitarString, fretNumber).raiseOctave();

          expect(octaveFret.Number).toBe(fretNumber + 12);
        }
      )
    );
  });

  test('still be a blank fret when raised by an octave', () => {
    const fret = new BlankFret();
    const raisedFret = fret.raiseOctave();

    expect(raisedFret instanceof BlankFret).toBe(true);
    expect(raisedFret.Number).toBe(-1);
  });

  test('not be within a range when a blank fret', () => {
    const fret = new BlankFret();

    expect(fret.isWithin(new BlankFret(), new BlankFret())).toBeFalsy();
  });

  test('Not be equal if not on same string', () => {
    const fret1 = new Fret(GuitarString.First, 1);
    const fret2 = new Fret(GuitarString.Second, 1);

    expect(fret1.equals(fret2)).toBeFalsy();
  });

  test('Not be equal if not on same fret', () => {
    const fret1 = new Fret(GuitarString.First, 1);
    const fret2 = new Fret(GuitarString.First, 2);

    expect(fret1.equals(fret2)).toBeFalsy();
  });

  test('be equal if they have same fret number and same string', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...GuitarString.standardTunning),
        fc.nat({ max: 11 }),
        (guitarString, fretNumber) => {
          const fret1 = new Fret(guitarString, fretNumber);
          const fret2 = new Fret(guitarString, fretNumber);

          expect(fret1.equals(fret2)).toBeTruthy();
        }
      )
    );
  });

  test('be within a fret range', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...GuitarString.standardTunning),
        fc.nat({ max: 11 }),
        (guitarString, fretNumber) => {
          const fret = new Fret(guitarString, fretNumber);
          const lowFret = new Fret(guitarString, fretNumber - 1);
          const highFret = new Fret(guitarString, fretNumber + 1);

          expect(fret.isWithin(lowFret, highFret)).toBeTruthy();
        }
      )
    );
  });

  test('convert to tab', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...GuitarString.standardTunning),
        fc.nat({ max: 11 }),
        (guitarString, fretNumber) => {
          const fret = new Fret(guitarString, fretNumber);

          const tab = fret.toTab().render();
          const tabedFret = tab[guitarString.Index - 1];

          expect(tabedFret).toBe(fretNumber.toString());
        }
      )
    );
  });

  describe('isWithin', () => {
    test('fret is within normal range', () => {
      const fret = new Fret(GuitarString.First, 6);
      const lowFret = new Fret(GuitarString.First, 5);
      const highFret = new Fret(GuitarString.First, 7);

      expect(fret.isWithin(lowFret, highFret)).toBe(true);
    });

    test('fret is exactly at boundaries', () => {
      const lowFret = new Fret(GuitarString.First, 5);
      const highFret = new Fret(GuitarString.First, 7);

      const fretAtLow = new Fret(GuitarString.First, 5);
      const fretAtHigh = new Fret(GuitarString.First, 7);

      expect(fretAtLow.isWithin(lowFret, highFret)).toBe(true);
      expect(fretAtHigh.isWithin(lowFret, highFret)).toBe(true);
    });

    test('fret is outside normal range', () => {
      const lowFret = new Fret(GuitarString.First, 5);
      const highFret = new Fret(GuitarString.First, 7);

      const fretTooLow = new Fret(GuitarString.First, 4);
      const fretTooHigh = new Fret(GuitarString.First, 8);

      expect(fretTooLow.isWithin(lowFret, highFret)).toBe(false);
      expect(fretTooHigh.isWithin(lowFret, highFret)).toBe(false);
    });

    test('fret is within range with margins', () => {
      const lowFret = new Fret(GuitarString.First, 5);
      const highFret = new Fret(GuitarString.First, 7);

      // Test frets outside even with margins
      const fretTooLow = new Fret(GuitarString.First, 3);
      const fretTooHigh = new Fret(GuitarString.First, 9);
      expect(fretTooLow.isWithin(lowFret, highFret)).toBe(false);
      expect(fretTooHigh.isWithin(lowFret, highFret)).toBe(false);
    });
  });
});

describe('Guitar String should', () => {
  test('move ascending across strings', () => {
    for (let i = 0; i < 5; i++) {
      expect(GuitarString.standardTunning?.[i]?.NextAscending).toBe(
        GuitarString.standardTunning[i + 1]
      );
    }

    expect(GuitarString.standardTunning?.[5]?.NextAscending).toBe(GuitarString.First);
  });

  test('move descending across strings', () => {
    const strings = [...GuitarString.standardTunning].reverse();
    for (let i = 0; i < 5; i++) {
      expect(strings[i].NextDescending).toBe(strings[i + 1]);
    }

    expect(strings[5].NextDescending).toBe(GuitarString.Sixth);
  });

  describe('Map pitches to frets on Sixth string', () => {
    test('map E to open string', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.E)).toStrictEqual(
        new Fret(GuitarString.Sixth, 0, Pitch.E)
      );
    });

    test('map F to first fret', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.F)).toStrictEqual(
        new Fret(GuitarString.Sixth, 1, Pitch.F)
      );
    });

    test('map F# to second fret', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.FSharp)).toStrictEqual(
        new Fret(GuitarString.Sixth, 2, Pitch.FSharp)
      );
    });

    test('map Gb to second fret', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.GFlat)).toStrictEqual(
        new Fret(GuitarString.Sixth, 2, Pitch.GFlat)
      );
    });

    test('map G to third fret', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.G)).toStrictEqual(
        new Fret(GuitarString.Sixth, 3, Pitch.G)
      );
    });

    test('map frets on C position sixth string', () => {
      const frets = GuitarString.Sixth.fretsFor(Position.C);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.Sixth, 1, Pitch.F, Octave.C2),
        new Fret(GuitarString.Sixth, 2, Pitch.FSharp, Octave.C2),
        new Fret(GuitarString.Sixth, 3, Pitch.G, Octave.C2),
        new Fret(GuitarString.Sixth, 4, Pitch.GSharp, Octave.C2),
        new Fret(GuitarString.Sixth, 5, Pitch.A, Octave.C2),
      ]);
    });

    test('map frets on C position fifth string', () => {
      const frets = GuitarString.Fifth.fretsFor(Position.C);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.Fifth, 1, Pitch.ASharp, Octave.C2),
        new Fret(GuitarString.Fifth, 2, Pitch.B, Octave.C2),
        new Fret(GuitarString.Fifth, 3, Pitch.C, Octave.C3),
        new Fret(GuitarString.Fifth, 4, Pitch.CSharp, Octave.C3),
        new Fret(GuitarString.Fifth, 5, Pitch.D, Octave.C3),
      ]);
    });

    test('map frets on C position fourth string', () => {
      const frets = GuitarString.Fourth.fretsFor(Position.C);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.Fourth, 1, Pitch.DSharp, Octave.C3),
        new Fret(GuitarString.Fourth, 2, Pitch.E, Octave.C3),
        new Fret(GuitarString.Fourth, 3, Pitch.F, Octave.C3),
        new Fret(GuitarString.Fourth, 4, Pitch.FSharp, Octave.C3),
        new Fret(GuitarString.Fourth, 5, Pitch.G, Octave.C3),
      ]);
    });

    test('map frets on C position third string', () => {
      const frets = GuitarString.Third.fretsFor(Position.C);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.Third, 1, Pitch.GSharp, Octave.C3),
        new Fret(GuitarString.Third, 2, Pitch.A, Octave.C3),
        new Fret(GuitarString.Third, 3, Pitch.ASharp, Octave.C3),
        new Fret(GuitarString.Third, 4, Pitch.B, Octave.C3),
        new Fret(GuitarString.Third, 5, Pitch.C, Octave.C4),
      ]);
    });

    test('map frets on C position second string', () => {
      const frets = GuitarString.Second.fretsFor(Position.C);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.Second, 1, Pitch.C, Octave.C4),
        new Fret(GuitarString.Second, 2, Pitch.CSharp, Octave.C4),
        new Fret(GuitarString.Second, 3, Pitch.D, Octave.C4),
        new Fret(GuitarString.Second, 4, Pitch.DSharp, Octave.C4),
        new Fret(GuitarString.Second, 5, Pitch.E, Octave.C4),
      ]);
    });

    test('map frets on C position first string', () => {
      const frets = GuitarString.First.fretsFor(Position.C);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.First, 1, Pitch.F, Octave.C4),
        new Fret(GuitarString.First, 2, Pitch.FSharp, Octave.C4),
        new Fret(GuitarString.First, 3, Pitch.G, Octave.C4),
        new Fret(GuitarString.First, 4, Pitch.GSharp, Octave.C4),
        new Fret(GuitarString.First, 5, Pitch.A, Octave.C4),
      ]);
    });

    test('map frets on A position', () => {
      const frets = GuitarString.Sixth.fretsFor(Position.A);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.Sixth, 4, Pitch.GSharp, Octave.C2),
        new Fret(GuitarString.Sixth, 5, Pitch.A, Octave.C2),
        new Fret(GuitarString.Sixth, 6, Pitch.ASharp, Octave.C2),
        new Fret(GuitarString.Sixth, 7, Pitch.B, Octave.C2),
        new Fret(GuitarString.Sixth, 8, Pitch.C, Octave.C3),
      ]);
    });

    test('map frets on G position', () => {
      const frets = GuitarString.Sixth.fretsFor(Position.G);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.Sixth, 6, Pitch.ASharp, Octave.C2),
        new Fret(GuitarString.Sixth, 7, Pitch.B, Octave.C2),
        new Fret(GuitarString.Sixth, 8, Pitch.C, Octave.C3),
        new Fret(GuitarString.Sixth, 9, Pitch.CSharp, Octave.C3),
        new Fret(GuitarString.Sixth, 10, Pitch.D, Octave.C3),
      ]);
    });

    test('map frets on E position', () => {
      const frets = GuitarString.Sixth.fretsFor(Position.E);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.Sixth, 9, Pitch.CSharp, Octave.C3),
        new Fret(GuitarString.Sixth, 10, Pitch.D, Octave.C3),
        new Fret(GuitarString.Sixth, 11, Pitch.DSharp, Octave.C3),
        new Fret(GuitarString.Sixth, 12, Pitch.E, Octave.C3),
      ]);
    });

    test('map frets on D position', () => {
      const frets = GuitarString.Sixth.fretsFor(Position.D);

      expect([...frets]).toStrictEqual([
        new Fret(GuitarString.Sixth, 11, Pitch.DSharp, Octave.C3),
        new Fret(GuitarString.Sixth, 12, Pitch.E, Octave.C3),
        new Fret(GuitarString.Sixth, 13, Pitch.F, Octave.C3),
        new Fret(GuitarString.Sixth, 14, Pitch.FSharp, Octave.C3),
        new Fret(GuitarString.Sixth, 15, Pitch.G, Octave.C3),
      ]);
    });

    test('convert to primitive', () => {
      expect(GuitarString.Sixth.To).toStrictEqual({
        index: 6,
        name: 'Sixth',
      });
    });

    test('convert to fret bellow 12th fret', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...GuitarString.standardTunning),
          fc.constantFrom(...Pitch.pitches),
          (guitarString, pitch) => {
            const fret = guitarString.fretFor(pitch);

            expect(fret.Number).toBeLessThan(12);
            expect(fret.String).toBe(guitarString);
          }
        )
      );
    });
  });

  describe('Non standard tunings', () => {
    test('Open A', () => {
      const { sixth, fifth, fourth, third, second, first } = GuitarTunningStrings(
        GuitarTuning.OpenA
      );

      expect(sixth.fretFor(Pitch.E)).toStrictEqual(new Fret(sixth, 0, Pitch.E));
      expect(fifth.fretFor(Pitch.A)).toStrictEqual(new Fret(fifth, 0, Pitch.A));
      expect(fourth.fretFor(Pitch.CSharp)).toStrictEqual(new Fret(fourth, 0, Pitch.CSharp));
      expect(third.fretFor(Pitch.E)).toStrictEqual(new Fret(third, 0, Pitch.E));
      expect(second.fretFor(Pitch.A)).toStrictEqual(new Fret(second, 0, Pitch.A));
      expect(first.fretFor(Pitch.E)).toStrictEqual(new Fret(first, 0, Pitch.E));
    });

    test('Open B', () => {
      const { sixth, fifth, fourth, third, second, first } = GuitarTunningStrings(
        GuitarTuning.OpenB
      );

      expect(sixth.fretFor(Pitch.B)).toStrictEqual(new Fret(sixth, 0, Pitch.B));
      expect(fifth.fretFor(Pitch.FSharp)).toStrictEqual(new Fret(fifth, 0, Pitch.FSharp));
      expect(fourth.fretFor(Pitch.B)).toStrictEqual(new Fret(fourth, 0, Pitch.B));
      expect(third.fretFor(Pitch.FSharp)).toStrictEqual(new Fret(third, 0, Pitch.FSharp));
      expect(second.fretFor(Pitch.B)).toStrictEqual(new Fret(second, 0, Pitch.B));
      expect(first.fretFor(Pitch.DSharp)).toStrictEqual(new Fret(first, 0, Pitch.DSharp));
    });

    test('Eb', () => {
      const { sixth, fifth, fourth, third, second, first } = GuitarTunningStrings(
        GuitarTuning.EFlat
      );

      expect(sixth.fretFor(Pitch.EFlat)).toStrictEqual(new Fret(sixth, 0, Pitch.EFlat));
      expect(fifth.fretFor(Pitch.AFlat)).toStrictEqual(new Fret(fifth, 0, Pitch.AFlat));
      expect(fourth.fretFor(Pitch.DFlat)).toStrictEqual(new Fret(fourth, 0, Pitch.DFlat));
      expect(third.fretFor(Pitch.GFlat)).toStrictEqual(new Fret(third, 0, Pitch.GFlat));
      expect(second.fretFor(Pitch.BFlat)).toStrictEqual(new Fret(second, 0, Pitch.BFlat));
      expect(first.fretFor(Pitch.EFlat)).toStrictEqual(new Fret(first, 0, Pitch.EFlat));
    });
  });

  function GuitarTunningStrings(tunning: GuitarTuning) {
    const guitarStrings = new GuitarStrings().toTunning(tunning);

    const sixth = guitarStrings.guitarString(6);
    const fifth = guitarStrings.guitarString(5);
    const fourth = guitarStrings.guitarString(4);
    const third = guitarStrings.guitarString(3);
    const second = guitarStrings.guitarString(2);
    const first = guitarStrings.guitarString(1);
    return { sixth, fifth, fourth, third, second, first };
  }
});

describe('Position should', () => {
  test('be created from primitives', () => {
    const position = Position.From(Position.C.To);

    expect(position.High).toBe(Position.C.High);
    expect(position.Low).toBe(Position.C.Low);
  });

  test('not be created from primitives when primitives are invalid', () => {
    expect(() =>
      Position.From({
        name: 'invalid',
        lowestFret: { string: { name: 'first', index: 0 }, fret: 0 },
        highestFret: { string: { name: 'first', index: 0 }, fret: 0 },
      })
    ).toThrow();
  });
});

describe('BlankFret', () => {
  test('should maintain blank properties when raised by octave', () => {
    const blankFret = new BlankFret();
    const raisedFret = blankFret.raiseOctave();

    expect(raisedFret).toBeInstanceOf(BlankFret);
    expect(raisedFret.Number).toBe(-1);
    expect(raisedFret.toString()).toBe('-');
  });

  test('should always return false for isWithin', () => {
    const blankFret = new BlankFret();
    const lowFret = new Fret(GuitarString.First, 5);
    const highFret = new Fret(GuitarString.First, 7);

    expect(blankFret.isWithin(lowFret, highFret)).toBe(false);
    expect(blankFret.isWithin(lowFret, highFret)).toBe(false);
  });

  test('should create blank tab column', () => {
    const blankFret = new BlankFret();
    const tab = blankFret.toTab();
    const renderedTab = tab.render();

    expect(renderedTab.every((row) => row === '-')).toBe(true);
    expect(renderedTab).toStrictEqual(Array(6).fill('-'));
  });
});
