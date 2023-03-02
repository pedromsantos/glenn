import { Duration, SimpleTimeSignature, TimeSignature } from '../Domain/Duration';
import Key from '../Domain/Key';
import { Measure } from '../Domain/Song';
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
  private readonly header: abcHeader = {
    key: new abcKey(Key.CMajor),
    unit_note_length: new abcDuration(Duration.Eighth),
    meter: new abcMeter(new SimpleTimeSignature(4, Duration.Quarter)),
  };
  private readonly body: abcBody;

  constructor(key: Key, meter: TimeSignature, unitNoteLength: Duration) {
    this.header.unit_note_length = new abcDuration(unitNoteLength);
    this.header.key = new abcKey(key);
    this.header.meter = new abcMeter(meter);

    this.body = new abcBody(unitNoteLength);
  }

  addMeasure(measure: Measure, masureReferenceDuration?: Duration) {
    this.body.addMeasure(measure, masureReferenceDuration);
    return this;
  }

  toString() {
    return `${this.header.key?.toString()}/n${this.header.meter?.toString()}/n${this.header.unit_note_length?.toString()}/n${this.body.toString()}`;
  }
}
