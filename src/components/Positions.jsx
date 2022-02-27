import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Position, Tab as GuitarTab, GuitarChord } from '../Domain/Guitar';
import { ClosedChord, ChordPattern } from '../Domain/Chord';
import Pitch from '../Domain/Pitch';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function printAsciiChord(pitch, pattern, position) {
  const chord = new ClosedChord(pitch, pattern);
  const guitarChord = new GuitarChord(chord, position);
  return new GuitarTab().render(guitarChord.toTab());
}

function Positions() {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  return (
    <>
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
            <code>{printAsciiChord(Pitch.C, ChordPattern.Major, p)}</code>
          </pre>
        </TabPanel>
      ))}
    </>
  );
}

export default Positions;
