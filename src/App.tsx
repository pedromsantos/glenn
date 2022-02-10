import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <LibraryMusicIcon />
        <Typography variant="h6">Glenn</Typography>
        <Toolbar />
      </AppBar>
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" color="testPrimary" gutterBottom>
              Welcome to Glenn
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              A longer piece of text to disply here. I don't know what else to write in here but
              here it goes
            </Typography>
          </Container>
        </div>
      </main>
    </>
  );
}

export default App;
