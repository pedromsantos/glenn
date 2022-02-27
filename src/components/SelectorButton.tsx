import { ListItemButton, ListItemText } from '@mui/material';

type Props = {
  title: string;
};

const SelectorButton: React.FC<Props> = ({ title }) => {
  return (
    <ListItemButton
      sx={{
        maxHeight: 18,
      }}
    >
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

export default SelectorButton;
