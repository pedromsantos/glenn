import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Position, Tab as GuitarTab, GuitarChord } from '../Domain/Guitar';
import { ClosedChord } from '../Domain/Chord';
import { Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function printAsciiChord(pitch, pattern, position) {
  const chord = new ClosedChord(pitch, pattern);
  const guitarChord = new GuitarChord(chord, position);
  return new GuitarTab().render(guitarChord.toTab());
}

const Positions = ({ pitch, pattern }) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  return (
    <>
      <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary">
        CAGED Positions
      </Typography>
      <Tabs
        value={activeTabIndex}
        onChange={(event, newValue) => {
          setActiveTabIndex(newValue);
        }}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
      >
        {Position.guitarPositions.map((p, i) => (
          <Tab key={i} label={p.Name} />
        ))}
      </Tabs>
      {Position.guitarPositions.map((p, i) => (
        <TabPanel key={i} value={activeTabIndex} index={i}>
          <pre>
            <code>{printAsciiChord(pitch, pattern, p)}</code>
          </pre>
        </TabPanel>
      ))}
    </>
  );
};

export default Positions;
