import { Container } from '@material-ui/core';
import { Typography } from '@mui/material';
import Chords from './Chords';

function PageContent() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" align="center" color="testPrimary" gutterBottom>
        Welcome to Glenn
      </Typography>
      <Chords />
    </Container>
  );
}

export default PageContent;
