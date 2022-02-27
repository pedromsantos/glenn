import { List } from '@mui/material';
import { Typography } from '@mui/material';
import SelectorButton from './SelectorButton';
import { ChordPattern } from '../Domain/Chord';

type Props = {
  onClick: (identifier: string) => void;
};

const PatternSelector: React.FC<Props> = ({ onClick }) => {
  const onPatternSelected = (pattern: string) => {
    onClick(pattern);
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
          <SelectorButton key={i} title={p.Abbreviation} onClick={onPatternSelected} />
        ))}
      </List>
    </>
  );
};

export default PatternSelector;
