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

describe('Guitar matrix should', () => {
  describe('render', () => {
    test('note F on sixth string', () => {
      const tabColumn = new Fret(GuitarString.Sixth, 1).toTab();
      const matrix = new TabMatrix(tabColumn);

      expect(matrix.render()).toStrictEqual([['-', '-', '-', '-', '-', '1']]);
    });
  });
});

describe('Guitar tab should', () => {
  describe('render', () => {
    test('empty tab', () => {
      const tab = new Tab();
      const expectedTab = `e|--|
B|--|
G|--|
D|--|
A|--|
E|--|`;

      expect(tab.render(new TabMatrix())).toBe(expectedTab);
    });

    test('tunning + start + rest + end', () => {
      const renderedTab = new Tab().renderColumn(TabColumn.Rest);

      const expectedTab = `e|---|
B|---|
G|---|
D|---|
A|---|
E|---|`;

      expect(renderedTab).toBe(expectedTab);
    });

    test('F on sixth string', () => {
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

    test('Bb on fifth string', () => {
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

    test('D# on forth string', () => {
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

    test('D on sixth string', () => {
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

    describe('melodic line', () => {
      test('C E G ascending on C position', () => {
        const line = new MelodicLine([Pitch.C, Pitch.E, Pitch.G], MelodicLineDirection.Ascending);
        const guitarLine = new GuitarMelodicLine(line, Position.C);

        expect(guitarLine.get(0)).toStrictEqual(new Fret(GuitarString.Fifth, 3));
        expect(guitarLine.get(1)).toStrictEqual(new Fret(GuitarString.Fourth, 2));
        expect(guitarLine.get(2)).toStrictEqual(new Fret(GuitarString.Fourth, 5));

        const renderedTab = new Tab().render(guitarLine.toTab());

        const expectedTab = `e|-------|
B|-------|
G|-------|
D|---2-5-|
A|-3-----|
E|-------|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('C E G descending on C position', () => {
        const line = new MelodicLine([Pitch.C, Pitch.E, Pitch.G], MelodicLineDirection.Descending);
        expect(line).toBeTruthy();

        const guitarLine = new GuitarMelodicLine(line, Position.C);
        expect(guitarLine).toBeTruthy();

        // expect(guitarLine.get(0)).toStrictEqual(new Fret(GuitarString.Fifth, 3));
        // expect(guitarLine.get(1)).toStrictEqual(new Fret(GuitarString.Fourth, 2));
        // expect(guitarLine.get(2)).toStrictEqual(new Fret(GuitarString.Fourth, 5));
        //const renderedTab = new Tab().render(guitarLine.toTab());
        //     const expectedTab = `e|-------|
        // B|-------|
        // G|-------|
        // D|---2-5-|
        // A|-3-----|
        // E|-------|`;
        //     expect(renderedTab).toBe(expectedTab);
      });
    });

    describe('chord', () => {
      test('C Major triad on open position', () => {
        const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
        const guitarChord = new GuitarChord(chord, Position.Open);
        const renderedTab = new Tab().render(new TabMatrix(guitarChord.toTab()));

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
        const renderedTab = new Tab().render(new TabMatrix(guitarChord.toTab()));

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
        const renderedTab = new Tab().render(new TabMatrix(guitarChord.toTab()));

        const expectedTab = `e|---|
B|---|
G|---|
D|-0-|
A|-2-|
E|-3-|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('C Major triad on E position cannot be mapped', () => {
        const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

        expect(() => new GuitarChord(chord, Position.E)).toThrow('Cannot map chord');
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
});
