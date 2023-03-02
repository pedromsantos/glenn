import { abcMeter } from '../../abcNotation/abcMeter';
import { CompoundTimeSignature, Duration, SimpleTimeSignature } from '../../Domain/Duration';

describe('abc Meter should', () => {
  test('convert 4/4 time signature to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(4, Duration.Quarter);
    const abc_meter = new abcMeter(timeSignature);

    expect(abc_meter.toString()).toBe('M:4/4');
  });

  test('convert 3/4 time signature to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(3, Duration.Quarter);
    const abc_meter = new abcMeter(timeSignature);

    expect(abc_meter.toString()).toBe('M:3/4');
  });

  test('convert 2/4 time signature to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(2, Duration.Quarter);
    const abc_meter = new abcMeter(timeSignature);

    expect(abc_meter.toString()).toBe('M:2/4');
  });

  test('convert 2/2 time signature to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(2, Duration.Half);
    const abc_meter = new abcMeter(timeSignature);

    expect(abc_meter.toString()).toBe('M:2/2');
  });

  test('convert 2/1 time signature to abc notation', () => {
    const timeSignature = new SimpleTimeSignature(2, Duration.Whole);
    const abc_meter = new abcMeter(timeSignature);

    expect(abc_meter.toString()).toBe('M:2/1');
  });

  test('convert 6/8 time signature to abc notation', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Eighth);
    const abc_meter = new abcMeter(timeSignature);

    expect(abc_meter.toString()).toBe('M:6/8');
  });

  test('convert 6/1 time signature to abc notation', () => {
    const timeSignature = new CompoundTimeSignature(6, Duration.Whole);
    const abc_meter = new abcMeter(timeSignature);

    expect(abc_meter.toString()).toBe('M:6/1');
  });

  test('convert 12/8 time signature to abc notation', () => {
    const timeSignature = new CompoundTimeSignature(12, Duration.Eighth);
    const abc_meter = new abcMeter(timeSignature);

    expect(abc_meter.toString()).toBe('M:12/8');
  });
});
