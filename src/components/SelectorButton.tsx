import { ListItemButton, ListItemText } from '@mui/material';

type Props = {
  title: string;
  onClick: (title: string) => void;
};

const SelectorButton: React.FC<Props> = ({ title, onClick }) => {
  return (
    <ListItemButton
      onClick={(_event) => onClick(title)}
      sx={{
        maxHeight: 18,
      }}
    >
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

export default SelectorButton;
