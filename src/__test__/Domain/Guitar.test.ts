import {
  Fret,
  GuitarMelodicLine,
  Position,
  GuitarString,
  Tab,
  TabColumn,
} from '../../Domain/Guitar';
import Pitch, { MelodicLine, MelodicLineDirection } from '../../Domain/Pitch';
import { ScalePattern } from '../../Domain/Scale';

describe('Sixth string should', () => {
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
});

describe('Guitar melodic line should', () => {
  describe('map C major scale to guitar frets on', () => {
    test('C position ascending', () => {
      const line = ScalePattern.Ionian.createMelodicLineScale(Pitch.C);
      const guitarLine = new GuitarMelodicLine(line, Position.C);

      const fret = guitarLine.get(0);
      expect(fret?.isSame(new Fret(GuitarString.Fifth, 3, Pitch.C))).toBeTruthy();
    });

    test('C position descending', () => {
      const line = ScalePattern.Ionian.createDescendingMelodicLineScale(Pitch.C);
      const guitarLine = new GuitarMelodicLine(line, Position.C);

      const fret = guitarLine.get(0);

      expect(fret).toStrictEqual(new Fret(GuitarString.Second, 1, Pitch.C));
    });
  });

  describe('map E to', () => {
    test('open string on sixth string for open position', () => {
      const line = new MelodicLine([Pitch.E], MelodicLineDirection.Descending);
      const guitarLine = new GuitarMelodicLine(line, Position.Open);

      const fret = guitarLine.get(0);
      const expectedFret = new Fret(GuitarString.Sixth, 0, Pitch.E);

      expect(fret).toStrictEqual(expectedFret);
    });

    test('2th fret on fourth string for C Position', () => {
      const line = new MelodicLine([Pitch.E]);
      const guitarLine = new GuitarMelodicLine(line, Position.C);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.Fourth, 2, Pitch.E));
    });

    test('5th fret on second string for A Position', () => {
      const line = new MelodicLine([Pitch.E]);
      const guitarLine = new GuitarMelodicLine(line, Position.A);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.Second, 5, Pitch.E));
    });

    test('7th fret on fifth string for G Position', () => {
      const line = new MelodicLine([Pitch.E]);
      const guitarLine = new GuitarMelodicLine(line, Position.G);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 7, Pitch.E));
    });

    test('9th fret on third string for E Position', () => {
      const line = new MelodicLine([Pitch.E]);
      const guitarLine = new GuitarMelodicLine(line, Position.E);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.Third, 9, Pitch.E));
    });

    test('12th fret on first string for D Position', () => {
      const line = new MelodicLine([Pitch.E], MelodicLineDirection.Descending);
      const guitarLine = new GuitarMelodicLine(line, Position.D);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.First, 12, Pitch.E));
    });
  });
});

describe('Guitar tab should', () => {
  test('render tunning', () => {
    const tab = new Tab();
    const renderedTab = tab.render([TabColumn.StandardTunning]);

    expect(renderedTab).toBe('e\nB\nG\nD\nA\nE');
  });

  test('render tunning + start', () => {
    const tab = new Tab();
    const renderedTab = tab.render([TabColumn.StandardTunning, TabColumn.Start]);

    expect(renderedTab).toBe('e||-\nB||-\nG||-\nD||-\nA||-\nE||-');
  });

  test('render tunning + start + end', () => {
    const tab = new Tab();
    const renderedTab = tab.render([TabColumn.StandardTunning, TabColumn.Start, TabColumn.End]);

    expect(renderedTab).toBe('e||--||\nB||--||\nG||--||\nD||--||\nA||--||\nE||--||');
  });
});
