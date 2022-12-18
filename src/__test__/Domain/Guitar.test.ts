import * as fc from 'fast-check';

import { Fret, GuitarMelodicLine, GuitarString, Position } from '../../Domain/Guitar';
import Pitch, { MelodicLine, MelodicLineDirection } from '../../Domain/Pitch';
import { ScalePattern } from '../../Domain/Scale';

describe('Fret sould', () => {
  test('convert to primitive', () => {
    expect(new Fret(GuitarString.First, 1).To).toStrictEqual({
      string: {
        index: 1,
        name: 'First',
      },
      fret: 1,
    });
  });
});

describe('Sixth string should', () => {
  test('map E to open string', () => {
    expect(GuitarString.Sixth.fretFor(Pitch.E)).toStrictEqual(new Fret(GuitarString.Sixth, 0));
  });

  test('map F to first fret', () => {
    expect(GuitarString.Sixth.fretFor(Pitch.F)).toStrictEqual(new Fret(GuitarString.Sixth, 1));
  });

  test('map F# to second fret', () => {
    expect(GuitarString.Sixth.fretFor(Pitch.FSharp)).toStrictEqual(new Fret(GuitarString.Sixth, 2));
  });

  test('map Gb to second fret', () => {
    expect(GuitarString.Sixth.fretFor(Pitch.GFlat)).toStrictEqual(new Fret(GuitarString.Sixth, 2));
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
});

describe('Guitar melodic line should', () => {
  describe('map C major scale to guitar frets on', () => {
    test('C position ascending', () => {
      const line = ScalePattern.Ionian.createMelodicLineScale(Pitch.C);
      const guitarLine = new GuitarMelodicLine(line, Position.C);

      const fret = Array.from(guitarLine)[0];
      expect(fret?.equals(new Fret(GuitarString.Fifth, 3))).toBeTruthy();
    });

    test('C position descending', () => {
      const line = ScalePattern.Ionian.createDescendingMelodicLineScale(Pitch.C);
      const guitarLine = new GuitarMelodicLine(line, Position.C);

      const fret = Array.from(guitarLine)[0];

      expect(fret).toStrictEqual(new Fret(GuitarString.First, 5));
    });
  });

  describe('Guitar Position should', () => {
    test('map to primitives', () => {
      expect(Position.A.To).toStrictEqual({
        name: 'A',
        lowestFret: {
          string: { index: 6, name: 'Sixth' },
          fret: 4,
        },
        highestFret: {
          string: { index: 1, name: 'First' },
          fret: 8,
        },
      });
    });

    describe('map E to', () => {
      test('all positions', () => {
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

      test('open string on sixth string for open position', () => {
        const line = new MelodicLine([Pitch.E], MelodicLineDirection.Descending);
        const guitarLine = new GuitarMelodicLine(line, Position.Open);

        const fret = Array.from(guitarLine)[0];
        const expectedFret = new Fret(GuitarString.Sixth, 0);

        expect(fret).toStrictEqual(expectedFret);
      });

      test('2th fret on fourth string for C Position', () => {
        const line = new MelodicLine([Pitch.E]);
        const guitarLine = new GuitarMelodicLine(line, Position.C);

        const fret = Array.from(guitarLine)[0];
        expect(fret).toStrictEqual(new Fret(GuitarString.Fourth, 2));
      });

      test('5th fret on fifth string for A Position', () => {
        const line = new MelodicLine([Pitch.E]);
        const guitarLine = new GuitarMelodicLine(line, Position.A);

        const fret = Array.from(guitarLine)[0];
        expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 7));
      });

      test('7th fret on fifth string for G Position', () => {
        const line = new MelodicLine([Pitch.E]);
        const guitarLine = new GuitarMelodicLine(line, Position.G);

        const fret = Array.from(guitarLine)[0];
        expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 7));
      });

      test('12th fret on sixth string for E Position', () => {
        const line = new MelodicLine([Pitch.E]);
        const guitarLine = new GuitarMelodicLine(line, Position.E);

        const fret = Array.from(guitarLine)[0];
        expect(fret).toStrictEqual(new Fret(GuitarString.Sixth, 12));
      });

      test('12th fret on first string for D Position', () => {
        const line = new MelodicLine([Pitch.E], MelodicLineDirection.Descending);
        const guitarLine = new GuitarMelodicLine(line, Position.D);

        const fret = Array.from(guitarLine)[0];
        expect(fret).toStrictEqual(new Fret(GuitarString.First, 12));
      });

      test('14th fret on fourth string for C8 Position', () => {
        const line = new MelodicLine([Pitch.E], MelodicLineDirection.Descending);
        const guitarLine = new GuitarMelodicLine(line, Position.C8);

        const fret = Array.from(guitarLine)[0];
        expect(fret).toStrictEqual(new Fret(GuitarString.Fourth, 14));
      });

      test('19th fret on fifth string for A8 Position', () => {
        const line = new MelodicLine([Pitch.E]);
        const guitarLine = new GuitarMelodicLine(line, Position.A8);

        const fret = Array.from(guitarLine)[0];
        expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 19));
      });

      test('19th fret on fifth string for G8 Position', () => {
        const line = new MelodicLine([Pitch.E]);
        const guitarLine = new GuitarMelodicLine(line, Position.G8);

        const fret = Array.from(guitarLine)[0];
        expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 19));
      });

      test('21th fret on third string for E8 Position', () => {
        const line = new MelodicLine([Pitch.E]);
        const guitarLine = new GuitarMelodicLine(line, Position.E8);

        const fret = Array.from(guitarLine)[0];
        expect(fret).toStrictEqual(new Fret(GuitarString.Third, 21));
      });
    });
  });
});

describe('Guitar String', () => {
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
});
