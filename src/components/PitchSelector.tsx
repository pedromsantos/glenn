import { List } from '@mui/material';
import { Typography } from '@mui/material';
import SelectorButton from './SelectorButton';
import Pitch from '../Domain/Pitch';

type Props = {
  onClick: (identifier: string) => void;
};

const PitchSelector: React.FC<Props> = ({ onClick }) => {
  const onPicthSelected = (pitch: string) => {
    onClick(pitch);
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
          <SelectorButton key={i} title={p.Name} onClick={onPicthSelected} />
        ))}
      </List>
    </>
  );
};

export default PitchSelector;
