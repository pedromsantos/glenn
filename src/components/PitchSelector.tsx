import { List, ListItemButton, ListItemText } from '@mui/material';
import { Typography } from '@mui/material';
import Pitch from '../Domain/Pitch';
import { useState } from 'react';

type Props = {
  onPicthSelected: (identifier: Pitch) => void;
};

const PitchSelector: React.FC<Props> = ({ onPicthSelected }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onClick = (pitch: Pitch, index: number) => {
    setSelectedIndex(index);
    onPicthSelected(pitch);
  };

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
        {Pitch.pitches.map((p, i) => (
          <ListItemButton
            data-testid={'ListItemButton' + i}
            key={i}
            selected={selectedIndex === i}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={(_event) => onClick(p, i)}
            sx={{
              maxHeight: 18,
            }}
          >
            <ListItemText primary={p.Name} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default PitchSelector;
