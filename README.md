# Glenn

Typescript module for working with music theory.

Still a work in progress.

## Status and ratings

### GitHub

[![Build Status](https://github.com/pedromsantos/glenn/actions/workflows/build.yml/badge.svg)](https://github.com/pedromsantos/glenn/actions/workflows/build.yml) [![CodeQL](https://github.com/pedromsantos/glenn/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/pedromsantos/glenn/actions/workflows/codeql-analysis.yml)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/pedromsantos/glenn) ![GitHub last commit](https://img.shields.io/github/last-commit/pedromsantos/glenn) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/pedromsantos/glenn)
![GitHub top language](https://img.shields.io/github/languages/top/pedromsantos/glenn) ![GitHub](https://img.shields.io/github/license/pedromsantos/glenn)

### Sonar

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=coverage)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn)[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=bugs)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=pedromsantos_glenn&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=pedromsantos_glenn) 

### CodeScene

[![CodeScene Code Health](https://codescene.io/projects/29675/status-badges/code-health)](https://codescene.io/projects/29675) [![CodeScene System Mastery](https://codescene.io/projects/29675/status-badges/system-mastery)](https://codescene.io/projects/29675)

### Coveralls

[![Coverage Status](https://coveralls.io/repos/github/pedromsantos/glenn/badge.svg?branch=refs/heads/master)](https://coveralls.io/github/pedromsantos/glenn?branch=refs/heads/master)

### Mutation testing

[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fpedromsantos%2Fglenn%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/pedromsantos/glenn/master)

---

## Documentation

### Working with pitches

```TypeScript
const c = Pitch.C;

c.sharp();
c.flat();

c.absoluteDistance(Pitch.D);

c.intervalTo(Pitch.F);

c.transpose(Interval.MinorThird);
```

### Working with intervals

```TypeScript
const interval = Interval.MinorThird;

interval.simpleName();
interval.quality();
interval.number();
interval.perfect();
interval.invert();

```

### Working with keys

```TypeScript
const key = Key.CMajor;

key.notes();

Key.majorKeys();
key.minorKeys();

```

### Working with scales

```TypeScript
const scale = ScalePattern.Ionian.createScale(Pitch.C);
const pitches = ScalePattern.Ionian.createScalePitches(Pitch.C);
const line = ScalePattern.Ionian.createMelodicLineScale(Pitch.C);
const descendingLline = ScalePattern.Ionian.createDescendingMelodicLineScale(Pitch.C);

scale.Name;
scale.To();
```

### Working with chords

```TypeScript
const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

chord.Name;
chord.pitchForFunction(ChordFunction.Root);
chord.Pitches;
chord.Bass;
chord.Lead;
chord.remove(ChordFunction.Fifth);
chord.invert();
chord.drop2();
chord.drop3();

```

### Working with guitar tab

```TypeScript
Position.A.To;

GuitarString.Sixth.fretFor(Pitch.GFlat);

const line = ScalePattern.Ionian.createMelodicLineScale(Pitch.C);
const guitarLine = new GuitarMelodicLine(line, Position.C);

const line1 = new MelodicLine([Pitch.E], MelodicLineDirection.Descending);
const guitarLine1 = new GuitarMelodicLine(line, Position.Open);
const fret = guitarLine1.get(0);

const fret = TabColumn.fromFret(new Fret(GuitarString.Sixth, 1));
const matrix = new TabMatrix(fret);
matrix.render();

const tab = new Tab();
tab.render(new TabMatrix());

const chord = new ClosedChord(Pitch.C, ChordPattern.Major);
const guitarChord = new GuitarChord(chord, Position.Open);
const renderedTab = new Tab().renderColumn(TabColumn.fromChord(guitarChord));

const chords = [
      new GuitarChord(new ClosedChord(Pitch.G, ChordPattern.Major), Position.Open),
      new GuitarChord(new ClosedChord(Pitch.C, ChordPattern.Major), Position.Open),
      new GuitarChord(new ClosedChord(Pitch.C, ChordPattern.Major), Position.C),
    ];

const matrix1 = new TabMatrix(...chords.map((c) => TabColumn.fromChord(c)));
matrix1.render();
```
