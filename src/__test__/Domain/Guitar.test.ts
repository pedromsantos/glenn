import * as fc from 'fast-check';

import { Fret, GuitarMelodicLine, GuitarString, Position } from '../../Domain/Guitar';
import Pitch, { MelodicLine, MelodicLineDirection } from '../../Domain/Pitch';

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
        fc.constantFrom(...GuitarString.guitarStrings),
        fc.nat({ max: 11 }),
        (guitarString, fretNumber) => {
          const octaveFret = new Fret(guitarString, fretNumber).raiseOctave();

          expect(octaveFret.Number).toBe(fretNumber + 12);
        }
      )
    );
  });

  test('be equal if they have same fret number and same string', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...GuitarString.guitarStrings),
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
        fc.constantFrom(...GuitarString.guitarStrings),
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
        fc.constantFrom(...GuitarString.guitarStrings),
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
      expect(GuitarString.guitarStrings?.[i]?.NextAscending).toBe(
        GuitarString.guitarStrings[i + 1]
      );
    }

    expect(GuitarString.guitarStrings?.[5]?.NextAscending).toBe(GuitarString.First);
  });

  test('move descending across strings', () => {
    const strings = GuitarString.guitarStrings.reverse();
    for (let i = 0; i < 5; i++) {
      expect(strings?.[i]?.NextDescending).toBe(strings[i + 1]);
    }

    expect(GuitarString.guitarStrings?.[5]?.NextDescending).toBe(GuitarString.Sixth);
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
          fc.constantFrom(...GuitarString.guitarStrings),
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
});

describe('Position should', () => {
  test('map E to all positions', () => {
    fc.assert(
      fc.property(fc.constantFrom(...Position.guitarPositions), (position: Position) => {
        const line = new MelodicLine([Pitch.E], MelodicLineDirection.Descending);
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
