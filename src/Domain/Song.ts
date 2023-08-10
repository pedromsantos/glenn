import { Chord } from './Chord';
import { TimeSignature } from './Duration';
import ensure from './Ensure';
import { Key } from './Key';
import { Note, Rest } from './Note';

export type Unit = Note | Rest | Chord;

class Fragment implements Iterable<Unit> {
  private readonly units: Unit[] = [];

  push(unit: Unit): void {
    this.units.push(unit);
  }

  get ticks(): number {
    return this.units.reduce((total, current) => total + current.tick, 0);
  }

  *[Symbol.iterator](): Iterator<Unit> {
    for (const unit of this.units) {
      yield unit;
    }
  }
}

export class Measure implements Iterable<Unit> {
  protected fragment: Fragment;
  private readonly timeSignature: TimeSignature;

  constructor(timeSignature: TimeSignature) {
    this.fragment = new Fragment();
    this.timeSignature = timeSignature;
  }

  add(unit: Unit): Measure {
    if (this.fragment.ticks + unit.tick > this.timeSignature.ticksPerMeasure) {
      throw new RangeError(`cannot fit -${unit.DurationName} note in measure`);
    }

    this.fragment.push(unit);

    if (this.fragment.ticks === this.timeSignature.ticksPerMeasure) {
      return new FullMeasure(this.timeSignature, this.fragment);
    }

    return this;
  }

  *[Symbol.iterator](): Iterator<Unit> {
    for (const unit of this.fragment) {
      yield unit;
    }
  }
}

export class FullMeasure extends Measure {
  constructor(timeSignature: TimeSignature, fragment: Fragment) {
    super(timeSignature);
    this.fragment = fragment;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override add(_: Unit): Measure {
    return this;
  }
}

export class Song implements Iterable<Measure> {
  private readonly measures: Measure[] = [];

  constructor(
    private readonly timeSignature: TimeSignature,
    private readonly key: Key
  ) {}

  get Key() {
    return this.key;
  }

  get TimeSignature() {
    return this.timeSignature;
  }

  addMeasure(measure: FullMeasure) {
    this.measures.push(measure);
    return this;
  }

  add(unit: Unit) {
    let lastMeasure = this.measures[this.measures.length - 1];

    if (!lastMeasure) {
      this.measures.push(new Measure(this.timeSignature));
      lastMeasure = this.measures[this.measures.length - 1];
    }

    try {
      ensure(lastMeasure).add(unit);
    } catch (err) {
      this.measures.push(new Measure(this.timeSignature));
      lastMeasure = this.measures[this.measures.length - 1];
      ensure(lastMeasure).add(unit);
    }

    return this;
  }

  *[Symbol.iterator](): Iterator<Measure> {
    for (const measure of this.measures) {
      yield measure;
    }
  }
}
