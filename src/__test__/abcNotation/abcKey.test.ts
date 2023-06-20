import { AbcKey } from '../../abcNotation/abcKey';
import { Key } from '../../Domain/Key';

describe('abc Key should', () => {
  test('convert C Major key to abc notation', () => {
    const key = Key.CMajor;
    const abc_key = new AbcKey(key);

    expect(abc_key.toString()).toBe('K:C');
  });

  test('convert A minor key to abc notation', () => {
    const key = Key.AMinor;
    const abc_key = new AbcKey(key);

    expect(abc_key.toString()).toBe('K:Am');
  });

  test('convert Bb Major key to abc notation', () => {
    const key = Key.BFlatMajor;
    const abc_key = new AbcKey(key);

    expect(abc_key.toString()).toBe('K:Bb');
  });

  test('convert C# minor key to abc notation', () => {
    const key = Key.CSharpMinor;
    const abc_key = new AbcKey(key);

    expect(abc_key.toString()).toBe('K:C#m');
  });
});
