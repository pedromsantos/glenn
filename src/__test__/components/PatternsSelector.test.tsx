import { fireEvent, render, screen } from '@testing-library/react';
import PatternSelector from '../../components/PatternSelector';
import { ChordPattern } from '../../Domain/Chord';
import '@testing-library/jest-dom';

const selectedClassIdentifier = 'Mui-selected';

describe('Chord Pattern selector should', () => {
  test('display all chord patterns', () => {
    const chordPatterns = ChordPattern.patterns.map((p) => p.Abbreviation);
    render(<PatternSelector onPatternSelected={() => {}} />);

    for (const chordPattern of chordPatterns) {
      expect(screen.getByText(chordPattern)).toBeTruthy();
    }
  });

  test('Select chord pattern Maj by default', () => {
    render(<PatternSelector onPatternSelected={() => {}} />);

    expect(screen.getByTestId('ListItemButton0')).toHaveClass(selectedClassIdentifier);
  });

  test('Select chord pattern Maj when clicked', () => {
    render(<PatternSelector onPatternSelected={() => {}} />);

    fireEvent.click(screen.getByTestId('ListItemButton10'));
    fireEvent.click(screen.getByTestId('ListItemButton0'));

    expect(screen.getByTestId('ListItemButton10')).not.toHaveClass(selectedClassIdentifier);
    expect(screen.getByTestId('ListItemButton0')).toHaveClass(selectedClassIdentifier);
  });

  test.each([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  ])('Select chord pattern when clicked', (index) => {
    render(<PatternSelector onPatternSelected={() => {}} />);

    fireEvent.click(screen.getByTestId('ListItemButton' + index));

    expect(screen.getByTestId('ListItemButton0')).not.toHaveClass(selectedClassIdentifier);
    expect(screen.getByTestId('ListItemButton' + index)).toHaveClass(selectedClassIdentifier);
  });

  test.each([
    [0, ChordPattern.patterns[0]],
    [1, ChordPattern.patterns[1]],
    [2, ChordPattern.patterns[2]],
    [3, ChordPattern.patterns[3]],
    [4, ChordPattern.patterns[4]],
    [5, ChordPattern.patterns[5]],
    [6, ChordPattern.patterns[6]],
    [7, ChordPattern.patterns[7]],
    [8, ChordPattern.patterns[8]],
    [9, ChordPattern.patterns[9]],
    [10, ChordPattern.patterns[10]],
    [11, ChordPattern.patterns[11]],
    [12, ChordPattern.patterns[12]],
    [13, ChordPattern.patterns[13]],
    [14, ChordPattern.patterns[14]],
    [15, ChordPattern.patterns[15]],
    [16, ChordPattern.patterns[16]],
    [17, ChordPattern.patterns[17]],
    [18, ChordPattern.patterns[18]],
    [19, ChordPattern.patterns[19]],
    [20, ChordPattern.patterns[20]],
    [21, ChordPattern.patterns[21]],
    [22, ChordPattern.patterns[22]],
    [23, ChordPattern.patterns[23]],
    [24, ChordPattern.patterns[24]],
    [25, ChordPattern.patterns[25]],
    [26, ChordPattern.patterns[26]],
    [27, ChordPattern.patterns[27]],
    [28, ChordPattern.patterns[28]],
    [29, ChordPattern.patterns[29]],
    [30, ChordPattern.patterns[30]],
    [31, ChordPattern.patterns[31]],
    [32, ChordPattern.patterns[32]],
    [33, ChordPattern.patterns[33]],
    [34, ChordPattern.patterns[34]],
    [35, ChordPattern.patterns[35]],
    [36, ChordPattern.patterns[36]],
  ])('Notify when pitch is selected', (index, pitch) => {
    const selectedMock = jest.fn();

    render(<PatternSelector onPatternSelected={selectedMock} />);

    fireEvent.click(screen.getByTestId('ListItemButton' + index));

    expect(selectedMock).toHaveBeenCalledWith(pitch);
  });
});
