import { Fret, GuitarPitchLine, GuitarString, Position } from '../../Domain/Guitar';
import { Pitch, PitchLine, PitchLineDirection } from '../../Domain/Pitch';
import { ScalePattern } from '../../Domain/Scale';

describe('Guitar pitch line should', () => {
  describe('map C major scale to guitar frets on', () => {
    test('C position ascending', () => {
      const line = ScalePattern.Ionian.createPitchLineScale(Pitch.C);
      const guitarLine = new GuitarPitchLine(line, Position.C);

      const fret = Array.from(guitarLine)[0];
      expect(fret?.equals(new Fret(GuitarString.Fifth, 3))).toBeTruthy();
    });

    test('C position descending', () => {
      const line = ScalePattern.Ionian.createDescendingPitchLineScale(Pitch.C);
      const guitarLine = new GuitarPitchLine(line, Position.C);

      const fret = Array.from(guitarLine)[0];

      expect(fret).toStrictEqual(new Fret(GuitarString.First, 5));
    });
  });

  describe('Map E to', () => {
    test('open string on sixth string for open position', () => {
      const line = new PitchLine([Pitch.E], PitchLineDirection.Ascending);
      const guitarLine = new GuitarPitchLine(line, Position.Open);

      const fret = Array.from(guitarLine)[0];
      const expectedFret = new Fret(GuitarString.Sixth, 0);

      expect(fret).toStrictEqual(expectedFret);
    });

    test('2nd fret on fourth string for C Position', () => {
      const line = new PitchLine([Pitch.E]);
      const guitarLine = new GuitarPitchLine(line, Position.C);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.Fourth, 2));
    });

    test('5th fret on fifth string for A Position', () => {
      const line = new PitchLine([Pitch.E]);
      const guitarLine = new GuitarPitchLine(line, Position.A);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 7));
    });

    test('7th fret on fifth string for G Position', () => {
      const line = new PitchLine([Pitch.E]);
      const guitarLine = new GuitarPitchLine(line, Position.G);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 7));
    });

    test('12th fret on sixth string for E Position', () => {
      const line = new PitchLine([Pitch.E]);
      const guitarLine = new GuitarPitchLine(line, Position.E);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.Sixth, 12));
    });

    test('12th fret on first string for D Position', () => {
      const line = new PitchLine([Pitch.E], PitchLineDirection.Descending);
      const guitarLine = new GuitarPitchLine(line, Position.D);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.First, 12));
    });

    test('14th fret on fourth string for C8 Position', () => {
      const line = new PitchLine([Pitch.E], PitchLineDirection.Ascending);
      const guitarLine = new GuitarPitchLine(line, Position.C8);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.Fourth, 14));
    });

    test('19th fret on fifth string for A8 Position', () => {
      const line = new PitchLine([Pitch.E]);
      const guitarLine = new GuitarPitchLine(line, Position.A8);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 19));
    });

    test('19th fret on fifth string for G8 Position', () => {
      const line = new PitchLine([Pitch.E]);
      const guitarLine = new GuitarPitchLine(line, Position.G8);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 19));
    });

    test('21st fret on third string for E8 Position', () => {
      const line = new PitchLine([Pitch.E]);
      const guitarLine = new GuitarPitchLine(line, Position.E8);

      const fret = Array.from(guitarLine)[0];
      expect(fret).toStrictEqual(new Fret(GuitarString.Third, 21));
    });
  });
});
