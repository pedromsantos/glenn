import { abcClef } from '../../abcNotation/abcClef';
import { Clef } from '../../Domain/Clef';

describe('abc Clef should', () => {
  test('convert treble clef to abc notation', () => {
    const clef = Clef.Treble;
    const abc_clef = new abcClef(clef);

    expect(abc_clef.toString()).toBe('clef=G2');
  });

  test('convert French violin clef to abc notation', () => {
    const clef = Clef.FrenchViolin;
    const abc_clef = new abcClef(clef);

    expect(abc_clef.toString()).toBe('clef=G1');
  });

  test('convert sub Bass clef to abc notation', () => {
    const clef = Clef.SubBass;
    const abc_clef = new abcClef(clef);

    expect(abc_clef.toString()).toBe('clef=F5');
  });

  test('convert Bass clef to abc notation', () => {
    const clef = Clef.Bass;
    const abc_clef = new abcClef(clef);

    expect(abc_clef.toString()).toBe('clef=F4');
  });

  test('convert Baritone F clef to abc notation', () => {
    const clef = Clef.BaritoneF;
    const abc_clef = new abcClef(clef);

    expect(abc_clef.toString()).toBe('clef=F3');
  });

  test('convert Tenor clef to abc notation', () => {
    const clef = Clef.Tenor;
    const abc_clef = new abcClef(clef);

    expect(abc_clef.toString()).toBe('clef=C4');
  });

  test('convert Alto clef to abc notation', () => {
    const clef = Clef.Alto;
    const abc_clef = new abcClef(clef);

    expect(abc_clef.toString()).toBe('clef=C3');
  });

  test('convert Mezzo soprano clef to abc notation', () => {
    const clef = Clef.Mezzo;
    const abc_clef = new abcClef(clef);

    expect(abc_clef.toString()).toBe('clef=C2');
  });

  test('convert soprano clef to abc notation', () => {
    const clef = Clef.Soprano;
    const abc_clef = new abcClef(clef);

    expect(abc_clef.toString()).toBe('clef=C1');
  });
});
