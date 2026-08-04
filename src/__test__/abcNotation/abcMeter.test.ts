import { AbcMeter } from '../../abcNotation/abcMeter';
import { CompoundTimeSignature, Duration, SimpleTimeSignature } from '../../Domain/Duration';

describe('abc Meter should', () => {
  test.each([
    { beats: 4, duration: Duration.Quarter, expected: 'M:4/4' },
    { beats: 3, duration: Duration.Quarter, expected: 'M:3/4' },
    { beats: 2, duration: Duration.Quarter, expected: 'M:2/4' },
    { beats: 2, duration: Duration.Half, expected: 'M:2/2' },
    { beats: 2, duration: Duration.Whole, expected: 'M:2/1' },
  ])('convert simple time signature to abc notation $expected', ({ beats, duration, expected }) => {
    const timeSignature = new SimpleTimeSignature(beats, duration);
    const abc_meter = new AbcMeter(timeSignature.To);

    expect(abc_meter.toString()).toBe(expected);
  });

  test.each([
    { beats: 6, duration: Duration.Eighth, expected: 'M:6/8' },
    { beats: 6, duration: Duration.Whole, expected: 'M:6/1' },
    { beats: 12, duration: Duration.Eighth, expected: 'M:12/8' },
  ])('convert compound time signature to abc notation $expected', ({ beats, duration, expected }) => {
    const timeSignature = new CompoundTimeSignature(beats, duration);
    const abc_meter = new AbcMeter(timeSignature.To);

    expect(abc_meter.toString()).toBe(expected);
  });
});
