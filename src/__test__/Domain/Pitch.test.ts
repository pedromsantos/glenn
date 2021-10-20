import Interval from '../../Domain/Interval';
import Pitch from '../../Domain/Pitch';

describe('Pitch', () => {
  describe('sharp should raise it by half a tone', () => {
    test('sharp C is C#', () => {
      const pitch = Pitch.C;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.CSharp);
    });

    test('sharp C# is D', () => {
      const pitch = Pitch.CSharp;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.D);
    });

    test('sharp Db is D', () => {
      const pitch = Pitch.DFlat;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.D);
    });

    test('sharp D is D#', () => {
      const pitch = Pitch.D;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.DSharp);
    });

    test('sharp D# is E', () => {
      const pitch = Pitch.DSharp;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.E);
    });

    test('sharp EFlat is E', () => {
      const pitch = Pitch.EFlat;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.E);
    });

    test('sharp E is F', () => {
      const pitch = Pitch.E;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.F);
    });

    test('sharp F is F#', () => {
      const pitch = Pitch.E;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.F);
    });

    test('sharp F# is G', () => {
      const pitch = Pitch.FSharp;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.G);
    });

    test('sharp Gb is G', () => {
      const pitch = Pitch.GFlat;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.G);
    });

    test('sharp G is G#', () => {
      const pitch = Pitch.G;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.GSharp);
    });

    test('sharp G# is A', () => {
      const pitch = Pitch.GSharp;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.A);
    });

    test('sharp Ab is G', () => {
      const pitch = Pitch.AFlat;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.A);
    });

    test('sharp A is A#', () => {
      const pitch = Pitch.A;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.ASharp);
    });

    test('sharp A# is B', () => {
      const pitch = Pitch.ASharp;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.B);
    });

    test('sharp Bb is B', () => {
      const pitch = Pitch.BFlat;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.B);
    });

    test('sharp B is C', () => {
      const pitch = Pitch.B;
      const sharpedPitch = pitch.sharp();

      expect(sharpedPitch).toBe(Pitch.C);
    });
  });

  describe('flat should lower it by half a tone', () => {
    test('sharp C is B', () => {
      const pitch = Pitch.C;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.B);
    });

    test('flat C# is C', () => {
      const pitch = Pitch.CSharp;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.C);
    });

    test('flat Db is C', () => {
      const pitch = Pitch.DFlat;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.C);
    });

    test('flat D is Db', () => {
      const pitch = Pitch.D;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.DFlat);
    });

    test('flat D# is D', () => {
      const pitch = Pitch.DSharp;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.D);
    });

    test('flat EFlat is D', () => {
      const pitch = Pitch.EFlat;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.D);
    });

    test('flat E is Eb', () => {
      const pitch = Pitch.E;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.EFlat);
    });

    test('flat F is E', () => {
      const pitch = Pitch.F;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.E);
    });

    test('flat F# is G', () => {
      const pitch = Pitch.FSharp;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.F);
    });

    test('flat Gb is F', () => {
      const pitch = Pitch.GFlat;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.F);
    });

    test('flat G is Gb', () => {
      const pitch = Pitch.G;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.GFlat);
    });

    test('sharp G# is G', () => {
      const pitch = Pitch.GSharp;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.G);
    });

    test('flat Ab is G', () => {
      const pitch = Pitch.AFlat;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.G);
    });

    test('flat A is Ab', () => {
      const pitch = Pitch.A;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.AFlat);
    });

    test('flat A# is A', () => {
      const pitch = Pitch.ASharp;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.A);
    });

    test('flat Bb is A', () => {
      const pitch = Pitch.BFlat;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.A);
    });

    test('flat B is Bb', () => {
      const pitch = Pitch.B;
      const sharpedPitch = pitch.flat();

      expect(sharpedPitch).toBe(Pitch.BFlat);
    });
  });
  describe('measure semitones between ', () => {
    test('C and C to zero semitones', () => {
      expect(Pitch.C.absoluteDistance(Pitch.C)).toBe(0);
    });
    test('C and C# to one semitones', () => {
      expect(Pitch.C.absoluteDistance(Pitch.CSharp)).toBe(1);
    });
    test('C and Db to one semitones', () => {
      expect(Pitch.C.absoluteDistance(Pitch.DFlat)).toBe(1);
    });
    test('C and D to one semitones', () => {
      expect(Pitch.C.absoluteDistance(Pitch.D)).toBe(2);
    });

    test('C and E flat to three semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.EFlat)).toBe(3);
    });

    test('C and E to four semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.E)).toBe(4);
    });

    test('C and F to five semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.F)).toBe(5);
    });

    test('C and F sharp to six semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.FSharp)).toBe(6);
    });

    test('C and G flat to six semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.GFlat)).toBe(6);
    });

    test('C and G to seven semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.G)).toBe(7);
    });

    test('C and G sharp to eight semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.GSharp)).toBe(8);
    });

    test('C and A flat to eight semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.AFlat)).toBe(8);
    });

    test('C and A to nine semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.A)).toBe(9);
    });

    test('C and A sharp to ten semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.ASharp)).toBe(10);
    });

    test('C and B flat to ten semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.BFlat)).toBe(10);
    });

    test('C and B to eleven semitones`', () => {
      expect(Pitch.C.absoluteDistance(Pitch.B)).toBe(11);
    });
  });

  describe('measure intervals between', () => {
    test('C and Db to minor second', () => {
      expect(Pitch.C.intervalTo(Pitch.DFlat)).toBe(Interval.MinorSecond);
    });

    test('C and D as MajorSecond', () => {
      expect(Pitch.C.intervalTo(Pitch.D)).toBe(Interval.MajorSecond);
    });

    test('C and E flat as MinorThird', () => {
      expect(Pitch.C.intervalTo(Pitch.EFlat)).toBe(Interval.MinorThird);
    });

    test('C and E as MajorThird', () => {
      expect(Pitch.C.intervalTo(Pitch.E)).toBe(Interval.MajorThird);
    });

    test('C and F as PerfectFourth', () => {
      expect(Pitch.C.intervalTo(Pitch.F)).toBe(Interval.PerfectFourth);
    });

    test('C and F sharp as AugmentedFourth', () => {
      expect(Pitch.C.intervalTo(Pitch.FSharp)).toBe(Interval.AugmentedFourth);
    });

    test('C and G flat as DiminishedFifth', () => {
      expect(Pitch.C.intervalTo(Pitch.GFlat)).toBe(Interval.DiminishedFifth);
    });

    test('C and G as PerfectFifth', () => {
      expect(Pitch.C.intervalTo(Pitch.G)).toBe(Interval.PerfectFifth);
    });

    test('C and G sharp as AugmentedFifth', () => {
      expect(Pitch.C.intervalTo(Pitch.GSharp)).toBe(Interval.AugmentedFifth);
    });

    test('C and A flat as MinorSixth', () => {
      expect(Pitch.C.intervalTo(Pitch.AFlat)).toBe(Interval.MinorSixth);
    });

    test('C and A as MajorSixth', () => {
      expect(Pitch.C.intervalTo(Pitch.A)).toBe(Interval.MajorSixth);
    });

    test('C and B flat as MinorSeventh', () => {
      expect(Pitch.C.intervalTo(Pitch.BFlat)).toBe(Interval.MinorSeventh);
    });

    test('C and B as MajorSeventh', () => {
      expect(Pitch.C.intervalTo(Pitch.B)).toBe(Interval.MajorSeventh);
    });

    test('D and F as MinorThird', () => {
      expect(Pitch.D.intervalTo(Pitch.F)).toBe(Interval.MinorThird);
    });
  });

  describe('transpose using a', () => {
    test('Unison from C to C', () => {
      expect(Pitch.C.transpose(Interval.Unison)).toBe(Pitch.C);
    });

    test('Unison from C# to C#', () => {
      expect(Pitch.CSharp.transpose(Interval.Unison)).toBe(Pitch.CSharp);
    });

    test('MinorSecond from C to D flat', () => {
      expect(Pitch.C.transpose(Interval.MinorSecond)).toBe(Pitch.DFlat);
    });

    test('MajorSecond from C to D', () => {
      expect(Pitch.C.transpose(Interval.MajorSecond)).toBe(Pitch.D);
    });

    test('AugmentedSecond from C to D sharp', () => {
      expect(Pitch.C.transpose(Interval.AugmentedSecond)).toBe(Pitch.DSharp);
    });

    test('MinorThird from C to E flat', () => {
      expect(Pitch.C.transpose(Interval.MinorThird)).toBe(Pitch.EFlat);
    });

    test('MajorThird from C to E', () => {
      expect(Pitch.C.transpose(Interval.MajorThird)).toBe(Pitch.E);
    });

    test('PerfectFourth from C to F', () => {
      expect(Pitch.C.transpose(Interval.PerfectFourth)).toBe(Pitch.F);
    });

    test('AugmentedFourth from C to F sharp', () => {
      expect(Pitch.C.transpose(Interval.AugmentedFourth)).toBe(Pitch.FSharp);
    });

    test('DiminishedFifth from C to G flat', () => {
      expect(Pitch.C.transpose(Interval.DiminishedFifth)).toBe(Pitch.GFlat);
    });

    test('PerfectFifth from C to G', () => {
      expect(Pitch.C.transpose(Interval.PerfectFifth)).toBe(Pitch.G);
    });

    test('PerfectFifth from D to A', () => {
      expect(Pitch.D.transpose(Interval.PerfectFifth)).toBe(Pitch.A);
    });

    test('AugmentedFifth from C to G sharp', () => {
      expect(Pitch.C.transpose(Interval.AugmentedFifth)).toBe(Pitch.GSharp);
    });

    test('MinorSixth from C to A flat', () => {
      expect(Pitch.C.transpose(Interval.MinorSixth)).toBe(Pitch.AFlat);
    });

    test('MajorSixth from C to A', () => {
      expect(Pitch.C.transpose(Interval.MajorSixth)).toBe(Pitch.A);
    });

    test('diminished seventh from C to B flat flat', () => {
      expect(Pitch.C.transpose(Interval.DiminishedSeventh)).toBe(Pitch.A);
    });

    test('diminished seventh from G to E', () => {
      expect(Pitch.G.transpose(Interval.DiminishedSeventh)).toBe(Pitch.E);
    });

    test('minor seventh from C to B flat', () => {
      expect(Pitch.C.transpose(Interval.MinorSeventh)).toBe(Pitch.BFlat);
    });

    test('MajorSeventh from C to B', () => {
      expect(Pitch.C.transpose(Interval.MajorSeventh)).toBe(Pitch.B);
    });

    test('augmented ninth from G to A#', () => {
      expect(Pitch.G.transpose(Interval.AugmentedNinth)).toBe(Pitch.ASharp);
    });

    test('perfect eleventh from G to C', () => {
      expect(Pitch.G.transpose(Interval.PerfectEleventh)).toBe(Pitch.C);
    });

    test('augmented second from D to E#', () => {
      expect(Pitch.D.transpose(Interval.AugmentedSecond)).toBe(Pitch.ESharp);
    });

    test('minor third from G to Bb', () => {
      expect(Pitch.G.transpose(Interval.MinorThird)).toBe(Pitch.BFlat);
    });

    test('major third from G to B', () => {
      expect(Pitch.G.transpose(Interval.MajorThird)).toBe(Pitch.B);
    });
  });
});
