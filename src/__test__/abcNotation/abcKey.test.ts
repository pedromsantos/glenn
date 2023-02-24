import { abcKey } from '../../abcNotation/abcKey';
import Key from '../../Domain/Key';

describe('abc Key should', () => {
  test('convert C Major key to abc notation', () => {
    const key = Key.CMajor;
    const abc_key = new abcKey(key);

    expect(abc_key.toString()).toBe('K:CMajor');
  });

  test('convert A minor key to abc notation', () => {
    const key = Key.AMinor;
    const abc_key = new abcKey(key);

    expect(abc_key.toString()).toBe('K:AMinor');
  });
});
