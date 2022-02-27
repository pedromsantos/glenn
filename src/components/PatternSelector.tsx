import { List } from '@mui/material';
import { Typography } from '@mui/material';
import SelectorButton from './SelectorButton';
import { ChordPattern } from '../Domain/Chord';

function PatternSelector() {
  return (
    <>
      <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary">
        Chord type
      </Typography>
      <List
        dense={true}
        sx={{
          width: '100%',
          overflow: 'auto',
          maxHeight: 250,
        }}
      >
        {ChordPattern.patterns.map((p, i) => (
          <SelectorButton key={i} title={p.Abbreviation} />
        ))}
      </List>
    </>
  );
}

export default PatternSelector;
