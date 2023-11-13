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

### Code climate

[![Maintainability](https://api.codeclimate.com/v1/badges/0e30b8c79d21be9b0665/maintainability)](https://codeclimate.com/github/pedromsantos/glenn/maintainability)

### Coveralls

[![Coverage Status](https://coveralls.io/repos/github/pedromsantos/glenn/badge.svg?branch=master)](https://coveralls.io/github/pedromsantos/glenn?branch=master)

### Mutation testing

[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fpedromsantos%2Fglenn%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/pedromsantos/glenn/master)

---

## Documentation

### Working with pitches

```TypeScript
const c = Pitch.C;

console.log("Pitch detail of 'C':\n", c);
console.log("\n");
console.log("Pitch detail of 'c.sharp()':\n", c.sharp().To);
console.log("\n");
console.log("Pitch detail of 'c.flat()':\n", c.flat().To);
console.log("\n");
console.log("Absulute distance from 'C' to 'D':", c.absoluteDistance(Pitch.D));
console.log("\n");
console.log("Interval from 'C' to 'F':\n", c.intervalTo(Pitch.F).To);
console.log("\n");
console.log("Transpose 'C' by a 'minor third':\n", c.transpose(Interval.MinorThird).To);q
```

### Working with intervals

```TypeScript
const interval = Interval.MinorThird;
const otherInterval = Interval.MinorSeventh;

console.log("Interval name:", interval.Name);
console.log("\n");
console.log("Invert 'minor third' interval:\n", interval.invert());
console.log("\n");
console.log("'minor seventh' interval is larger than 'minor third' interval:\n", otherInterval.isLargarThan(interval));
```

### Working with keys

```TypeScript
const key = Key.CMajor;

console.log("Key notes:", Array.from(key).map((n) => n.Name));
console.log("\n");
console.log("Major keys:", Key.majorKeys.map((k) => k.Abbreviation));
console.log("\n");
console.log("Minor keys: ", Key.minorKeys.map((k) => k.Abbreviation));
```

### Working with scales

```TypeScript
const scale = ScalePattern.Ionian.createScale(Pitch.C);
const pitches = ScalePattern.Ionian.createScalePitches(Pitch.C);
const line = ScalePattern.Ionian.createMelodicLineScale(Pitch.C);
const descendingLline = ScalePattern.Ionian.createDescendingMelodicLineScale(Pitch.C);

console.log("Scale pitches:", Array.from(scale).map((n) => n.Name));
console.log("\n");
console.log("Scale pitches:", pitches.map((n) => n.Name));
console.log("\n");
console.log("Scale melodic line:", Array.from(line).map((n) => n.Name));
console.log("\n");
console.log("Scale descending melodic line:", Array.from(descendingLline).map((n) => n.Name));
console.log("\n");

const triadHarmonizer = new TriadHarmonizer(scale);
const triad = triadHarmonizer.chordFor(ScaleDegree.I)
const seventhHarmonizer = new SeventhHarmonizer(scale);
const seventhChord = seventhHarmonizer.chordFor(ScaleDegree.II)

console.log("Chord for scale degree I: ", triad.Name);
console.log("Chord for scale degree II: ", seventhChord.Name);
```

### Working with chords

```TypeScript
const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

const chord = new ClosedChord(Pitch.C, ChordPattern.Major);

let chord = new ClosedChord(Pitch.C, ChordPattern.Major);

console.log("Chord name: ", chord.Name);
console.log("Pich for chord root: ", chord.pitchForFunction(ChordFunction.Root).Name);
console.log("Chord pitches", Array.from(chord).map((p: Pitch) => p.Name));
console.log("Chord bass pitch", chord.Bass.Name);
console.log("Chord lead pitch", chord.Lead.Name);
console.log("Chord no fifth", Array.from(chord.remove(ChordFunction.Fifth)).map((p: Pitch) => p.Name));
console.log("Chord inverted", Array.from(chord.invert()).map((p: Pitch) => p.Name));

chord = new ClosedChord(Pitch.C, ChordPattern.Major7);

console.log("Chord ", Array.from(chord).map((p: Pitch) => p.Name));
console.log("Chord drop 2", Array.from(chord.drop2()).map((p: Pitch) => p.Name));
console.log("Chord drop 3", Array.from(chord.drop3()).map((p: Pitch) => p.Name));
```

### Working with guitar tab

```TypeScript
const tab = new Tab();
console.log("Empty tab:\n", tab.render(new TabMatrix()));

const melodicLine = ScalePattern.Ionian.createMelodicLineScale(Pitch.C);
const guitarLine = new GuitarMelodicLine(melodicLine, Position.C);
const guitarLine1 = new GuitarMelodicLine(line, Position.Open);

console.log("Guitar melodic line (C position):\n", tab.render(guitarLine.toTab()));
console.log("Guitar melodic line (Open position ):\n", tab.render(guitarLine1.toTab()));

const cChord = new ClosedChord(Pitch.C, ChordPattern.Major);
const guitarChord = GuitarChord.inPosition(cChord, Position.Open);
const chordTab = tab.render(new TabMatrix(guitarChord.toTab()));

console.log("Chord as tab:\n", chordTab);

const cMaj7 = new ClosedChord(Pitch.C, ChordPattern.Major7);
const dMin7 = new ClosedChord(Pitch.D, ChordPattern.Minor7);
const eMin7 = new ClosedChord(Pitch.E, ChordPattern.Minor7);
const fMaj7 = new ClosedChord(Pitch.F, ChordPattern.Major7);
const g7 = new ClosedChord(Pitch.G, ChordPattern.Dominant7);
const aMin7 = new ClosedChord(Pitch.A, ChordPattern.Minor7);

const chords = [cMaj7, dMin7, eMin7, fMaj7, g7].map((c) => c.drop2());

const guitarChords = chords.map((c) => GuitarChord.fromBassString(c, GuitarString.Fifth));
const matrix = new TabMatrix(...guitarChords.map((c) => c.toTab()));
const chordsTab = tab.render(matrix);

console.log("Chords as tab:\n", chordsTab);
```
