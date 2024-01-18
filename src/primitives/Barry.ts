import { PitchPrimitives } from './Pitch';

export type ArpeggioUpFrom = { kind: 'ArpeggioUpFrom'; degree: number };
export type ArpeggioUpFromLastPitch = { kind: 'ArpeggioUpFromLastPitch' };
export type PivotArpeggioUpFrom = { kind: 'PivotArpeggioUpFrom'; degree: number };
export type PivotArpeggioUpFromLastPitch = { kind: 'PivotArpeggioUpFromLastPitch' };
export type ResolveTo = { kind: 'ResolveTo'; pitch: PitchPrimitives };
export type ScaleDown = { kind: 'ScaleDown'; from: number; to: number };
export type ScaleDownExtraHalfSteps = { kind: 'ScaleDownExtraHalfSteps'; from: number; to: number };
export type ScaleDownFromLastPitchTo = { kind: 'ScaleDownFromLastPitchTo'; to: number };
export type ScaleDownExtraHalfStepsFromLastPitch = {
  kind: 'ScaleDownExtraHalfStepsFromLastPitch';
  to: number;
};

export type BarryHarrisCommand =
  | ArpeggioUpFrom
  | ArpeggioUpFromLastPitch
  | PivotArpeggioUpFrom
  | PivotArpeggioUpFromLastPitch
  | ResolveTo
  | ScaleDown
  | ScaleDownExtraHalfSteps
  | ScaleDownFromLastPitchTo
  | ScaleDownExtraHalfStepsFromLastPitch;
