import Pitch from '../Domain/Pitch';

export function convertPitchesToDistances(pitches: Pitch[]): number[] {
  return pitches
    .reduce((result: Pitch[][], _value, index, array) => {
      result.push(array.slice(index, index + 2));
      return result;
    }, [])
    .slice(0, -1)
    .map((p) => p[0].absoluteDistance(p[1]));
}
