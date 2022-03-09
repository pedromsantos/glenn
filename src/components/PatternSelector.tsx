import { List, ListItemButton, ListItemText } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { ChordPattern } from '../Domain/Chord';

type Props = {
  onPatternSelected: (identifier: ChordPattern) => void;
};

const PatternSelector: React.FC<Props> = ({ onPatternSelected }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onClick = (pattern: ChordPattern, index: number) => {
    setSelectedIndex(index);
    onPatternSelected(pattern);
  };

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
          <ListItemButton
            key={i}
            selected={selectedIndex === i}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={(_event) => onClick(p, i)}
            sx={{
              maxHeight: 18,
            }}
          >
            <ListItemText primary={p.Abbreviation} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default PatternSelector;
