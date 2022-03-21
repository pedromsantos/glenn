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

  test.each(Array.from({ length: 36 }, (_, i) => i + 1))(
    'Select chord pattern when clicked',
    (index) => {
      render(<PatternSelector onPatternSelected={() => {}} />);

      fireEvent.click(screen.getByTestId('ListItemButton' + index));

      expect(screen.getByTestId('ListItemButton0')).not.toHaveClass(selectedClassIdentifier);
      expect(screen.getByTestId('ListItemButton' + index)).toHaveClass(selectedClassIdentifier);
    }
  );

  test.each(Array.from({ length: 36 }, (_, i) => i))('Notify when pitch is selected', (index) => {
    const selectedMock = jest.fn();

    render(<PatternSelector onPatternSelected={selectedMock} />);

    fireEvent.click(screen.getByTestId('ListItemButton' + index));

    expect(selectedMock).toHaveBeenCalledWith(ChordPattern.patterns[index]);
  });
});
