import { Card, CardContent, Grid } from '@mui/material';
import PitchSelector from './PitchSelector';
import PatternSelector from './PatternSelector';
import Positions from './Positions';
import Pitch from '../Domain/Pitch';
import { ChordPattern } from '../Domain/Chord';
import { useState } from 'react';

function Chords() {
  const [selectedPitch, setSelectedPitch] = useState(Pitch.C);
  const [selectedPattern, setSelectedPattern] = useState(ChordPattern.Major);

  const onPicthSelected = (pitch: Pitch) => {
    setSelectedPitch(pitch);
  };

  const onPatternSelected = (pattern: ChordPattern) => {
    setSelectedPattern(pattern);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <PitchSelector onPicthSelected={onPicthSelected} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined">
            <CardContent>
              <PatternSelector onPatternSelected={onPatternSelected} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Card variant="outlined">
            <CardContent>
              <Positions pitch={selectedPitch} pattern={selectedPattern} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Chords;
