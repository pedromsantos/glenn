import { Duration, RhythmicPhrase, TimeSignature } from './Duration';

export class Measure {
  protected phrase: RhythmicPhrase;
  private readonly timeSignature: TimeSignature;

  constructor(timeSignature: TimeSignature) {
    this.phrase = new RhythmicPhrase();
    this.timeSignature = timeSignature;
  }

  add(duration: Duration): Measure {
    if (this.phrase.ticks + duration.tick > this.timeSignature.ticksPerMeasure) {
      throw new RangeError(`cannot fit -${duration.Name} note in measure`);
    }

    this.phrase.push(duration);

    if (this.phrase.ticks === this.timeSignature.ticksPerMeasure) {
      return new FullMeasure(this.timeSignature, this.phrase);
    }

    return this;
  }
}

export class FullMeasure extends Measure {
  constructor(timeSignature: TimeSignature, phrase: RhythmicPhrase) {
    super(timeSignature);
    this.phrase = phrase;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override add(_: Duration): Measure {
    return this;
  }
}
