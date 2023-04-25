import { Duration, SimpleTimeSignature } from '../Domain/Duration';
import ensure from '../Domain/Ensure';
import { Key } from '../Domain/Key';
import { Song } from '../Domain/Song';
import { abcDuration } from './abcDuration';
import { abcKey } from './abcKey';
import { abcMeasure } from './abcMeasure';
import { abcMeter } from './abcMeter';

interface abcHeader {
  area?: string;
  book?: string;
  composer?: string;
  discography?: string;
  file_url?: string;
  group?: string;
  history?: string;
  instruction?: string;
  key: abcKey;
  unit_note_length: abcDuration;
  meter: abcMeter;
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

class abcBody {
  constructor(private readonly measures: abcMeasure[] = []) {}

  toString() {
    return `|${this.measures.map((m) => m.toString()).join('|')}|`;
  }
}

export class abcTune {
  private readonly body: abcBody;
  private readonly header: abcHeader = {
    key: new abcKey(Key.CMajor),
    unit_note_length: new abcDuration(Duration.Eighth),
    meter: new abcMeter(new SimpleTimeSignature(4, Duration.Quarter)),
  };

  constructor(song: Song, unitNoteLength: Duration, referenceNumber = 1) {
    this.header.unit_note_length = new abcDuration(unitNoteLength);
    this.header.key = new abcKey(song.Key);
    this.header.meter = new abcMeter(song.TimeSignature);
    this.header.reference_number = referenceNumber;

    this.body = new abcBody([...song].map((m) => new abcMeasure(m, unitNoteLength)));
  }

  toString() {
    const referenceNumber = ensure(this.header.reference_number?.toString());

    return `X:${referenceNumber}\n${this.header.key.toString()}\n${this.header.meter.toString()}\n${this.header.unit_note_length.toString()}\n${this.body.toString()}`;
  }
}
