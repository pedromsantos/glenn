import {
  BeatsPerMinute,
  CompoundTimeSignature,
  Duration,
  Measure,
  SimpleTimeSignature,
} from '../../Domain/Duration';

describe('SimpleTimeSignature', () => {
  test('Beat duration in miliseconds', () => {
    const timeSignature44 = new SimpleTimeSignature(4, Duration.Quarter, 60);
    const timeSignature34 = new SimpleTimeSignature(3, Duration.Quarter, 60);
    const timeSignature24 = new SimpleTimeSignature(2, Duration.Quarter, 60);

    expect(timeSignature44.beatDurationMiliseconds).toBe(1000);
    expect(timeSignature34.beatDurationMiliseconds).toBe(1000);
    expect(timeSignature24.beatDurationMiliseconds).toBe(1000);
  });

  test('Beat duration in ticks', () => {
    const timeSignature44 = new SimpleTimeSignature(4, Duration.Quarter, 60);
    const timeSignature34 = new SimpleTimeSignature(3, Duration.Quarter, 60);
    const timeSignature24 = new SimpleTimeSignature(2, Duration.Quarter, 60);

    expect(timeSignature44.ticksPerSecond).toBe(480);
    expect(timeSignature34.ticksPerSecond).toBe(480);
    expect(timeSignature24.ticksPerSecond).toBe(480);

    expect(timeSignature44.beatDurationTicks).toBe(Duration.Quarter.tick);
    expect(timeSignature34.beatDurationTicks).toBe(Duration.Quarter.tick);
    expect(timeSignature24.beatDurationTicks).toBe(Duration.Quarter.tick);
  });

  test('Note durations in miliseconds', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter, 60);

    const wholeNoteExpectedDuration = 4000;

    expect(timeSignature.milisecondsFor(Duration.Whole)).toBe(wholeNoteExpectedDuration);
    expect(timeSignature.milisecondsFor(Duration.Half)).toBe(wholeNoteExpectedDuration / 2);
    expect(timeSignature.milisecondsFor(Duration.Quarter)).toBe(wholeNoteExpectedDuration / 4);
    expect(timeSignature.milisecondsFor(Duration.Eighth)).toBe(wholeNoteExpectedDuration / 8);
    expect(timeSignature.milisecondsFor(Duration.Sixteenth)).toBe(wholeNoteExpectedDuration / 16);
    expect(timeSignature.milisecondsFor(Duration.ThirtySecond)).toBe(
      wholeNoteExpectedDuration / 32
    );
    expect(timeSignature.milisecondsFor(Duration.SixtyFourth)).toBe(wholeNoteExpectedDuration / 64);
  });

  test('Measure durations in miliseconds', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter, 60);

    const expectedDuration = 4000;

    expect(timeSignature.milisecondsPerMeasure).toBe(expectedDuration);
  });

  test('Measure durations in ticks', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter, 60);

    expect(timeSignature.ticksPerMeasure).toBe(1920);
  });

  describe('Number of notes to fill a measure in 4/4', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);

    test('Whole notes', () => {
      expect(timeSignature.toFillMeasure(Duration.Whole)).toBe(1);
    });

    test('Quarter notes', () => {
      expect(timeSignature.toFillMeasure(Duration.Quarter)).toBe(4);
    });

    test('Eighth notes', () => {
      expect(timeSignature.toFillMeasure(Duration.Eighth)).toBe(8);
    });

    test('Sixteenth notes', () => {
      expect(timeSignature.toFillMeasure(Duration.Sixteenth)).toBe(16);
    });

    test('ThirtySecond notes', () => {
      expect(timeSignature.toFillMeasure(Duration.ThirtySecond)).toBe(32);
    });
  });
});

describe('CompoundTimeSignature', () => {
  test('Beat duration in miliseconds', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth, 60);

    expect(timeSignature.beatDurationMiliseconds).toBe(1000);
    expect(timeSignature.beatDurationMiliseconds).toBe(1000);
    expect(timeSignature.beatDurationMiliseconds).toBe(1000);
  });

  test('Beat duration in ticks', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth, 60);

    expect(timeSignature.ticksPerSecond).toBe(480);

    expect(timeSignature.beatDurationTicks).toBe(Duration.Eighth.tick);
    expect(timeSignature.beatDurationTicks).toBe(Duration.Eighth.tick);
    expect(timeSignature.beatDurationTicks).toBe(Duration.Eighth.tick);
  });

  test('Note durations in miliseconds', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth, 60);

    const wholeNoteExpectedDuration = 8000;

    expect(timeSignature.milisecondsFor(Duration.Whole)).toBe(wholeNoteExpectedDuration);
    expect(timeSignature.milisecondsFor(Duration.Half)).toBe(wholeNoteExpectedDuration / 2);
    expect(timeSignature.milisecondsFor(Duration.Quarter)).toBe(wholeNoteExpectedDuration / 4);
    expect(timeSignature.milisecondsFor(Duration.Eighth)).toBe(wholeNoteExpectedDuration / 8);
    expect(timeSignature.milisecondsFor(Duration.Sixteenth)).toBe(wholeNoteExpectedDuration / 16);
    expect(timeSignature.milisecondsFor(Duration.ThirtySecond)).toBe(
      wholeNoteExpectedDuration / 32
    );
    expect(timeSignature.milisecondsFor(Duration.SixtyFourth)).toBe(wholeNoteExpectedDuration / 64);
  });

  test('Measure durations in miliseconds', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth, 60);

    const expectedDuration = 2000;

    expect(timeSignature.milisecondsPerMeasure).toBe(expectedDuration);
  });

  test('Measure durations in ticks', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth, 60);

    expect(timeSignature.ticksPerMeasure).toBe(480);
  });

  describe('converted to beats in 6/8', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth);
    test('Eighth note is a beat', () => {
      expect(timeSignature.beatDurationTicks).toBe(Duration.Eighth.tick);
    });

    test('Beat duration is an 3 x eight note', () => {
      expect(timeSignature.beatDuration).toBe(Duration.Eighth.value * 3);
    });
  });

  describe('Number of notes to fill a measure in 6/8', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth);

    test('Half notes', () => {
      expect(timeSignature.toFillMeasure(Duration.DottedHalf)).toBe(1);
    });

    test('Dotted Quarter notes', () => {
      expect(timeSignature.toFillMeasure(Duration.DottedQuarter)).toBe(2);
    });

    test('Quarter notes', () => {
      expect(timeSignature.toFillMeasure(Duration.Quarter)).toBe(3);
    });

    test('Eighth notes', () => {
      expect(timeSignature.toFillMeasure(Duration.Eighth)).toBe(6);
    });

    test('Sixteenth notes', () => {
      expect(timeSignature.toFillMeasure(Duration.Sixteenth)).toBe(12);
    });

    test('ThirtySecond notes', () => {
      expect(timeSignature.toFillMeasure(Duration.ThirtySecond)).toBe(24);
    });
  });
});

describe('Duration', () => {
  describe('ticks', () => {
    const cases: Array<[Duration, number]> = [
      [Duration.Whole, 1920],
      [Duration.DoubleDottedHalf, 1680],
      [Duration.DottedHalf, 1440],
      [Duration.TripletWhole, 1280],
      [Duration.Half, 960],
      [Duration.DoubleDottedQuarter, 840],
      [Duration.DottedQuarter, 720],
      [Duration.TripletHalf, 640],
      [Duration.Quarter, 480],
      [Duration.DoubleDottedEighth, 420],
      [Duration.DottedEighth, 360],
      [Duration.TripletQuarterNote, 320],
      [Duration.Eighth, 240],
      [Duration.DoubleDottedSixteenth, 210],
      [Duration.DottedSixteenth, 180],
      [Duration.TripletEighth, 160],
      [Duration.Sixteenth, 120],
      [Duration.DoubleDottedThirtySecond, 105],
      [Duration.DottedThirtySecond, 90],
      [Duration.TripletSixteenth, 80],
      [Duration.ThirtySecond, 60],
      [Duration.DottedSixtyFourth, 45],
      [Duration.TripletThirtySecond, 40],
      [Duration.SixtyFourth, 30],
    ];
    test.each(cases)('Measure', (duration: Duration, ticks: number) => {
      expect(duration.tick).toBe(ticks);
    });
  });
});

describe('BeatsPerMinute', () => {
  describe('120BPM 1/4 note', () => {
    const bpm = new BeatsPerMinute(120);

    test('time in seconds for a beat', () => {
      expect(bpm.seconds()).toBe(0.5);
    });

    test('time in miliseconds for a beat', () => {
      expect(bpm.miliSeconds()).toBe(500);
    });

    test('time in miliseconds for a measure of 4 beats', () => {
      expect(bpm.miliSeconds(4)).toBe(2000);
    });

    test('time for 1/1 note', () => {
      expect(bpm.secondsFor(Duration.Whole)).toBe(2);
      expect(bpm.miliSecondsFor(Duration.Whole)).toBe(2000);
    });

    // eslint-disable-next-line sonarjs/no-duplicate-string
    test('time for 1/2 note', () => {
      expect(bpm.secondsFor(Duration.Half)).toBe(1);
      expect(bpm.miliSecondsFor(Duration.Half)).toBe(1000);
    });

    // eslint-disable-next-line sonarjs/no-duplicate-string
    test('time in miliseconds for 1/4 note', () => {
      expect(bpm.miliSecondsFor(Duration.Quarter)).toBe(500);
    });

    // eslint-disable-next-line sonarjs/no-duplicate-string
    test('time in miliseconds for 1/8 note', () => {
      expect(bpm.miliSecondsFor(Duration.Eighth)).toBe(250);
    });
  });

  describe('60BPM 1/4 note', () => {
    const bpm = new BeatsPerMinute(60);

    test('time for a whole note', () => {
      expect(bpm.secondsFor(Duration.Whole)).toBe(4);
      expect(bpm.miliSecondsFor(Duration.Whole)).toBe(4000);
    });

    test('time for half note', () => {
      expect(bpm.secondsFor(Duration.Half)).toBe(2);
      expect(bpm.miliSecondsFor(Duration.Half)).toBe(2000);
    });

    test('time in miliseconds for quarter note', () => {
      expect(bpm.miliSecondsFor(Duration.Quarter)).toBe(1000);
    });

    test('time in miliseconds for eighth note', () => {
      expect(bpm.miliSecondsFor(Duration.Eighth)).toBe(500);
    });

    test('time in miliseconds for sixteenth note', () => {
      expect(bpm.miliSecondsFor(Duration.Sixteenth)).toBe(250);
    });
  });

  describe('60BPM 1/8 note', () => {
    const bpm = new BeatsPerMinute(60, Duration.Eighth);

    test('time for 1/1 note', () => {
      expect(bpm.secondsFor(Duration.Whole)).toBe(8);
      expect(bpm.miliSecondsFor(Duration.Whole)).toBe(8000);
    });

    test('time for 1/2 note', () => {
      expect(bpm.secondsFor(Duration.Half)).toBe(4);
      expect(bpm.miliSecondsFor(Duration.Half)).toBe(4000);
    });

    test('time in miliseconds for 1/4 note', () => {
      expect(bpm.miliSecondsFor(Duration.Quarter)).toBe(2000);
    });

    test('time in miliseconds for 1/8 note', () => {
      expect(bpm.miliSecondsFor(Duration.Eighth)).toBe(1000);
    });

    test('time in miliseconds for 1/16 note', () => {
      expect(bpm.miliSecondsFor(Duration.Sixteenth)).toBe(500);
    });
  });
});

describe('Number of notes remaining to fill a measure in 4/4', () => {
  const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);

  describe('when measure contains a whole note its full', () => {
    const measure = new Measure(timeSignature);
    measure.add(Duration.Whole);
  });
});
