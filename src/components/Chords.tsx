import { Card, CardContent, Grid } from '@mui/material';
import PitchSelector from './PitchSelector';
import PatternSelector from './PatternSelector';
import Positions from './Positions';

function Chords() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <PitchSelector />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined">
            <CardContent>
              <PatternSelector />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Card variant="outlined">
            <CardContent>
              <Positions />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Chords;
