import { Fret, GuitarMelodicLine, GuitarString, Position } from '../../Domain/Guitar';
import Pitch, { MelodicLine, MelodicLineDirection } from '../../Domain/Pitch';
import { ScalePattern } from '../../Domain/Scale';

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

  describe('Map E to', () => {
    test('open string on sixth string for open position', () => {
      const line = new MelodicLine([Pitch.E], MelodicLineDirection.Ascending);
      const guitarLine = new GuitarMelodicLine(line, Position.Open);

      const fret = Array.from(guitarLine)[0];
      const expectedFret = new Fret(GuitarString.Sixth, 0);

      expect(fret).toStrictEqual(expectedFret);
    });

    test('2nd fret on fourth string for C Position', () => {
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
      const line = new MelodicLine([Pitch.E], MelodicLineDirection.Ascending);
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

    test('21st fret on third string for E8 Position', () => {
      const line = new MelodicLine([Pitch.E]);
      const guitarLine = new GuitarMelodicLine(line, Position.E8);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.Third, 21));
    });
  });
});
