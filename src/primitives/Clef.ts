import { OctavePrimitives } from './Note';
import { PitchPrimitives } from './Pitch';

export interface ClefPrimitives {
  pitch: PitchPrimitives;
  octave: OctavePrimitives;
  line: number;
  type: string;
}
