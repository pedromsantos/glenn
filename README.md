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
[![Test Coverage](https://api.codeclimate.com/v1/badges/0e30b8c79d21be9b0665/test_coverage)](https://codeclimate.com/github/pedromsantos/glenn/test_coverage)

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
console.log("Pitch summary of 'c.sharp()':\n", c.sharp().To);
console.log("\n");
console.log("Pitch summary of 'c.flat()':\n", c.flat().To);
console.log("\n");
console.log("Absulute distance from 'C' to 'D':", c.absoluteDistance(Pitch.D));
console.log("\n");
console.log("Interval from 'C' to 'F':\n", c.intervalTo(Pitch.F).To);
console.log("\n");
console.log("Transpose 'C' by a 'minor third':\n", c.transpose(Interval.MinorThird).To);
```

#### Pitch Output

```text
Pitch detail of 'C':
 _Pitch {
  name: 'C',
  value: 0,
  accidental: 1,
  sharp: [Function (anonymous)],
  flat: [Function (anonymous)],
  natural: [Function (anonymous)],
  intervals: [Function (anonymous)],
  PITCHES: 12
}

Pitch detail of 'c.sharp()':
 { name: 'C#', value: 1 }

Pitch detail of 'c.flat()':
 { name: 'B', value: 11 }

Absulute distance from 'C' to 'D': 2

Interval from 'C' to 'F':
 {
  name: 'Perfect Fourth',
  abreviature: 'P4',
  distance: 5,
  quality: 'Perfect'
}

Transpose 'C' by a 'minor third':
 { name: 'Eb', value: 3 }
```

### Working with intervals

```TypeScript
const interval = Interval.MinorThird;
const otherInterval = Interval.MinorSeventh;

console.log("Interval name:", interval.Name);
console.log("\n");
console.log("Invert 'minor third' interval:\n", interval.invert());
console.log("\n");
console.log("'m7' interval is larger than 'm3' interval:\n", otherInterval.isLargarThan(interval));
```

#### Intervals Output

```text
Interval name: Minor Third

Invert 'minor third' interval:
 _Interval {
  name: 'Major Sixth',
  abreviature: 'M6',
  distance: 9,
  quality: _IntervalQuality { name: 'Major' },
  invert: [Function (anonymous)],
  raiseOctave: [Function (anonymous)]
}

'minor seventh' interval is larger than 'minor third' interval: true
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

#### Keys Output

```text
Key notes: [
  'C', 'D', 'E',
  'F', 'G', 'A',
  'B'
]

Major keys: [
  'C', 'Db', 'D',  'Eb',
  'E', 'F',  'F#', 'Gb',
  'G', 'Ab', 'A',  'Bb',
  'B'
]

Minor keys:  [
  'Cm',  'C#m', 'Dm',
  'Ebm', 'Em',  'Fm',
  'F#m', 'Gm',  'G#m',
  'Am',  'Bbm', 'Bm'
]
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

#### Scales Output

```text
Scale pitches: [
  'C', 'D', 'E',
  'F', 'G', 'A',
  'B'
]

Scale pitches: [
  'C', 'D', 'E',
  'F', 'G', 'A',
  'B'
]

Scale melodic line: [
  'C', 'D', 'E',
  'F', 'G', 'A',
  'B'
]

Scale descending melodic line: [
  'C', 'D', 'E',
  'F', 'G', 'A',
  'B'
]

Chord for scale degree I: CMajor
Chord for scale degree II: DMinor 7
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

#### Chords Output

```text
Chord name: CMajor
Pich for chord root: C
Chord pitches: [ 'C', 'E', 'G' ]
Chord bass pitch: C
Chord lead pitch: G
Chord no fifth: [ 'C', 'E' ]
Chord inverted: [ 'E', 'G', 'C' ]
Chord: [ 'C', 'E', 'G', 'B' ]
Chord drop 2: [ 'C', 'G', 'B', 'E' ]
Chord drop 3: [ 'C', 'E', 'G', 'B' ]
```

### Working with guitar tab

```TypeScript
console.log("Empty tab:\n", Tab.render());
console.log("\n");

const melodicLine = ScalePattern.Ionian.createMelodicLineScale(Pitch.C);
const guitarLine = new GuitarMelodicLine(melodicLine, Position.C);
const guitarLine1 = new GuitarMelodicLine(line, Position.Open);

console.log("Guitar melodic line (C position):\n", Tab.render(guitarLine.toTab()));
console.log("\n");
console.log("Guitar melodic line (Open position ):\n", Tab.render(guitarLine1.toTab()));
console.log("\n");

const cChord = new ClosedChord(Pitch.C, ChordPattern.Major);
const guitarChord = GuitarChord.inPosition(cChord, Position.Open);
const chordTab = Tab.render(new Tab(guitarChord.toTab()));

console.log("Chord as tab:\n", chordTab);
console.log("\n");

const cMaj7 = new ClosedChord(Pitch.C, ChordPattern.Major7);
const dMin7 = new ClosedChord(Pitch.D, ChordPattern.Minor7);
const eMin7 = new ClosedChord(Pitch.E, ChordPattern.Minor7);
const fMaj7 = new ClosedChord(Pitch.F, ChordPattern.Major7);
const g7 = new ClosedChord(Pitch.G, ChordPattern.Dominant7);
const chords = [cMaj7, dMin7, eMin7, fMaj7, g7].map((c) => c.drop2());

const harmonicLine = new GuitarHarmonicLine(GuitarString.Sixth, chords);

const chordsTab = Tab.render(harmonicLine.toTab());
console.log("Chords as tab:\n", chordsTab);
console.log("\n");
```

#### Guitar Tab Output

```text
Empty tab:
e|--|
B|--|
G|--|
D|--|
A|--|
E|--|


Guitar melodic line (C position):
e|---------------|
B|---------------|
G|-----------2-4-|
D|-----2-3-5-----|
A|-3-5-----------|
E|---------------|


Guitar melodic line (Open position ):
e|---------------|
B|---------------|
G|---------0-2-4-|
D|---0-2-3-------|
A|-3-------------|
E|---------------|


Chord as tab:
e|-0-|
B|-1-|
G|-0-|
D|-2-|
A|-3-|
E|-0-|


Chords as tab:
e|-------------|
B|-------------|
G|--9-10-0-2-4-|
D|--9-10-0-2-3-|
A|-10-12-2-3-5-|
E|--8-10-0-1-3-|
```
