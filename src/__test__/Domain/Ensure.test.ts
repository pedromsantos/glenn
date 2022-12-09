import ensure from '../../Domain/Ensure';

describe('Ensure should', () => {
  test('error when value is undefined', () => {
    const data = [2];

    expect(() => ensure(data.find((value) => value == 1))).toThrow();
  });

  test('error when value is null', () => {
    const data = [null];

    expect(() => ensure(data.find((value) => value))).toThrow();
  });

  test('not to error when value is defined', () => {
    const data = [1];

    expect(ensure(data.find((value) => value == 1))).toBe(1);
  });
});
