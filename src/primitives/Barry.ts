import { PitchPrimitives } from './Pitch';

export type ArpeggioUpFrom = { command: 'ArpeggioUpFrom'; degree: number };
export type ArpeggioUpFromLastPitch = { command: 'ArpeggioUpFromLastPitch' };
export type PivotArpeggioUpFrom = { command: 'PivotArpeggioUpFrom'; degree: number };
export type PivotArpeggioUpFromLastPitch = { command: 'PivotArpeggioUpFromLastPitch' };
export type ResolveTo = { command: 'ResolveTo'; pitch: PitchPrimitives };
export type ScaleDown = { command: 'ScaleDown'; from: number; to: number };
export type ScaleDownExtraHalfSteps = {
  command: 'ScaleDownExtraHalfSteps';
  from: number;
  to: number;
};
export type ScaleDownFromLastPitchTo = { command: 'ScaleDownFromLastPitchTo'; to: number };
export type ScaleDownExtraHalfStepsFromLastPitch = {
  command: 'ScaleDownExtraHalfStepsFromLastPitch';
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
