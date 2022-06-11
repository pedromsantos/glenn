import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import {
  Fret,
  GuitarChord,
  GuitarMelodicLine,
  GuitarString,
  Position,
  Tab,
  TabColumn,
  TabMatrix,
} from '../../Domain/Guitar';
import Pitch, { MelodicLine, MelodicLineDirection } from '../../Domain/Pitch';
import { ScalePattern } from '../../Domain/Scale';

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
});

describe('Guitar melodic line should', () => {
  describe('map C major scale to guitar frets on', () => {
    test('C position ascending', () => {
      const line = ScalePattern.Ionian.createMelodicLineScale(Pitch.C);
      const guitarLine = new GuitarMelodicLine(line, Position.C);

      const fret = guitarLine.get(0);
      expect(fret?.isSame(new Fret(GuitarString.Fifth, 3))).toBeTruthy();
    });

    test('C position descending', () => {
      const line = ScalePattern.Ionian.createDescendingMelodicLineScale(Pitch.C);
      const guitarLine = new GuitarMelodicLine(line, Position.C);

      const fret = guitarLine.get(0);

      expect(fret).toStrictEqual(new Fret(GuitarString.Second, 1));
    });
  });

  describe('map E to', () => {
    test('open string on sixth string for open position', () => {
      const line = new MelodicLine([Pitch.E], MelodicLineDirection.Descending);
      const guitarLine = new GuitarMelodicLine(line, Position.Open);

      const fret = guitarLine.get(0);
      const expectedFret = new Fret(GuitarString.Sixth, 0);

      expect(fret).toStrictEqual(expectedFret);
    });

    test('2th fret on fourth string for C Position', () => {
      const line = new MelodicLine([Pitch.E]);
      const guitarLine = new GuitarMelodicLine(line, Position.C);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.Fourth, 2));
    });

    test('5th fret on second string for A Position', () => {
      const line = new MelodicLine([Pitch.E]);
      const guitarLine = new GuitarMelodicLine(line, Position.A);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.Second, 5));
    });

    test('7th fret on fifth string for G Position', () => {
      const line = new MelodicLine([Pitch.E]);
      const guitarLine = new GuitarMelodicLine(line, Position.G);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.Fifth, 7));
    });

    test('9th fret on third string for E Position', () => {
      const line = new MelodicLine([Pitch.E]);
      const guitarLine = new GuitarMelodicLine(line, Position.E);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.Third, 9));
    });

    test('12th fret on first string for D Position', () => {
      const line = new MelodicLine([Pitch.E], MelodicLineDirection.Descending);
      const guitarLine = new GuitarMelodicLine(line, Position.D);

      const fret = guitarLine.get(0);
      expect(fret).toStrictEqual(new Fret(GuitarString.First, 12));
    });
  });
});

describe('Guitar matrix should', () => {
  describe('render', () => {
    test('render note F on sixth string', () => {
      const fret = new Fret(GuitarString.Sixth, 1).toTab();
      const matrix = new TabMatrix(fret);

      expect(matrix.render()).toStrictEqual([['-', '-', '-', '-', '-', '1']]);
    });
  });
});

describe('Guitar tab should', () => {
  describe('render', () => {
    test('render empty tab', () => {
      const tab = new Tab();
      const expectedTab = `e|--|
B|--|
G|--|
D|--|
A|--|
E|--|`;

      expect(tab.render(new TabMatrix())).toBe(expectedTab);
    });

    test('render tunning + start + rest + end', () => {
      const renderedTab = new Tab().renderColumn(TabColumn.Rest);

      const expectedTab = `e|---|
B|---|
G|---|
D|---|
A|---|
E|---|`;

      expect(renderedTab).toBe(expectedTab);
    });

    test('render F on sixth string', () => {
      const fret = new Fret(GuitarString.Sixth, 1).toTab();
      const renderedTab = new Tab().renderColumn(fret);

      const expectedTab = `e|---|
B|---|
G|---|
D|---|
A|---|
E|-1-|`;

      expect(renderedTab).toBe(expectedTab);
    });

    test('render Bb on fifth string', () => {
      const fret = new Fret(GuitarString.Fifth, 1).toTab();
      const renderedTab = new Tab().renderColumn(fret);

      const expectedTab = `e|---|
B|---|
G|---|
D|---|
A|-1-|
E|---|`;

      expect(renderedTab).toBe(expectedTab);
    });

    test('render D# on forth string', () => {
      const fret = new Fret(GuitarString.Fourth, 1).toTab();
      const renderedTab = new Tab().renderColumn(fret);

      const expectedTab = `e|---|
B|---|
G|---|
D|-1-|
A|---|
E|---|`;

      expect(renderedTab).toBe(expectedTab);
    });

    test('render D on sixth string', () => {
      const fret = new Fret(GuitarString.Sixth, 10).toTab();
      const renderedTab = new Tab().renderColumn(fret);

      const expectedTab = `e|----|
B|----|
G|----|
D|----|
A|----|
E|-10-|`;

      expect(renderedTab).toBe(expectedTab);
    });
  });

  describe('render melodic line', () => {
    test('C E A Descending on C position', () => {
      const line = new MelodicLine([Pitch.C, Pitch.E, Pitch.A], MelodicLineDirection.Descending);
      const guitarLine = new GuitarMelodicLine(line, Position.C);
      const renderedTab = new Tab().render(guitarLine.toTab());

      const expectedTab = `e|-------|
B|-------|
G|-----2-|
D|---2---|
A|-3-----|
E|-------|`;

      expect(renderedTab).toBe(expectedTab);
    });
  });

  describe('render chord', () => {
    test('C Major triad on open position', () => {
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
      const guitarChord = new GuitarChord(chord, Position.Open);
      const renderedTab = new Tab().renderColumn(guitarChord.toTab());

      const expectedTab = `e|---|
B|---|
G|-0-|
D|-2-|
A|-3-|
E|---|`;

      expect(renderedTab).toBe(expectedTab);
    });

    test('C Major triad on C position', () => {
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
      const guitarChord = new GuitarChord(chord, Position.C);
      const renderedTab = new Tab().renderColumn(guitarChord.toTab());

      const expectedTab = `e|---|
B|---|
G|---|
D|-2-|
A|-3-|
E|---|`;

      expect(renderedTab).toBe(expectedTab);
    });

    test('G Major triad on C position', () => {
      const chord = new ClosedChord(Pitch.G, ChordPattern.Major);
      const guitarChord = new GuitarChord(chord, Position.Open);
      const renderedTab = new Tab().renderColumn(guitarChord.toTab());

      const expectedTab = `e|---|
B|---|
G|---|
D|-0-|
A|-2-|
E|-3-|`;

      expect(renderedTab).toBe(expectedTab);
    });

    test('C Major triad on E position', () => {
      const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
      const guitarChord = new GuitarChord(chord, Position.E);
      const renderedTab = new Tab().renderColumn(guitarChord.toTab());

      const expectedTab = `e|---|
B|-8-|
G|-9-|
D|---|
A|---|
E|-8-|`;

      expect(renderedTab).toBe(expectedTab);
    });
  });

  test('Major triads on open and C positions', () => {
    const chords = [
      new GuitarChord(new ClosedChord(Pitch.G, ChordPattern.Major), Position.Open),
      new GuitarChord(new ClosedChord(Pitch.C, ChordPattern.Major), Position.Open),
      new GuitarChord(new ClosedChord(Pitch.C, ChordPattern.Major), Position.C),
    ];

    const matrix = new TabMatrix(...chords.map((c) => c.toTab()));
    expect(matrix.render()).toStrictEqual([
      ['-', '-', '-', '0', '2', '3'],
      ['-', '-', '0', '2', '3', '-'],
      ['-', '-', '-', '2', '3', '-'],
    ]);

    const renderedTab = new Tab().render(matrix);

    const expectedTab = `e|-------|
B|-------|
G|---0---|
D|-0-2-2-|
A|-2-3-3-|
E|-3-----|`;

    expect(renderedTab).toBe(expectedTab);
  });
});
