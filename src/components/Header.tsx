import { AppBar, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MenuIcon from '@material-ui/icons/Menu';

function Header() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <LibraryMusicIcon /> <Typography variant="h6">Glenn</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
