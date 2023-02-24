import { abcDuration } from './abcDuration';
import { abcKey } from './abcKey';

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
  meter: string;
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

export class abcBody {}

export class abcTune {
  //private header: abcHeader;
}
