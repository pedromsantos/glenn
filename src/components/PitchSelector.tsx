import { List } from '@mui/material';
import { Typography } from '@mui/material';
import PitchButton from './PitchButton';
import Pitch from '../Domain/Pitch';

function PitchSelector() {
  return (
    <>
      <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary">
        Pitch
      </Typography>
      <List
        dense={true}
        sx={{
          width: '100%',
          overflow: 'auto',
          maxHeight: 250,
        }}
      >
        {Pitch.pitches.map((p) => (
          <PitchButton title={p.Name} />
        ))}
      </List>
    </>
  );
}

export default PitchSelector;
