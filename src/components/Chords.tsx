import { Card, CardContent, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import PitchSelector from './PitchSelector';

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
        <Grid item xs={10}>
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Tab
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Chords;
