import { Fret, GuitarMelodicLine, Position, GuitarString } from '../../Domain/Guitar';
import Pitch, { MelodicLine } from '../../Domain/Pitch';

describe('Sixth string should', () => {
  test('map E to open string', () => {
    expect(GuitarString.Sixth.map(Pitch.E)).toStrictEqual(new Fret(GuitarString.Sixth, 0));
  });

  test('map F to first fret', () => {
    expect(GuitarString.Sixth.map(Pitch.F)).toStrictEqual(new Fret(GuitarString.Sixth, 1));
  });

  test('map F# to second fret', () => {
    expect(GuitarString.Sixth.map(Pitch.FSharp)).toStrictEqual(new Fret(GuitarString.Sixth, 2));
  });

  test('map Gb to second fret', () => {
    expect(GuitarString.Sixth.map(Pitch.GFlat)).toStrictEqual(new Fret(GuitarString.Sixth, 2));
  });

  test('map G to third fret', () => {
    expect(GuitarString.Sixth.map(Pitch.G)).toStrictEqual(new Fret(GuitarString.Sixth, 3));
  });
});

describe('Melodic line should', () => {
  test('map E to open string on sixth string', () => {
    const line = new MelodicLine([Pitch.E]);
    const guitarLine = new GuitarMelodicLine(line, Position.Open);

    const fret = guitarLine.fret(0);
    expect(fret).toStrictEqual(new Fret(GuitarString.Sixth, 0));
  });

  test('map E to 2th fret on fourth string for C Position', () => {
    const line = new MelodicLine([Pitch.E]);
    const guitarLine = new GuitarMelodicLine(line, Position.C);

    const fret = guitarLine.fret(0);
    expect(fret).toStrictEqual(new Fret(GuitarString.Fourth, 2));
  });

  test('map E to 5th fret on second string for A Position', () => {
    const line = new MelodicLine([Pitch.E]);
    const guitarLine = new GuitarMelodicLine(line, Position.A);

    const fret = guitarLine.fret(0);
    expect(fret).toStrictEqual(new Fret(GuitarString.Second, 5));
  });

  test('map E to 7th fret on fifth string for G Position', () => {
    const line = new MelodicLine([Pitch.E]);
    const guitarLine = new GuitarMelodicLine(line, Position.G);

    const fret = guitarLine.fret(0);
    expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 7));
  });

  test('map E to 9th fret on third string for E Position', () => {
    const line = new MelodicLine([Pitch.E]);
    const guitarLine = new GuitarMelodicLine(line, Position.E);

    const fret = guitarLine.fret(0);
    expect(fret).toStrictEqual(new Fret(GuitarString.Third, 9));
  });

  test('map E to 12th fret on first string for D Position', () => {
    const line = new MelodicLine([Pitch.E]);
    const guitarLine = new GuitarMelodicLine(line, Position.D);

    const fret = guitarLine.fret(1);
    expect(fret).toStrictEqual(new Fret(GuitarString.First, 12));
  });
});
