import { DurationPrimitives } from '../primitives/Duration';
import { PlayablePrimitives, PlayableType } from '../primitives/Playables';
import { MeasurePrimitives } from '../primitives/Song';
import { AbcChord } from './abcChord';
import { AbcNote, AbcRest } from './abcNote';

export class AbcMeasure {
  constructor(
    private readonly measure: MeasurePrimitives,
    private readonly defaultDuration: DurationPrimitives
  ) {}

  toString() {
    return this.measure.playables.map((p) => this.map(p)).join('');
  }

  private map(playable: PlayablePrimitives) {
    if (playable.playableType == PlayableType.Chord && playable.chord) {
      return new AbcChord(playable.chord, this.defaultDuration).toString();
    }

    if (playable.playableType == PlayableType.Note && playable.note) {
      return new AbcNote(playable.note, this.defaultDuration).toString();
    }

    if (playable.rest) {
      return new AbcRest(playable.rest, this.defaultDuration).toString();
    }

    return '';
  }
}
