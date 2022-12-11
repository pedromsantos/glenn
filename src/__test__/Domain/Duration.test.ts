import {
  BeatsPerMinute,
  CompoundTimeSignature,
  Duration,
  Measure,
  SimpleTimeSignature,
} from '../../Domain/Duration';

describe('Duration', () => {
  describe('converted to beats in 4/4', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    test('Whole note is four beats', () => {
      expect(Duration.Whole.toBeats(timeSignature)).toBe(4.0);
    });

    test('Quarter note is a beat', () => {
      expect(Duration.Quarter.toBeats(timeSignature)).toBe(1.0);
    });

    test('Eighth note in is a half a beat', () => {
      expect(Duration.Eighth.toBeats(timeSignature)).toBe(1.0 / 2.0);
    });
  });

  describe('converted to beats in 3/4', () => {
    const timeSignature = new SimpleTimeSignature(3, Duration.Quarter);
    test('Quarter note is a beat', () => {
      expect(Duration.Quarter.toBeats(timeSignature)).toBe(1.0);
      expect(timeSignature.toBeats()).toBe(1.0);
    });

    test('Eighth note is half a beat', () => {
      expect(Duration.Eighth.toBeats(timeSignature)).toBe(1.0 / 2.0);
      expect(timeSignature.toBeats()).toBe(1.0);
    });
  });

  describe('converted to beats in 6/8', () => {
    const timeSignature = new CompoundTimeSignature(3, Duration.Eighth);
    test('Doted Quarter note is a beat', () => {
      expect(timeSignature.beatValue).toBe(Duration.Eighth.value * 3);
      expect(timeSignature.toBeats()).toBe(1.0);
    });

    test('Beat sub-duration is an eight note', () => {
      expect(timeSignature.beatDuration).toBe(Duration.Eighth.value);
    });

    test('One Whole note', () => {
      expect(timeSignature.toFillMeasure(Duration.Whole)).toBe(0);
      expect(timeSignature.toFillMeasure()).toBe(2.625);
    });

    test('convert to beats', () => {
      expect(Duration.Eighth.toBeats(timeSignature)).toBe(1.0);
    });
  });

  describe('Number of notes to fill measure in 4/4', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);

    test('One Whole note', () => {
      expect(Duration.Whole.toFillMeasure(timeSignature)).toBe(1);
    });

    test('Two Half notes', () => {
      expect(Duration.Half.toFillMeasure(timeSignature)).toBe(2);
    });

    test('Four Quarter notes', () => {
      expect(Duration.Quarter.toFillMeasure(timeSignature)).toBe(4);
    });

    test('Eighth Eighth notes', () => {
      expect(Duration.Eighth.toFillMeasure(timeSignature)).toBe(8);
    });
  });

  describe('Number of notes remaining to fill a measure in 4/4', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);

    describe('when measure contains a whole note its full', () => {
      const measure = new Measure(timeSignature);
      measure.add(Duration.Whole);

      test('cannot fit a whole note', () => {
        expect(Duration.Whole.toFillMeasure(timeSignature, measure)).toBe(0);
      });

      test('cannot fit a half note', () => {
        expect(Duration.Whole.toFillMeasure(timeSignature, measure)).toBe(0);
      });

      test('cannot fit a quarter note', () => {
        expect(Duration.Quarter.toFillMeasure(timeSignature, measure)).toBe(0);
      });

      test('cannot fit a eighth note', () => {
        expect(Duration.Eighth.toFillMeasure(timeSignature, measure)).toBe(0);
      });
    });

    test('when measure contains quarter note a whole note does not fit', () => {
      const measure = new Measure(timeSignature);
      measure.add(Duration.Quarter);

      expect(Duration.Whole.toFillMeasure(timeSignature, measure)).toBe(0);
    });

    test('when measure contains a half note it has space for two quarter notes', () => {
      const measure = new Measure(timeSignature);
      measure.add(Duration.Half);

      expect(Duration.Quarter.toFillMeasure(timeSignature, measure)).toBe(2);
    });

    test('when measure contains a half note it has space for four eighth notes', () => {
      const measure = new Measure(timeSignature);
      measure.add(Duration.Half);

      expect(Duration.Eighth.toFillMeasure(timeSignature, measure)).toBe(4);
    });

    test('when measure contains a quarter note it has space for three quarter notes', () => {
      const measure = new Measure(timeSignature);
      measure.add(Duration.Quarter);

      expect(Duration.Quarter.toFillMeasure(timeSignature, measure)).toBe(3);
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

    test('time for a 1/1 note', () => {
      expect(bpm.secondsFor(Duration.Whole)).toBe(4);
      expect(bpm.miliSecondsFor(Duration.Whole)).toBe(4000);
    });

    test('time for 1/2 note', () => {
      expect(bpm.secondsFor(Duration.Half)).toBe(2);
      expect(bpm.miliSecondsFor(Duration.Half)).toBe(2000);
    });

    test('time in miliseconds for 1/4 note', () => {
      expect(bpm.miliSecondsFor(Duration.Quarter)).toBe(1000);
    });

    test('time in miliseconds for 1/8 note', () => {
      expect(bpm.miliSecondsFor(Duration.Eighth)).toBe(500);
    });

    test('time in miliseconds for 1/16 note', () => {
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
