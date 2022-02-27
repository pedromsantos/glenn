import { AppBar, Toolbar, Typography } from '@mui/material/';
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <CopyrightIcon />
        &nbsp;
        <Typography variant="h6">CoKaiDō 2022</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
