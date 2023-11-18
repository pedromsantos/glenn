export type GuitarStringPrimitives = {
  name: string;
  index: number;
};

export type FretPrimitives = {
  string: GuitarStringPrimitives;
  fret: number;
};

export type PositionPrimitives = {
  name: string;
  lowestFret: FretPrimitives;
  highestFret: FretPrimitives;
};
