import { ChordPattern, ClosedChord } from '../../Domain/Chord';
import {
  BlankFret,
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

describe('Blank fret should', () => {
  test('render empty column', () => {
    const blankFret = new BlankFret();
    const tab = blankFret.toTab();

    expect(tab.render()).toStrictEqual(['-', '-', '-', '-', '-', '-']);
  });

  test('render empty column after raising octave', () => {
    const blankFret = new BlankFret();
    const tab = blankFret.raiseOctave().toTab();

    expect(tab.render()).toStrictEqual(['-', '-', '-', '-', '-', '-']);
  });
});

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

        expect(Array.from(guitarLine)[0]).toStrictEqual(new Fret(GuitarString.Fifth, 3));
        expect(Array.from(guitarLine)[1]).toStrictEqual(new Fret(GuitarString.Fourth, 2));
        expect(Array.from(guitarLine)[2]).toStrictEqual(new Fret(GuitarString.Fourth, 5));

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
        const guitarChord = GuitarChord.inPosition(chord, Position.Open);
        const renderedTab = new Tab().render(new TabMatrix(guitarChord.toTab()));

        const expectedTab = `e|-0-|
B|-1-|
G|-0-|
D|-2-|
A|-3-|
E|-0-|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('G Major triad on C position', () => {
        const chord = new ClosedChord(Pitch.G, ChordPattern.Major);
        const guitarChord = GuitarChord.inPosition(chord, Position.Open);
        const renderedTab = new Tab().render(new TabMatrix(guitarChord.toTab()));

        const expectedTab = `e|-3-|
B|-0-|
G|-0-|
D|-0-|
A|-2-|
E|-3-|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('G Major triad from sixth string', () => {
        const chord = new ClosedChord(Pitch.G, ChordPattern.Major);
        const guitarChord = GuitarChord.fromBassString(chord, GuitarString.Sixth);
        const renderedTab = new Tab().render(new TabMatrix(guitarChord.toTab()));

        const expectedTab = `e|---|
B|---|
G|---|
D|-0-|
A|-2-|
E|-3-|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('G Major triad from fifth string', () => {
        const chord = new ClosedChord(Pitch.G, ChordPattern.Major);
        const guitarChord = GuitarChord.fromBassString(chord, GuitarString.Fifth);
        const renderedTab = new Tab().render(new TabMatrix(guitarChord.toTab()));

        const expectedTab = `e|----|
B|----|
G|--7-|
D|--9-|
A|-10-|
E|----|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('G Major triad from fourth string', () => {
        const chord = new ClosedChord(Pitch.G, ChordPattern.Major);
        const guitarChord = GuitarChord.fromBassString(chord, GuitarString.Fourth);
        const renderedTab = new Tab().render(new TabMatrix(guitarChord.toTab()));

        const expectedTab = `e|---|
B|-3-|
G|-4-|
D|-5-|
A|---|
E|---|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('G Major triad from thord string', () => {
        const chord = new ClosedChord(Pitch.G, ChordPattern.Major);
        const guitarChord = GuitarChord.fromBassString(chord, GuitarString.Third);
        const renderedTab = new Tab().render(new TabMatrix(guitarChord.toTab()));

        const expectedTab = `e|-10-|
B|-12-|
G|-12-|
D|----|
A|----|
E|----|`;

        expect(renderedTab).toBe(expectedTab);
      });
    });

    test('Major triads on open position', () => {
      const chords = [
        GuitarChord.inPosition(new ClosedChord(Pitch.G, ChordPattern.Major), Position.Open),
        GuitarChord.inPosition(new ClosedChord(Pitch.C, ChordPattern.Major), Position.Open),
      ];

      const matrix = new TabMatrix(...chords.map((c) => c.toTab()));
      expect(matrix.render()).toStrictEqual([
        ['3', '0', '0', '0', '2', '3'],
        ['0', '1', '0', '2', '3', '0'],
      ]);

      const renderedTab = new Tab().render(matrix);

      const expectedTab = `e|-3-0-|
B|-0-1-|
G|-0-0-|
D|-0-2-|
A|-2-3-|
E|-3-0-|`;

      expect(renderedTab).toBe(expectedTab);
    });
  });
});
