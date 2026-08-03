import { Pitch } from '../Domain/Pitch';

export function convertPitchesToDistances(pitches: Pitch[]): number[] {
  return pitches
    .reduce((result: [Pitch, Pitch][], _value, index, array) => {
      result.push(array.slice(index, index + 2) as [Pitch, Pitch]);
      return result;
    }, [])
    .slice(0, -1)
    .map(([first, second]) => first.absoluteDistance(second));
}
