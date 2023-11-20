import ensure from '../Domain/Ensure';
import { DurationPrimitives } from '../primitives/Duration';
import { SongPrimitives } from '../primitives/Song';
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
  private readonly header?: AbcHeader;

  constructor(song: SongPrimitives, unitNoteLength: DurationPrimitives, referenceNumber = 1) {
    this.header = {
      unit_note_length: new AbcDuration(unitNoteLength),
      key: new AbcKey(song.key),
      meter: new AbcMeter(song.timeSignature),
      reference_number: referenceNumber,
    };

    this.body = new AbcBody(song.measures.map((m) => new AbcMeasure(m, unitNoteLength)));
  }

  toString() {
    const referenceNumber = ensure(this.header?.reference_number?.toString());

    return `X:${referenceNumber}\n${this.header?.key.toString()}\n${this.header?.meter.toString()}\n${this.header?.unit_note_length.toString()}\n${this.body.toString()}`;
  }
}
