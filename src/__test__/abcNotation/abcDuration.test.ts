import { abcDuration } from '../../abcNotation/abcDuration';
import { Duration } from '../../Domain/Duration';

describe('abc Duration should', () => {
  test.each([
    [Duration.Double, 'L:2'],
    [Duration.Whole, 'L:1'],
    [Duration.Half, 'L:1/2'],
    [Duration.Quarter, 'L:1/4'],
    [Duration.Eighth, 'L:1/8'],
    [Duration.Sixteenth, 'L:1/16'],
    [Duration.ThirtySecond, 'L:1/32'],
    [Duration.SixtyFourth, 'L:1/64'],
  ])('convert quarter note duration to abc notation', (duration: Duration, expected: string) => {
    const abc_duration = new abcDuration(duration);

    expect(abc_duration.toString()).toBe(expected);
  });
});
