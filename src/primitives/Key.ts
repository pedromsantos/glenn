import { PitchPrimitives } from './Pitch';

export interface KeyPrimitives {
  root: PitchPrimitives;
  abbreviation: string;
  accidentals: -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;
  type: 'M' | 'm';
}
