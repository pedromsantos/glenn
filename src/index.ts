import { AbcChord } from './abcNotation/abcChord';
import { AbcClef } from './abcNotation/abcClef';
import { AbcNote, AbcRest } from './abcNotation/abcNote';
import { AbcTune } from './abcNotation/abcTune';
import { BarryHarrisLine } from './Domain/Barry';
import { ChordFunction, ChordPattern, ClosedChord, Drop2Chord, Drop3Chord } from './Domain/Chord';
import { Clef } from './Domain/Clef';
import { CompoundTimeSignature, Duration, SimpleTimeSignature } from './Domain/Duration';
import {
  GuitarChord,
  GuitarHarmonicLine,
  GuitarPitchLine,
  GuitarPitchLines,
  GuitarString,
  Position,
  Tab,
  TabColumn,
} from './Domain/Guitar';
import { Interval } from './Domain/Interval';
import { Key } from './Domain/Key';
import { MelodicLine, Note, Octave, Rest } from './Domain/Note';
import { Pitch, PitchLine } from './Domain/Pitch';
import {
  Scale,
  ScaleDegree,
  ScalePattern,
  SeventhHarmonizer,
  TriadHarmonizer,
} from './Domain/Scale';
import { Measure, Song } from './Domain/Song';

export {
  AbcChord as abcChord,
  AbcClef as abcClef,
  AbcNote as abcNote,
  AbcRest as abcRest,
  AbcTune as abcTune,
  BarryHarrisLine,
  ChordFunction,
  ChordPattern,
  Clef,
  ClosedChord,
  CompoundTimeSignature,
  Drop2Chord,
  Drop3Chord,
  Duration,
  GuitarChord,
  GuitarHarmonicLine,
  GuitarPitchLine as GuitarMelodicLine,
  GuitarPitchLines,
  GuitarString,
  Interval,
  Key,
  Measure,
  PitchLine as MelodicLine,
  MelodicLine as MelodicPhrase,
  Note,
  Octave,
  Pitch,
  Position,
  Rest,
  Scale,
  ScaleDegree,
  ScalePattern,
  SeventhHarmonizer,
  SimpleTimeSignature,
  Song,
  Tab,
  TabColumn,
  TriadHarmonizer,
};
