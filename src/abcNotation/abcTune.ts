import { abcDuration } from './abcDuration';
import { abcKey } from './abcKey';
import { abcMeasure } from './abcMeasure';
import { abcMeter } from './abcMeter';

export interface abcHeader {
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
  tempo: string;
  rhythm?: string;
  remark?: string;
  source?: string;
  symbol_line?: string;
  tune_title?: string;
  user_defined?: string;
  voice?: string;
  words?: string;
  reference_number: number;
  transcription?: string;
}

export class abcBody {
  constructor(private readonly measures: abcMeasure[]) {}

  toString() {
    return `|${this.measures.map((m) => m.toString()).join('|')}|`;
  }
}

export class abcTune {
  // private readonly header: abcHeader;
  // private readonly body: abcBody;
}
