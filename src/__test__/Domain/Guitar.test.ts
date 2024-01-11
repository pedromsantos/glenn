import * as fc from 'fast-check';

import {
  BlankFret,
  Fret,
  GuitarMelodicLine,
  GuitarString,
  GuitarStrings,
  GuitarTuning,
  Position,
} from '../../Domain/Guitar';
import { Pitch, PitchLine, PitchLineDirection } from '../../Domain/Pitch';

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

    expect(fret.raiseOctave().Number).toBe(-1);
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
    const strings = GuitarString.standardTunning.reverse();
    for (let i = 0; i < 5; i++) {
      expect(strings?.[i]?.NextDescending).toBe(strings[i + 1]);
    }

    expect(GuitarString.standardTunning?.[5]?.NextDescending).toBe(GuitarString.Sixth);
  });

  describe('Map pitches to frets on Sixth string', () => {
    test('map E to open string', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.E)).toStrictEqual(new Fret(GuitarString.Sixth, 0));
    });

    test('map F to first fret', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.F)).toStrictEqual(new Fret(GuitarString.Sixth, 1));
    });

    test('map F# to second fret', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.FSharp)).toStrictEqual(
        new Fret(GuitarString.Sixth, 2)
      );
    });

    test('map Gb to second fret', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.GFlat)).toStrictEqual(
        new Fret(GuitarString.Sixth, 2)
      );
    });

    test('map G to third fret', () => {
      expect(GuitarString.Sixth.fretFor(Pitch.G)).toStrictEqual(new Fret(GuitarString.Sixth, 3));
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

      expect(sixth.fretFor(Pitch.E)).toStrictEqual(new Fret(sixth, 0));
      expect(fifth.fretFor(Pitch.A)).toStrictEqual(new Fret(fifth, 0));
      expect(fourth.fretFor(Pitch.CSharp)).toStrictEqual(new Fret(fourth, 0));
      expect(third.fretFor(Pitch.E)).toStrictEqual(new Fret(third, 0));
      expect(second.fretFor(Pitch.A)).toStrictEqual(new Fret(second, 0));
      expect(first.fretFor(Pitch.E)).toStrictEqual(new Fret(first, 0));
    });

    test('Open B', () => {
      const { sixth, fifth, fourth, third, second, first } = GuitarTunningStrings(
        GuitarTuning.OpenB
      );

      expect(sixth.fretFor(Pitch.B)).toStrictEqual(new Fret(sixth, 0));
      expect(fifth.fretFor(Pitch.FSharp)).toStrictEqual(new Fret(fifth, 0));
      expect(fourth.fretFor(Pitch.B)).toStrictEqual(new Fret(fourth, 0));
      expect(third.fretFor(Pitch.FSharp)).toStrictEqual(new Fret(third, 0));
      expect(second.fretFor(Pitch.B)).toStrictEqual(new Fret(second, 0));
      expect(first.fretFor(Pitch.DSharp)).toStrictEqual(new Fret(first, 0));
    });

    test('Eb', () => {
      const { sixth, fifth, fourth, third, second, first } = GuitarTunningStrings(
        GuitarTuning.EFlat
      );

      expect(sixth.fretFor(Pitch.EFlat)).toStrictEqual(new Fret(sixth, 0));
      expect(fifth.fretFor(Pitch.AFlat)).toStrictEqual(new Fret(fifth, 0));
      expect(fourth.fretFor(Pitch.DFlat)).toStrictEqual(new Fret(fourth, 0));
      expect(third.fretFor(Pitch.GFlat)).toStrictEqual(new Fret(third, 0));
      expect(second.fretFor(Pitch.BFlat)).toStrictEqual(new Fret(second, 0));
      expect(first.fretFor(Pitch.EFlat)).toStrictEqual(new Fret(first, 0));
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
  test('map E to all positions', () => {
    fc.assert(
      fc.property(fc.constantFrom(...Position.guitarPositions), (position: Position) => {
        const line = new PitchLine([Pitch.E], PitchLineDirection.Descending);
        const guitarLine = new GuitarMelodicLine(line, position);
        const positionPrimitives = position.To;

        const fret = Array.from(guitarLine)[0];

        expect(fret?.Number).toBeGreaterThanOrEqual(positionPrimitives.lowestFret.fret);
        expect(fret?.Number).toBeLessThanOrEqual(positionPrimitives.highestFret.fret);
      }),
      { verbose: true }
    );
  });
});
