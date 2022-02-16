import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import MenuIcon from '@material-ui/icons/Menu';
import CopyrightIcon from '@mui/icons-material/Copyright';

function App() {
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
      <main>
        <div>
          <Container maxWidth="xl">
            <Typography variant="h2" align="center" color="testPrimary" gutterBottom>
              Welcome to Glenn
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              A longer piece of text to disply here. I don't know what else to write in here but
              here it goes
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Paper elevation={1}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                      </Typography>
                      <Typography variant="h5" component="div">
                        A card
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        with a paper with some text
                      </Typography>
                      <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                      A card with some text
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      adjective
                    </Typography>
                    <Typography variant="body2">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card variant="outlined">Card 1</Card>
              </Grid>
              <Grid item xs={4}>
                <Card variant="outlined">Card 1</Card>
              </Grid>
              <Grid item xs={8}>
                <Card variant="outlined">Card 1</Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <CopyrightIcon />
          &nbsp;
          <Typography variant="h6">CoKaiDō 2022</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
