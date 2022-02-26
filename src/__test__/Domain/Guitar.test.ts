import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import {
  Fret,
  GuitarMelodicLine,
  Position,
  GuitarString,
  Tab,
  TabColumn,
  GuitarChord,
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
  test('render tunning + start + end', () => {
    const tab = new Tab();
    const renderedTab = tab.render([]);

    const expectedTab = `e|--|
B|--|
G|--|
D|--|
A|--|
E|--|`;

    expect(renderedTab).toBe(expectedTab);
  });

  test('render tunning + start + rest + end', () => {
    const renderedTab = new Tab().render([TabColumn.Rest]);

    const expectedTab = `e|---|
B|---|
G|---|
D|---|
A|---|
E|---|`;

    expect(renderedTab).toBe(expectedTab);
  });

  test('render F on sixth string', () => {
    const fret = new Fret(GuitarString.Sixth, 1, Pitch.F).toTab();
    const renderedTab = new Tab().render([fret]);

    const expectedTab = `e|---|
B|---|
G|---|
D|---|
A|---|
E|-1-|`;

    expect(renderedTab).toBe(expectedTab);
  });

  test('render Bb on fifth string', () => {
    const fret = new Fret(GuitarString.Fifth, 1, Pitch.BFlat).toTab();
    const renderedTab = new Tab().render([fret]);

    const expectedTab = `e|---|
B|---|
G|---|
D|---|
A|-1-|
E|---|`;

    expect(renderedTab).toBe(expectedTab);
  });

  test('render D# on forth string', () => {
    const fret = new Fret(GuitarString.Fourth, 1, Pitch.DSharp).toTab();
    const renderedTab = new Tab().render([fret]);

    const expectedTab = `e|---|
B|---|
G|---|
D|-1-|
A|---|
E|---|`;

    expect(renderedTab).toBe(expectedTab);
  });

  test('render D on sixth string', () => {
    const fret = new Fret(GuitarString.Sixth, 10, Pitch.D).toTab();
    const renderedTab = new Tab().render([fret]);

    const expectedTab = `e|----|
B|----|
G|----|
D|----|
A|----|
E|-10-|`;

    expect(renderedTab).toBe(expectedTab);
  });

  test('render C E A Descending on C position', () => {
    const line = new MelodicLine([Pitch.C, Pitch.E, Pitch.A], MelodicLineDirection.Descending);
    const guitarLine = new GuitarMelodicLine(line, Position.C);
    const renderedTab = new Tab().render(guitarLine.toTab());

    const expectedTab = `e|-----|
B|-----|
G|---2-|
D|--2--|
A|-3---|
E|-----|`;

    expect(renderedTab).toBe(expectedTab);
  });

  // test('render C E A  ascending on C position', () => {
  //   const line = new MelodicLine([Pitch.C, Pitch.E, Pitch.A], MelodicLineDirection.Ascending);
  //   const guitarLine = new GuitarMelodicLine(line, Position.C);
  //   const renderedTab = new Tab().render(guitarLine.toTab());

  //   const expectedTab = `e|-----|
  // B|-1---|
  // G|---2-|
  // D|--2--|
  // A|-----|
  // E|-----|`;

  //   expect(renderedTab).toBe(expectedTab);
  // });

  test('render C Major triad on C position', () => {
    const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
    const guitarChord = new GuitarChord(chord, Position.C);
    const renderedTab = new Tab().render(guitarChord.toTab());

    const expectedTab = `e|---|
B|---|
G|---|
D|-2-|
A|-3-|
E|-3-|`;

    expect(renderedTab).toBe(expectedTab);
  });

  //   test('render G Major triad on C position', () => {
  //     const chord = new ClosedChord(Pitch.G, ChordPattern.Major);
  //     const guitarChord = new GuitarChord(chord, Position.C);
  //     const renderedTab = new Tab().render(guitarChord.toTab());

  //     const expectedTab = `e|---|
  // B|-3-|
  // G|---|
  // D|---|
  // A|-2-|
  // E|-3-|`;

  //     expect(renderedTab).toBe(expectedTab);
  //   });
});
