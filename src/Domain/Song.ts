import { MeasurePrimitives, SongPrimitives } from '../primitives/Song';
import { TimeSignature } from './Duration';
import ensure from './Ensure';
import { Key } from './Key';
import { Playable } from './Note';

class Playables implements Iterable<Playable> {
  private readonly playables: Playable[] = [];

  push(playable: Playable): void {
    this.playables.push(playable);
  }

  get ticks(): number {
    return this.playables.reduce((total, current) => total + current.tick, 0);
  }

  *[Symbol.iterator](): Iterator<Playable> {
    for (const playable of this.playables) {
      yield playable;
    }
  }
}

export class Measure implements Iterable<Playable> {
  protected playables: Playables;

  constructor(private readonly timeSignature: TimeSignature) {
    this.playables = new Playables();
  }

  add(playable: Playable): Measure {
    if (this.playables.ticks + playable.tick > this.timeSignature.ticksPerMeasure) {
      throw new RangeError(`cannot fit -${playable.DurationName} note in measure`);
    }

    this.playables.push(playable);

    if (this.playables.ticks === this.timeSignature.ticksPerMeasure) {
      return new FullMeasure(this.timeSignature, this.playables);
    }

    return this;
  }

  *[Symbol.iterator](): Iterator<Playable> {
    for (const unit of this.playables) {
      yield unit;
    }
  }

  get To(): MeasurePrimitives {
    return {
      playables: [...this.playables].map((p: Playable) => p.ToPlayablePrimitives),
      timeSignature: this.timeSignature.To,
    };
  }
}

export class FullMeasure extends Measure {
  constructor(timeSignature: TimeSignature, playables: Playables) {
    super(timeSignature);
    this.playables = playables;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override add(_: Playable): Measure {
    return this;
  }
}

export class Song implements Iterable<Measure> {
  private readonly measures: Measure[] = [];

  constructor(
    private readonly timeSignature: TimeSignature,
    private readonly key: Key
  ) {}

  addMeasure(measure: FullMeasure) {
    this.measures.push(measure);
    return this;
  }

  add(playable: Playable) {
    let lastMeasure = this.measures[this.measures.length - 1];

    if (!lastMeasure) {
      this.measures.push(new Measure(this.timeSignature));
      lastMeasure = this.measures[this.measures.length - 1];
    }

    try {
      ensure(lastMeasure).add(playable);
    } catch {
      this.measures.push(new Measure(this.timeSignature));
      lastMeasure = this.measures[this.measures.length - 1];
      ensure(lastMeasure).add(playable);
    }

    return this;
  }

  *[Symbol.iterator](): Iterator<Measure> {
    for (const measure of this.measures) {
      yield measure;
    }
  }

  get To(): SongPrimitives {
    return {
      measures: this.measures.map((m) => m.To),
      timeSignature: this.timeSignature.To,
      key: this.key.To,
    };
  }
}
