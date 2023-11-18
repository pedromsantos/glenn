import { Duration, SimpleTimeSignature } from '../Domain/Duration';
import ensure from '../Domain/Ensure';
import { Key } from '../Domain/Key';
import { Song } from '../Domain/Song';
import { AbcDuration } from './abcDuration';
import { AbcKey } from './abcKey';
import { AbcMeasure } from './abcMeasure';
import { AbcMeter } from './abcMeter';

interface AbcHeader {
  area?: string;
  book?: string;
  composer?: string;
  discography?: string;
  file_url?: string;
  group?: string;
  history?: string;
  instruction?: string;
  key: AbcKey;
  unit_note_length: AbcDuration;
  meter: AbcMeter;
  macro?: string;
  notes?: string;
  origin?: string;
  parts?: string;
  tempo?: string;
  rhythm?: string;
  remark?: string;
  source?: string;
  symbol_line?: string;
  tune_title?: string;
  user_defined?: string;
  voice?: string;
  words?: string;
  reference_number?: number;
  transcription?: string;
}

class AbcBody {
  constructor(private readonly measures: AbcMeasure[]) {}

  toString() {
    return `|${this.measures.map((m) => m.toString()).join('|')}|`;
  }
}

export class AbcTune {
  private readonly body: AbcBody;
  private readonly header: AbcHeader = {
    key: new AbcKey(Key.CMajor),
    unit_note_length: new AbcDuration(Duration.Eighth.To),
    meter: new AbcMeter(new SimpleTimeSignature(4, Duration.Quarter)),
  };

  constructor(song: Song, unitNoteLength: Duration, referenceNumber = 1) {
    this.header.unit_note_length = new AbcDuration(unitNoteLength.To);
    this.header.key = new AbcKey(song.Key);
    this.header.meter = new AbcMeter(song.TimeSignature);
    this.header.reference_number = referenceNumber;

    this.body = new AbcBody([...song].map((m) => new AbcMeasure(m, unitNoteLength)));
  }

  toString() {
    const referenceNumber = ensure(this.header.reference_number?.toString());

    return `X:${referenceNumber}\n${this.header.key.toString()}\n${this.header.meter.toString()}\n${this.header.unit_note_length.toString()}\n${this.body.toString()}`;
  }
}
