import { Duration } from 'src/Domain/Duration';
import { Measure } from 'src/Domain/Song';

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
  private readonly measures: abcMeasure[] = [];

  constructor(private readonly referenceDuration: Duration) {}

  addMeasure(measure: Measure, masureReferenceDuration?: Duration) {
    this.measures.push(
      new abcMeasure(
        measure,
        masureReferenceDuration ? masureReferenceDuration : this.referenceDuration
      )
    );

    return this;
  }

  toString() {
    return `|${this.measures.map((m) => m.toString()).join('|')}|`;
  }
}

export class abcTune {
  // private readonly header: abcHeader;
  private readonly body: abcBody;

  constructor(defaultDuration: Duration) {
    this.body = new abcBody(defaultDuration);
  }

  addMeasure(measure: Measure, masureReferenceDuration?: Duration) {
    this.body.addMeasure(measure, masureReferenceDuration);
    return this;
  }

  toString() {
    return this.body.toString();
  }
}
