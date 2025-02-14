import { Chord, ChordPattern, ClosedChord } from '../../Domain/Chord';
import { Duration } from '../../Domain/Duration';
import {
  BlankFret,
  Fret,
  FretboardPosition,
  GuitarChord,
  GuitarHarmonicLine,
  GuitarString,
  GuitarStrings,
  Position,
  Tab,
  TabColumn,
} from '../../Domain/Guitar';
import { MelodicLine, Note, Octave } from '../../Domain/Note';
import { Pitch } from '../../Domain/Pitch';
import { ScalePattern } from '../../Domain/Scale';

describe('Blank fret should', () => {
  test('render empty column', () => {
    expect(new BlankFret().toTab().render()).toStrictEqual(['-', '-', '-', '-', '-', '-']);
  });

  test('render empty column after raising octave', () => {
    expect(new BlankFret().raiseOctave().toTab(new GuitarStrings()).render()).toStrictEqual([
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
    ]);
  });
});

describe('Guitar matrix should', () => {
  describe('render', () => {
    test('note F on sixth string 1st fret', () => {
      const tabColumn = new Fret(GuitarString.Sixth, 1).toTab();

      expect(new Tab(tabColumn).render()).toStrictEqual([['-', '-', '-', '-', '-', '1']]);
    });
  });
});

describe('Position should', () => {
  const guitarStrings = new GuitarStrings();
  let positionFrets = new FretboardPosition(Position.C, guitarStrings);

  beforeEach(() => {
    positionFrets = new FretboardPosition(Position.C, guitarStrings);
  });

  test('map C E G ascending on C position', () => {
    const line = new MelodicLine([
      new Note(Pitch.C, Duration.Eighth, Octave.C3),
      new Note(Pitch.E, Duration.Eighth, Octave.C3),
      new Note(Pitch.G, Duration.Eighth, Octave.C3),
    ]);
    const fretLine = positionFrets.mapMelodicLine(line);
    const renderedTab = Tab.render(fretLine?.toTab(guitarStrings));

    const expectedTab = `e|-------|
B|-------|
G|-------|
D|---2-5-|
A|-3-----|
E|-------|`;
    expect(renderedTab).toBe(expectedTab);
  });

  test('map G E C descending on C position', () => {
    const line = new MelodicLine([
      new Note(Pitch.G, Duration.Eighth, Octave.C4),
      new Note(Pitch.E, Duration.Eighth, Octave.C4),
      new Note(Pitch.C, Duration.Eighth, Octave.C4),
    ]);
    const fretLine = new FretboardPosition(Position.C, guitarStrings).mapMelodicLine(line);
    const renderedTab = Tab.render(fretLine?.toTab(guitarStrings));

    const expectedTab = `e|-3-----|
B|---5-1-|
G|-------|
D|-------|
A|-------|
E|-------|`;
    expect(renderedTab).toBe(expectedTab);
  });

  test('map C G E descending on C position', () => {
    const line = new MelodicLine([
      new Note(Pitch.C, Duration.Eighth, Octave.C4),
      new Note(Pitch.G, Duration.Eighth, Octave.C3),
      new Note(Pitch.E, Duration.Eighth, Octave.C3),
    ]);
    const fretLine = new FretboardPosition(Position.C, guitarStrings).mapMelodicLine(line);
    const renderedTab = Tab.render(fretLine?.toTab(guitarStrings));

    const expectedTab = `e|-------|
B|-------|
G|-5-----|
D|---5-2-|
A|-------|
E|-------|`;
    expect(renderedTab).toBe(expectedTab);
  });
});

describe('Guitar tab should', () => {
  describe('render', () => {
    test('empty tab', () => {
      const expectedTab = `e|--|
B|--|
G|--|
D|--|
A|--|
E|--|`;

      expect(Tab.render()).toBe(expectedTab);
    });

    test('render tuning + start + rest + end', () => {
      const renderedTab = Tab.renderColumn(TabColumn.Rest);

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
      const renderedTab = Tab.renderColumn(fret);

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
      const renderedTab = Tab.renderColumn(fret);

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
      const renderedTab = Tab.renderColumn(fret);

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
      const renderedTab = Tab.renderColumn(fret);

      const expectedTab = `e|----|
B|----|
G|----|
D|----|
A|----|
E|-10-|`;

      expect(renderedTab).toBe(expectedTab);
    });

    describe('pitch line', () => {
      describe('scales in C Position', () => {
        test('C major scale ascending', () => {
          const expectedTab = `e|---------------|
B|---------------|
G|-----------2-4-|
D|-----2-3-5-----|
A|-3-5-----------|
E|---------------|`;

          const renderedTab = render(Pitch.C, ScalePattern.Ionian, Position.C);

          expect(renderedTab).toBe(expectedTab);
        });

        test('C mixolydian scale ascending', () => {
          const expectedTab = `e|---------------|
B|---------------|
G|-----------2-3-|
D|-----2-3-5-----|
A|-3-5-----------|
E|---------------|`;

          const renderedTab = render(Pitch.C, ScalePattern.Mixolydian, Position.C);

          expect(renderedTab).toBe(expectedTab);
        });

        test('C mixolydian scale ascending 2 octaves', () => {
          const expectedTab = `e|---------------------1-3-5-|
B|-----------------3-5-------|
G|-----------2-3-5-----------|
D|-----2-3-5-----------------|
A|-3-5-----------------------|
E|---------------------------|`;

          const renderedTab = renderDoubleOctave(Pitch.C, ScalePattern.Mixolydian, Position.C);

          expect(renderedTab).toBe(expectedTab);
        });

        test('D mixolydian scale ascending 2 octaves', () => {
          const expectedTab = `e|-------------------2-3-5-|
B|---------------3-5-------|
G|---------2-4-5-----------|
D|---2-4-5-----------------|
A|-5-----------------------|
E|-------------------------|`;

          const renderedTab = renderDoubleOctave(Pitch.D, ScalePattern.Mixolydian, Position.C);

          expect(renderedTab).toBe(expectedTab);
        });

        function render(pitch: Pitch, pattern: ScalePattern, position: Position) {
          const line = pattern.createScale(pitch).melodicLine(Duration.Eighth, Octave.C3);
          const guitarStrings = new GuitarStrings();
          const positionFrets = new FretboardPosition(position, guitarStrings);
          const fretLine = positionFrets.mapMelodicLine(line);
          return Tab.render(fretLine?.toTab(guitarStrings));
        }

        function renderDoubleOctave(pitch: Pitch, pattern: ScalePattern, position: Position) {
          const line = pattern
            .createScale(pitch)
            .melodicLine(Duration.Eighth, Octave.C3)
            .appendOctaveAbove();
          const guitarStrings = new GuitarStrings();
          const positionFrets = new FretboardPosition(position, guitarStrings);
          const fretLine = positionFrets.mapMelodicLine(line);
          return Tab.render(fretLine?.toTab(guitarStrings));
        }
      });
    });

    describe('chords', () => {
      test('C Major triad on open position', () => {
        const chord = new ClosedChord(Pitch.C, ChordPattern.Major, Duration.Quarter, Octave.C4);
        const guitarChord = GuitarChord.inPosition(chord, Position.Open);
        const renderedTab = Tab.render(new Tab(guitarChord.toTab()));

        const expectedTab = `e|-0-|
B|-1-|
G|-0-|
D|-2-|
A|-3-|
E|-0-|`;

        expect(renderedTab).toBe(expectedTab);
      });

      describe('G Major triad', () => {
        test('on C position', () => {
          const chord = new ClosedChord(Pitch.G, ChordPattern.Major, Duration.Quarter, Octave.C4);
          const guitarChord = GuitarChord.inPosition(chord, Position.Open);
          const renderedTab = Tab.render(new Tab(guitarChord.toTab()));

          const expectedTab = `e|-3-|
B|-0-|
G|-0-|
D|-0-|
A|-2-|
E|-3-|`;

          expect(renderedTab).toBe(expectedTab);
        });

        test('from sixth string', () => {
          const chord = new ClosedChord(Pitch.G, ChordPattern.Major, Duration.Quarter, Octave.C4);
          const guitarChord = GuitarChord.fromBassString(chord, GuitarString.Sixth);
          const renderedTab = Tab.render(new Tab(guitarChord.toTab()));

          const expectedTab = `e|---|
B|---|
G|---|
D|-0-|
A|-2-|
E|-3-|`;

          expect(renderedTab).toBe(expectedTab);
        });

        test('triad from fifth string', () => {
          const chord = new ClosedChord(Pitch.G, ChordPattern.Major, Duration.Quarter, Octave.C4);
          const guitarChord = GuitarChord.fromBassString(chord, GuitarString.Fifth);
          const renderedTab = Tab.render(new Tab(guitarChord.toTab()));

          const expectedTab = `e|----|
B|----|
G|--7-|
D|--9-|
A|-10-|
E|----|`;

          expect(renderedTab).toBe(expectedTab);
        });

        test('triad from fourth string', () => {
          const chord = new ClosedChord(Pitch.G, ChordPattern.Major, Duration.Quarter, Octave.C4);
          const guitarChord = GuitarChord.fromBassString(chord, GuitarString.Fourth);
          const renderedTab = Tab.render(new Tab(guitarChord.toTab()));

          const expectedTab = `e|---|
B|-3-|
G|-4-|
D|-5-|
A|---|
E|---|`;

          expect(renderedTab).toBe(expectedTab);
        });

        test('triad from third string', () => {
          const chord = new ClosedChord(Pitch.G, ChordPattern.Major, Duration.Quarter, Octave.C4);
          const guitarChord = GuitarChord.fromBassString(chord, GuitarString.Third);
          const renderedTab = Tab.render(new Tab(guitarChord.toTab()));

          const expectedTab = `e|-10-|
B|-12-|
G|-12-|
D|----|
A|----|
E|----|`;

          expect(renderedTab).toBe(expectedTab);
        });
      });
    });

    test('Major triads on open position', () => {
      const chords = [
        GuitarChord.inPosition(
          new ClosedChord(Pitch.G, ChordPattern.Major, Duration.Quarter, Octave.C4),
          Position.Open
        ),
        GuitarChord.inPosition(
          new ClosedChord(Pitch.C, ChordPattern.Major, Duration.Quarter, Octave.C4),
          Position.Open
        ),
      ];

      const matrix = new Tab(...chords.map((c) => c.toTab()));
      expect(matrix.render()).toStrictEqual([
        ['3', '0', '0', '0', '2', '3'],
        ['0', '1', '0', '2', '3', '0'],
      ]);

      const renderedTab = Tab.render(matrix);

      const expectedTab = `e|-3-0-|
B|-0-1-|
G|-0-0-|
D|-0-2-|
A|-2-3-|
E|-3-0-|`;

      expect(renderedTab).toBe(expectedTab);
    });
  });
  describe('Drop chords', () => {
    let cMaj7: Chord;
    let dMin7: Chord;
    let eMin7: Chord;
    let fMaj7: Chord;
    let g7: Chord;
    let aMin7: Chord;

    beforeEach(() => {
      cMaj7 = new ClosedChord(Pitch.C, ChordPattern.Major7, Duration.Quarter, Octave.C4);
      dMin7 = new ClosedChord(Pitch.D, ChordPattern.Minor7, Duration.Quarter, Octave.C4);
      eMin7 = new ClosedChord(Pitch.E, ChordPattern.Minor7, Duration.Quarter, Octave.C4);
      fMaj7 = new ClosedChord(Pitch.F, ChordPattern.Major7, Duration.Quarter, Octave.C4);
      g7 = new ClosedChord(Pitch.G, ChordPattern.Dominant7, Duration.Quarter, Octave.C4);
      aMin7 = new ClosedChord(Pitch.A, ChordPattern.Minor7, Duration.Quarter, Octave.C4);
    });

    describe('Drop 2 chords', () => {
      let chords: Chord[];

      beforeEach(() => {
        chords = [cMaj7, dMin7, eMin7, fMaj7, g7].map((c) => c.drop2());
      });

      test('On sixth string', () => {
        const harmonicLine = new GuitarHarmonicLine(GuitarString.Sixth, chords);

        const renderedTab = Tab.render(harmonicLine.toTab());

        const expectedTab = `e|-------------|
B|-------------|
G|--9-10-0-2-4-|
D|--9-10-0-2-3-|
A|-10-12-2-3-5-|
E|--8-10-0-1-3-|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('On fifth string', () => {
        const harmonicLine = new GuitarHarmonicLine(GuitarString.Fifth, chords);

        const renderedTab = Tab.render(harmonicLine.toTab());

        const expectedTab = `e|-------------|
B|-5-6-8-10-12-|
G|-4-5-7--9-10-|
D|-5-7-9-10-12-|
A|-3-5-7--8-10-|
E|-------------|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('On fourth string', () => {
        const harmonicLine = new GuitarHarmonicLine(GuitarString.Fourth, chords);

        const renderedTab = Tab.render(harmonicLine.toTab());

        const expectedTab = `e|-12-1-3-5-7-|
B|-12-1-3-5-6-|
G|-12-2-4-5-7-|
D|-10-0-2-3-5-|
A|------------|
E|------------|`;

        expect(renderedTab).toBe(expectedTab);
      });
    });

    describe('Drop 3 chords', () => {
      let chords: Chord[];

      beforeEach(() => {
        chords = [cMaj7, dMin7, aMin7, fMaj7, g7].map((c) => c.drop3());
      });

      test('On sixth string', () => {
        const harmonicLine = new GuitarHarmonicLine(GuitarString.Sixth, chords);

        const renderedTab = Tab.render(harmonicLine.toTab());

        const expectedTab = `e|------------|
B|-8-10-5-1-3-|
G|-9-10-5-2-4-|
D|-9-10-5-2-3-|
A|------------|
E|-8-10-5-1-3-|`;

        expect(renderedTab).toBe(expectedTab);
      });

      test('On fifth string', () => {
        const harmonicLine = new GuitarHarmonicLine(GuitarString.Fifth, chords);

        const renderedTab = Tab.render(harmonicLine.toTab());

        const expectedTab = `e|-3-5-0--8-10-|
B|-5-6-1-10-12-|
G|-4-5-0--9-10-|
D|-------------|
A|-3-5-0--8-10-|
E|-------------|`;

        expect(renderedTab).toBe(expectedTab);
      });
    });
  });
});
